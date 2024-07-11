import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bigintToLongAddress } from '../AppUtils';
import { bigintToShortStr } from '../AppUtils';

import FundCard from './FundCard';
import { loader } from '../assets';
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate  = useNavigate();

  const handleNavigate = (campaign) =>{
    navigate(`/campaign-details/${campaign.title}`, {state: campaign })
  }

    campaigns && console.log(campaigns);



  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({campaigns.length})</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain'/>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[15px] leading-[30px] text-[#818183]'>
            You have not created any Campaigns Yet
          </p>
        )}
        
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) =>(
           <FundCard
          key={campaign.id}
          owner={bigintToLongAddress(campaign.owner).slice(0,10)+"..."+bigintToLongAddress(campaign.owner).slice(-6)}
          title={bigintToShortStr(campaign.title)}
          description={bigintToShortStr(campaign.description)}
          target={campaign.target.toString()}
          amountCollected={campaign.amount_collected.toString()}
          image={bigintToShortStr(campaign.image)}

             //{...campaign}
            handleClick={() => handleNavigate(campaign)}

          />
        ))}

      </div>

    </div>
    
  )
}

export default DisplayCampaigns;

