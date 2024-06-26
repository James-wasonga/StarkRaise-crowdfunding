import React, { useState , useEffect} from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  //Aiming at displaying the fetch data from the smart contract onto the homePage

const {address, contract, getUserCampaigns} = useStateContext();

const fetchCampaigns = async () => {
  setIsLoading(true);
  const data = await getUserCampaigns();
  setCampaigns(data);
  setIsLoading(false);
}


useEffect(() =>{
  if(contract) fetchCampaigns; 
},[address, contract]);

  return (
    <DisplayCampaigns
    title='All Compaigns'
    isLoading = {isLoading}
    campaigns = {campaigns}
  />

  )
}

export default Profile