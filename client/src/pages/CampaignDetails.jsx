import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader, Modal } from "../components";

import {
  bigintToLongAddress,
  calculateBarPercentage,
  daysLeft,
} from "../utils";
import { starkraise, thirdweb, stark } from "../assets";
import { useAppContext } from "../providers/AppProvider";

const CampaignDetails = () => {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, handleWalletConnection } =
    useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const handleWithdrawFunction = () => {
    const campaignId = state.id.toString();
    console.log(campaignId);
    if (contract && address) {
      const myCall = contract.populate("withdraw_donations", [campaignId]);
      setIsLoading(true);
      contract["withdraw_donations"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const remainingDays = daysLeft(state.deadline);
  console.log(state.amount_collected.toString());

  console.log(contract);

  const fetchDonators = async () => {
    const data = await contract.get_donations(state.id.toString(), 1);

    console.log(data);

    setDonators(data);
  };

  console.log(state.id);

  console.log(donators);

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.id, amount);
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
      <div className="flex-1 flex-col">
        <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
        <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
        { state && <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target.toString(), state.amount_collected.toString() / 1000000000000000000)}%`, maxWidth: '100%'}}>
          </div>}
        </div>
      </div>

      <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox title={`Raised of ${state.target.toString()}`} value={state.amount_collected.toString() / 1000000000000000000 } />
        <CountBox title="Total Backers" value={donators.length} />
      </div>
    </div>

    <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
      <div className="flex-[2] flex flex-col gap-[40px]">
        <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

          <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
              <img src={stark} alt="user" className="w-[90%] h-[100%] object-contain"/>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{bigintToLongAddress(state.owner)}</h4>
              <p className="mt-[4px] font-epilogue font-normal text-[12px] text-blue-500"> Campaigns</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>
        </div>

        <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators? donators.map((item, index) => (  
                <div key={`${item.donor}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {bigintToLongAddress(item.donor).slice(0,18) +"..."+bigintToLongAddress(item.donor).slice(-6) }</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.amount?.toString() / 1000000000000000000} Eth</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
              )}
              <Modal
                isOpen={withdrawModal}
                onClose={() => {
                  setWithdrawModal(false);
                }}
              >
                <h1 className="text-xl" style={{ fontWeight: "600" }}>
                  Are you sure you want to withdraw?
                </h1>
                <input
                  type="number"
                  placeholder="Amount"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <br />
                <br />
                <CustomButton
                  handleClick={() => {
                    handleWithdrawFunction();
                  }}
                  btnType="button"
                  title="withdraw"
                  styles="w-full bg-[#8c6dfd]"
                />
              </Modal>
              <CustomButton
                btnType="button"
                title="withdraw"
                styles="w-full bg-[#8c6dfd]"
                handleClick={() => {
                  setWithdrawModal(true);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="Amount"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;


