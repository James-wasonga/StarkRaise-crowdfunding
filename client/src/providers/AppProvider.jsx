import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { connect, disconnect } from "starknetkit";
import {toast} from "react-toastify"
import { ethers } from "ethers";
import { bigintToLongAddress } from "../utils";

import { Contract, Provider, Account, ec, json, constants, cairo, CallData } from "starknet";
import { ABI, CONTRACT_ADDRESS } from "./abi";
const initialData = {
  address: null,
  contract: null,
  provider: null,
  handleWalletConnection: null,
  handleWalletDisconnection: null,
};

const AppContext = createContext(initialData);
export const useAppContext = () => useContext(AppContext);
const AppProvider = (props) => {
  const [address, setAddress] = useState();
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();

  const connectWallet = async () => {
    const { wallet } = await connect();

    if (wallet && wallet.isConnected) {
      setProvider(wallet.account);
      setAddress(wallet.selectedAddress);
    } else {
      setProvider(_provider);
    }
  };

  const disconnectWallet = async () => {
    const { wallet } = await disconnect();
    if (wallet && wallet.isConnected) {
      // setConnection(undefined);
      setProvider(undefined);
      setAddress("");
    }
  };

  const connectContract = () => {
    if (address && provider) {
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, provider);
      if (_contract) {
        setContract(_contract);
      }
    } else {
      const _provider = new Provider({
        sequencer: { network: constants.NetworkName.SN_SEPOLIA },
      });
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, _provider);
      setContract(_contract);
      // console.log(_contract);
    }
  };
//they all start here

  //To display user campaigns on profile page
    const getUserCampaigns = async () => {
    const allCampaigns = await contract.get_campaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  //donate
  // const donate = async (pId, amount) => {
  //   const data = await contract.invoke("donate", { campaign_id: pId, amount: ethers.utils.parseEther(amount) });
  //   return data;
  // };

  // const getDonations = async (pId) => {
  //   const donations = await contract.call("get_donations", { campaign_id: pId });
  //   const numberOfDonations = donations.length;

  //   const parsedDonations = donations.map((donation, i) => ({
  //     donor: donation.donor,
  //     amount: ethers.utils.formatEther(donation.amount.low.toString()), // Use ethers here 
  //     date: donation.date
  //   }));

  //   return parsedDonations;
  // };


  const donate = async (id, amount) => {

    const weiAmount = amount * 1000000000000000000;
    // console.log(weiAmount)
    
    const donate_funds = contract.populate("donate", [id, BigInt(weiAmount)]);
    const results = await provider.execute([{
      contractAddress: "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      // contractAddress: "0x1a9884f171cec4148b1222b49aed41cd84ddfe66987745eb1d383a720d76d14",
      entrypoint: "approve",
      calldata: CallData.compile({
        spender: CONTRACT_ADDRESS,
        amount: cairo.uint256(weiAmount)
      })
    },
    {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "donate",
      calldata: donate_funds.calldata,
    }
  ])

  
}

const getDonations = async(id) => {
    const donations =await contract.call('get_donations',id);
    console.log(donations);
    // const numberOfDonations = donations[0].length;

    // const parsedDonations = [];

    // for(let i = 0; i < numberOfDonations; i++){
    //     parsedDonations.push({
    //     donator: donations[0][i],
    //     donation: ethers.utils.formatEther(donations[1][i].toString())
    // })
    // }
    return donations;
}

// they all end here
  const appValue = useMemo(
    () => ({
      address,
      contract,
      provider,
      handleWalletConnection: connectWallet,
      handleWalletDisconnection: disconnectWallet,
      getUserCampaigns,
      donate,
      getDonations,
    }),
    [address, contract, provider]
  );
  useEffect(() => {
    connectContract();
  }, [address]);

  useEffect(() => {
    connectWallet();
  }, [])
  return (
    <AppContext.Provider value={appValue}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;

