

import React, { useState , useEffect} from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { useAppContext } from '../providers/AppProvider';

const Home = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  //Aiming at displaying the fetch data from the smart contract onto the homePage

// const {address, contract, getCampaigns} = useStateContext();
 const {contract, address, provider} = useAppContext();

const fetchCampaigns = async () => {
  // setIsLoading(true);
  // const data = await getCampaigns();
  // setCampaigns(data);
  // setIsLoading(false);
  const myCall = contract.populate('get_campaigns', [])
    setIsLoading(true)
    contract['get_campaigns'](myCall.calldata).then((res) => {
        console.info("Successful Response:", res)
    }).catch((err) => {
        console.error("Error: ", err)
    }).finally(() => {
        setIsLoading(false)
    })

}

useEffect(() =>{
  if(contract) fetchCampaigns(); 
},[contract, address]);

  return (
    <DisplayCampaigns
    title='All Compaigns'
    isLoading = {isLoading}
    campaigns = {campaigns}
  />

  )
}

export default Home