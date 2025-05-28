
import React, { useState , useEffect} from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';//AppProvider used instead of context
import { useAppContext } from '../providers/AppProvider';
import {ToastContainer} from 'react-toastify'


  const Home = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  //Aiming at displaying the fetch data from the smart contract onto the homePage

//const {address, contract, getCampaigns} = useStateContext();
  const {contract, address, provider} = useAppContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    // const data = await getCampaigns();
    // setCampaigns(data);
    // setIsLoading(false);

    try{
      const campaignsData = await contract.get_campaigns();
      setCampaigns(campaignsData);
      console.log("Fetched Campaigns Successfully",campaignsData);
  
      // const userCampaigns = campaignsData.filter(campaign => campaign.owner === address);
      // setCampaigns(userCampaigns);
      // console.log("User Campaigns:", userCampaigns);
    } catch (error){
      console.error("Error fetching campaign:", error);

    } finally{
      setIsLoading(false);
    }

    };

//   const myCall = contract.populate('get_campaigns', [])
//     setIsLoading(true)
//     contract['get_campaigns'](myCall.calldata).then((res) => {
//         console.info("Successful Response:", res)
//     }).catch((err) => {
//         console.error("Error: ", err)
//     }).finally(() => {
//         setIsLoading(false)
//     })

// }

useEffect(() =>{
  if(contract) fetchCampaigns(); 
},[contract, address]);

  return (
    <>
    <ToastContainer />
     <DisplayCampaigns
    title='All Compaigns'
    isLoading = {isLoading}
    campaigns = {campaigns}
  />
    </>
   

  )
}

 export default Home;
