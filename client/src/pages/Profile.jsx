
import React, { useState , useEffect} from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { useAppContext } from '../providers/AppProvider';
import { bigintToLongAddress } from '../utils';


  const Profile = () => {
  const [isLoading , setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  //Aiming at displaying the fetch data from the smart contract onto the homePage

//const {address, contract, getCampaigns} = useStateContext();
  const {contract, address, provider, getUserCampaigns} = useAppContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    // const data = await getCampaigns();
    // setCampaigns(data);
    // setIsLoading(false);

    try{
      
      const campaignsData = await contract.get_campaigns();
      campaignsData.forEach((data) => {
        console.log(bigintToLongAddress(data.owner));
      })

      console.log(bigintToLongAddress("1610891411886380420766473104775373822107081622285015934560508474018384971657"))

      const filteredCampaignData = await campaignsData.filter((data) => bigintToLongAddress(data.owner) == address);
      console.log(address);
      
      console.log(filteredCampaignData);
      setCampaigns(filteredCampaignData);

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
    <DisplayCampaigns
    title='All Compaigns'
    isLoading = {isLoading}
    campaigns = {campaigns}
  />

  )
}

 export default Profile;
