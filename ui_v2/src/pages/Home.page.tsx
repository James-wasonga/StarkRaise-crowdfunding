
import {
  Group,
  Title,
  Container,
  Text,
  Button,
  SimpleGrid,
  Stack,
  useMantineTheme,
  Paper,
  Overlay,
  Center,
  BackgroundImage,
  useMantineColorScheme,
} from '@mantine/core';
import { CampaignCard } from '../components/common/CampaignCard';
import { CampaignFilterForm, FilterValues } from '../components/common/CampaingFileterForm';
import dummyCampaigns from '../utils/dummyData';
import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { ModernHero } from '../components/home/ModernHero';

export function HomePage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    network: 'all',
    developmentStage: [],
    category: [],
    sortBy: 'newest',
    sortDirection: 'desc',
  });
  const [displayCampaigns, setDisplayCampaigns] = useState(dummyCampaigns);

  // Handle campaign filtering with advanced filters
  useEffect(() => {
    let filtered = [...dummyCampaigns];

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchLower) ||
        campaign.description.toLowerCase().includes(searchLower) ||
        campaign.category.toLowerCase().includes(searchLower)
      );
    }

    // Filter by network
    if (filters.network !== 'all') {
      filtered = filtered.filter(campaign => campaign.network === filters.network);
    }

    // Filter by development stage
    if (filters.developmentStage.length > 0) {
      filtered = filtered.filter(campaign =>
        filters.developmentStage.includes(campaign.developmentStage)
      );
    }

    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter(campaign =>
        filters.category.includes(campaign.category)
      );
    }

    // Sort campaigns
    filtered.sort((a, b) => {
      const direction = filters.sortDirection === 'asc' ? 1 : -1;

      switch (filters.sortBy) {
        case 'newest':
          return direction * (new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        case 'oldest':
          return direction * (new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
        case 'funding':
          const aFunding = parseFloat(a.fundsRaised?.split(' ')[0] || '0');
          const bFunding = parseFloat(b.fundsRaised?.split(' ')[0] || '0');
          return direction * (bFunding - aFunding);
        case 'ending':
          // Calculate days left based on endsAt property
          const now = new Date();
          const aEndDate = a.endsAt ? new Date(a.endsAt) : null;
          const bEndDate = b.endsAt ? new Date(b.endsAt) : null;
          const aDaysLeft = aEndDate ? Math.max(0, Math.ceil((aEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;
          const bDaysLeft = bEndDate ? Math.max(0, Math.ceil((bEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))) : 0;
          return direction * (aDaysLeft - bDaysLeft);
        default:
          return 0;
      }
    });

    setDisplayCampaigns(filtered);
  }, [filters]);

  // Calculate days left for each campaign
  const campaignsWithDaysLeft = displayCampaigns.map(campaign => {
    // Extract number from duration (e.g., "60 days" -> 60)
    const durationDays = parseInt(campaign.duration.split(' ')[0]);
    // Random number between 1 and duration for demo purposes
    const daysLeft = Math.floor(Math.random() * durationDays) + 1;
    // Random raised amount between 10% and 90% of target for demo
    const targetAmount = parseFloat(campaign.target.split(' ')[0]);
    const fundsRaised = (Math.random() * 0.8 + 0.1) * targetAmount;

    return {
      ...campaign,
      daysLeft,
      fundsRaised: `${fundsRaised.toFixed(2)} ${campaign.token.symbol}`,
      badgeText: campaign.category
    };
  });

  return (
    <>  
      <Helmet>
        <title>StarkRaise | Decentralized Crowdfunding on Starknet</title>
        <meta name="description" content="StarkRaise is a decentralized crowdfunding platform built on Starknet. Discover innovative projects, back campaigns with crypto, and help bring creative ideas to life." />
        <meta name="keywords" content="Starknet, crowdfunding, blockchain, crypto, fundraising, web3, decentralized" />
      </Helmet>
      <div>
        <Container size="xl" py="xl">
          <ModernHero 
            onExplore={() => console.log('Explore projects clicked')} 
            onLearnMore={() => console.log('Learn more clicked')} 
          />

          <Paper p="xl" radius="lg" style={{ backgroundColor: isDark ? 'rgba(26, 27, 30, 0.8)' : 'rgba(239, 243, 255, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Stack>
              <Title order={2} style={{ fontSize: '2rem', fontWeight: 700, marginBottom: theme.spacing.md }}>Featured Campaigns</Title>

              <CampaignFilterForm
                onFilterChange={setFilters}
                totalCampaigns={dummyCampaigns.length}
                filteredCount={displayCampaigns.length}
              />

              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                {campaignsWithDaysLeft.map((campaign) => (
                  <CampaignCard
                    key={campaign.id || campaign.contractAddress}
                    title={campaign.title}
                    description={campaign.description}
                    image={campaign.image}
                    target={campaign.target}
                    fundsRaised={campaign.fundsRaised}
                    creator={campaign.creator}
                    contractAddress={campaign.contractAddress}
                    network={campaign.network}
                    developmentStage={campaign.developmentStage}
                    daysLeft={campaign.daysLeft}
                    badgeText={campaign.badgeText}
                    onFavorite={(id) => console.log('Favorite:', id)}
                    onShare={(id) => console.log('Share:', id)}
                  />
                ))}
              </SimpleGrid>
            </Stack>  
          </Paper>
        </Container>
    </div>
    </> 
  );
}
