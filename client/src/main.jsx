import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
//import AppProvider from './providers/AppProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
   < ThirdwebProvider desiredChainId={ChainId.Goerli}>
    
    <Router>
      <StateContextProvider>
        <App/>
      </StateContextProvider>
    </Router>
    
   </ThirdwebProvider>
  

)
    



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { StarknetProvider } from '@starknet-react/core';

// import { StateContextProvider } from './context';
// import App from './App';
// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <StarknetProvider>
//     <Router>
//       <StateContextProvider>
//         <App />
//       </StateContextProvider>
//     </Router>
//   </StarknetProvider>
// );

//this is the connection based on starknet