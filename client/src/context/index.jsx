//this File contains all the connections between the frontend and the smart contract


import React, {useContext, createContext, Children} from "react";


import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import { ethers } from "ethers";

const StateContext = createContext();

//connection of the createCampign to the smart contract 

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('') //Smartcontract address goes here
    const{mutateAsync: createCampaingn} = useContractWrite(contract, 'createCampaign');// createCampaign is a func within the smart contract

    const address = useAddress();
    const connect = useMetamask();

    //pushing the items from the createCampaign form to the blockchain
    const publishCampaign = async(form) =>{
        try{
            const data = await createCampaingn([
                address,//owner who creates the campaign
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),// deadline,
                form.image, //the image from the form
            ])

            //incase of success
            console.log("contract call success",data)

        }catch(error){
            console.log("contract call failure",error)
            
        }
    
    }

    //fetching the pushed items from the blockchain here

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        console.log(campaigns);

        const parsedCampaigns =campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i

        }));
        return parsedCampaigns;

        //console.log(parsedCampaigns);

    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filterCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
        return filterCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign',pId,address, {value: ethers.utils.parseEther(amount)})
        return data;
    }

    const getDonations = async(pId, amount) => {
        const donations =await contract.all('getDonators',pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++){
            parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
        })
        }
        return parsedDonations;
    }

    return(
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaingn: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}     
        >
               {children} 
        </StateContext.Provider>

    )
}


export const useStateContext = () => useContext(StateContext);


// import React, { createContext, useContext, useState } from 'react';
// import { getStarknet } from '@argent/get-starknet';
// import { Contract, stark } from 'starknet';
// // import abi from '../contract/abi.json'; // Import the ABI
// import StarkRaiseABI from '../../crowdfunding/abi.json';

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
//   const [address, setAddress] = useState(null);
//   const [contract, setContract] = useState(null);

//   const connectWallet = async () => {
//     const starknet = getStarknet();
//     await starknet.enable();
//     setAddress(starknet.selectedAddress);
//     const contractAddress = '0x33596d204986659a3d8ae61b5efc4f07eed79c96bdf616f2f4cb650c02c1b20';
//     const contractInstance = new Contract(StarkRaiseABI.abi, contractAddress, starknet.provider);
//     setContract(contractInstance);
//   };

//   const publishCampaign = async (form) => {
//     try {
//       const deadline = new Date(form.deadline).getTime();
//       const campaignData = {
//         uuid: Math.floor(Math.random() * 1e6),
//         title: form.title,
//         description: form.description,
//         target: stark.utils.toBN(form.target),
//         deadline: stark.utils.toBN(deadline),
//         amount_collected: stark.utils.toBN(0),
//         image: form.image,
//         token_address: 'TOKEN_ADDRESS' // Replace with actual token address if necessary
//       };

//       const tx = await contract.create_campaign(campaignData);
//       await tx.wait();
//       console.log('Campaign created successfully', tx);
//     } catch (error) {
//       console.error('Failed to create campaign', error);
//     }
//   };

//   const getCampaigns = async () => {
//     try {
//       const campaigns = await contract.get_campaigns(1); // Assuming page 1
//       return campaigns.map((campaign, i) => ({
//         owner: campaign.owner,
//         title: campaign.title,
//         description: campaign.description,
//         target: stark.utils.formatEther(campaign.target),
//         deadline: new Date(campaign.deadline * 1000).toISOString(),
//         amountCollected: stark.utils.formatEther(campaign.amount_collected),
//         image: campaign.image,
//         pId: i
//       }));
//     } catch (error) {
//       console.error('Failed to fetch campaigns', error);
//       return [];
//     }
//   };

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();
//     return allCampaigns.filter((campaign) => campaign.owner === address);
//   };

//   const donate = async (pId, amount) => {
//     try {
//       const tx = await contract.donate(pId, stark.utils.toBN(amount));
//       await tx.wait();
//       console.log('Donation successful', tx);
//     } catch (error) {
//       console.error('Failed to donate', error);
//     }
//   };

//   const getDonations = async (pId) => {
//     try {
//       const donations = await contract.get_donations(pId, 1); // Assuming page 1
//       return donations.map((donation) => ({
//         donator: donation.donor,
//         donation: stark.utils.formatEther(donation.amount),
//       }));
//     } catch (error) {
//       console.error('Failed to fetch donations', error);
//       return [];
//     }
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         address,
//         connectWallet,
//         publishCampaign,
//         getCampaigns,
//         getUserCampaigns,
//         donate,
//         getDonations,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
