
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidetip from './Sidetip'; // Import Sidetip component
import {logout} from "../assets"

import { logo, sun, twitter, stark } from '../assets';
import { navlinks } from '../constants';
import { useAppContext } from '../providers/AppProvider';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick, title }) => (
  <Sidetip text={title}>
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
      onClick={handleClick}
    >
      
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
        />
      )}
    </div>
  </Sidetip>
);

const Sidebar = ({ isDarkTheme, toggleTheme }) => {
  const {handleWalletDisconnection} = useAppContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  const goToTwitterProfile = () => {
    window.location.href = 'https://twitter.com/JamesWasonga8';
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={stark} title="Home" />
      </Link>

      <div className={`flex-1 flex flex-col justify-between items-center ${isDarkTheme ? 'bg-[#1c1c24]' : 'bg-[#f4f4f4]'} rounded-[20px] w-[76px] py-4 mt-12`}>
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
              title={link.name} // Set title based on link name
            />
          ))}
          <Icon
           type="button" handleClick={() => {
            handleWalletDisconnection()
          }}  imgUrl={logout} />
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
           <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={twitter} handleClick={goToTwitterProfile} title="Twitter" />
          <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} handleClick={toggleTheme} title="Theme" />
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
