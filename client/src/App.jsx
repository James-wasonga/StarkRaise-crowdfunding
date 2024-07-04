import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom';

import { Sidebar,Navbar } from './components';
import { CampaignDetails, CreateCampaign,Home,Profile} from './pages';
import AppProvider from './providers/AppProvider';


const App = () => {
//initiating a usestate for color themes
  const[isDarkTheme, setIsDarkTheme] = useState(true);
    
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark',!isDarkTheme);

  };
  return (

    <AppProvider>
    <div className={`relative sm:-8 p-4 min-h-screen flex flex-row ${isDarkTheme ? 'bg-[#13131a]' : 'bg-[#f4f4f4]'}`}>
      <div className='sm:flex hidden mr-10 relative'>
         <Sidebar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}/> 
      </div>
 
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
          <Navbar/>
        
          <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create-campaign' element={<CreateCampaign/>} />
            <Route path='/campaign-details/:id' element={<CampaignDetails/>}/>

          </Routes>
          
      </div>
    </div>
    </AppProvider>
  )
}

export default App;

