// //this File contains all the connections between the frontend and the smart contract

// import { useAppContext } from '../providers/AppProvider';

import React, {useContext, createContext, Children} from "react";


import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import { ethers } from "ethers";

const StateContext = createContext();

//connection of the createCampign to the smart contract 

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0x72d68e62bb940a0209ebe3198652eb1453625b9d480d735f58c0cbbcb79508d') //Smartcontract address goes here
    const{mutateAsync: createCampaingn} = useContractWrite(contract, 'create_campaign');// createCampaign is a func within the smart contract

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
        const campaigns = await contract.call('get_campaigns');

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



