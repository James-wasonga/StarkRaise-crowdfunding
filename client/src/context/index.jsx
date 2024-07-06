// // //this File contains all the connections between the frontend and the smart contract

// import React, {useContext, createContext, Children} from "react";


// import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
// import { ethers } from "ethers";

// const StateContext = createContext();

// //connection of the createCampign to the smart contract 

// export const StateContextProvider = ({children}) => {
//     const {contract} = useContract('0x72d68e62bb940a0209ebe3198652eb1453625b9d480d735f58c0cbbcb79508d') //Smartcontract address goes here
//     const{mutateAsync: createCampaingn} = useContractWrite(contract, 'create_campaign');// createCampaign is a func within the smart contract

//     const address = useAddress();
//     const connect = useMetamask();

//     //pushing the items from the createCampaign form to the blockchain
//     const publishCampaign = async(form) =>{
//         try{
//             const data = await createCampaingn([
//                 address,//owner who creates the campaign
//                 form.title,
//                 form.description,
//                 form.target,
//                 new Date(form.deadline).getTime(),// deadline,
//                 form.image, //the image from the form
//             ])

//             //incase of success
//             console.log("contract call success",data)

//         }catch(error){
//             console.log("contract call failure",error)
            
//         }
    
//     }

//     //fetching the pushed items from the blockchain here

//     const getCampaigns = async () => {
//         const campaigns = await contract.call('get_ampaigns');

//         console.log(campaigns);

//         const parsedCampaigns =campaigns.map((campaign, i) => ({
//             owner: campaign.owner,
//             title: campaign.title,
//             description: campaign.description,
//             target: ethers.utils.formatEther(campaign.target.toString()),
//             deadline: campaign.deadline.toNumber(),
//             amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//             image: campaign.image,
//             pId: i

//         }));
//         return parsedCampaigns;

//         //console.log(parsedCampaigns);

//     }

//     const getUserCampaigns = async () => {
//         const allCampaigns = await getCampaigns();

//         const filterCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
//         return filterCampaigns;
//     }

//     const donate = async (pId, amount) => {
//         const data = await contract.call('donateToCampaign',pId,address, {value: ethers.utils.parseEther(amount)})
//         return data;
//     }

//     const getDonations = async(pId, amount) => {
//         const donations =await contract.all('getDonators',pId);
//         const numberOfDonations = donations[0].length;

//         const parsedDonations = [];

//         for(let i = 0; i < numberOfDonations; i++){
//             parsedDonations.push({
//             donator: donations[0][i],
//             donation: ethers.utils.formatEther(donations[1][i].toString())
//         })
//         }
//         return parsedDonations;
//     }

//     return(
//         <StateContext.Provider
//             value={{
//                 address,
//                 contract,
//                 connect,
//                 createCampaingn: publishCampaign,
//                 getCampaigns,
//                 getUserCampaigns,
//                 donate,
//                 getDonations,
//             }}     
//         >
//                {children} 
//         </StateContext.Provider>

//     )
// }


// export const useStateContext = () => useContext(StateContext);




import React, { useContext, createContext, useState, useEffect, useMemo } from "react";
import { connect, disconnect } from "starknetkit";
import { Contract, Provider, Account, ec, json, constants } from "starknet";
import { ABI, CONTRACT_ADDRESS } from "../providers/abi"; // Adjusted path
import { ethers } from "ethers"; // Import ethers library

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    const { wallet } = await connect();
    if (wallet && wallet.isConnected) {
      setProvider(wallet.account);
      setAddress(wallet.selectedAddress);
    } else {
      setProvider(new Provider({ sequencer: { network: constants.NetworkName.SN_SEPOLIA } }));
    }
  };

  const connectContract = () => {
    if (address && provider) {
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, provider);
      if (_contract) {
        setContract(_contract);
      }
    } else {
      const _provider = new Provider({ sequencer: { network: constants.NetworkName.SN_SEPOLIA } });
      const _contract = new Contract(ABI, CONTRACT_ADDRESS, _provider);
      setContract(_contract);
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await contract.invoke("create_campaign", {
        uuid: form.uuid,
        title: form.title,
        description: form.description,
        target: form.target,
        deadline: new Date(form.deadline).getTime(),
        amount_collected: 0,
        image: form.image,
        token_address: form.token_address,
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("get_campaigns");
    console.log(campaigns);

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.low.toString()), // Use ethers here
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amount_collected.low.toString()), // Use ethers here
      image: campaign.image,
      pId: i
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.invoke("donate", { campaign_id: pId, amount: ethers.utils.parseEther(amount) });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("get_donations", { campaign_id: pId });
    const numberOfDonations = donations.length;

    const parsedDonations = donations.map((donation, i) => ({
      donor: donation.donor,
      amount: ethers.utils.formatEther(donation.amount.low.toString()), // Use ethers here
      date: donation.date
    }));

    return parsedDonations;
  };

  useEffect(() => {
    connectContract();
  }, [address]);

  const stateValue = useMemo(() => ({
    address,
    contract,
    provider,
    connectWallet,
    createCampaign: publishCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
  }), [address, contract, provider]);

  return (
    <StateContext.Provider value={stateValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
