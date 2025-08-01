
import { MantineProvider, ScrollArea } from '@mantine/core';
import { StarknetWindowObject } from 'starknetkit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { AppLayout } from './layouts/AppLayout';
import { starkRaiseTheme } from './theme';
import { HomePage } from './pages/Home.page';
import AppProvider from './providers/AppProvider';
import PageNotFound from './pages/PageNotFound.page';
import CreateCampaign from './pages/CreateCampaign.page';
import MyCampaignsPage from './pages/MyCampaigns.page';
import FeaturedCampaignsPage from './pages/FeaturedCampaigns.page';
import TrendingCampaignsPage from './pages/TrendingCampaigns.page';
import FAQsPage from './pages/FAQs.page';
import AboutPage from './pages/About.page';
import ContactPage from './pages/Contact.page';
import TermsAndConditionsPage from './pages/TermsAndConditions.page';
import PrivacyPolicyPage from './pages/PrivacyPolicy.page';
import CampaignPage from './pages/Campaign.page';
import SettingsPage from './pages/Settings.page';
import { ModalsProvider } from '@mantine/modals';

import { ColorSchemeScript } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import './styles/global.css';

declare global {
  interface Window {
    starknet: StarknetWindowObject;
  }
}

export default function App() {
  return (
    <>
      <ColorSchemeScript
        nonce="8IBTHwOdqNKAWeKl7plt8g=="
        defaultColorScheme="auto"
      />
      <MantineProvider theme={starkRaiseTheme} classNamesPrefix='sr' defaultColorScheme='auto'>
        <ModalsProvider modalProps={{
          scrollAreaComponent: ScrollArea,
          trapFocus: false,
          removeScrollProps: {
            noIsolation: true,
            removeScrollBar: false,
          },
        }}>
          <Notifications />
          <AppProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="create-campaign" element={<CreateCampaign />} />
                  <Route path="my-campaigns" element={<MyCampaignsPage />} />
                  <Route path="campaigns/featured" element={<FeaturedCampaignsPage />} />
                  <Route path="campaigns/trending" element={<TrendingCampaignsPage />} />
                  <Route path="campaigns/:id" element={<CampaignPage />} />
                  <Route path="faqs" element={<FAQsPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
                  <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
