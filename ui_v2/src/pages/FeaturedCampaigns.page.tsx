import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Badge,
  Loader,
  Box,
  useMantineColorScheme,
  Image,
  Overlay,
  Button,
  Stack,
  Card,
  SimpleGrid,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { 
  IconTrophy, 
  IconRocket, 
  IconStar, 
  IconFlame, 
  IconArrowUp, 
  IconUsers, 
  IconBrandTwitter 
} from '@tabler/icons-react';
import CampaignCard from '../components/common/CampaignCard';
import dummyCampaigns from '../utils/dummyData';

const FeaturedCampaignsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredCampaigns, setFeaturedCampaigns] = useState<any[]>([]);
  const [trendingCampaigns, setTrendingCampaigns] = useState<any[]>([]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Calculate days left
  const calculateDaysLeft = (endsAt: string) => {
    if (!endsAt) return 0;
    const now = new Date();
    const endDate = new Date(endsAt);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Fetch featured campaigns
  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with dummy data
        setTimeout(() => {
          // Get random campaigns and mark them as featured
          const shuffled = [...dummyCampaigns].sort(() => 0.5 - Math.random());
          
          // Select top 3 for spotlight featured
          const featured = shuffled.slice(0, 3).map(campaign => ({
            ...campaign,
            daysLeft: calculateDaysLeft(campaign.endsAt || ''),
            // Add some random funds raised for demo
            fundsRaised: `${(Math.random() * 0.7 * parseFloat(campaign.target.split(' ')[0])).toFixed(2)} ${campaign.token.symbol}`,
            badgeText: ['FEATURED', 'HOT', 'NEW'][Math.floor(Math.random() * 3)]
          }));
          
          // Select next 6 for trending
          const trending = shuffled.slice(3, 9).map(campaign => ({
            ...campaign,
            daysLeft: calculateDaysLeft(campaign.endsAt || ''),
            // Add some random funds raised for demo
            fundsRaised: `${(Math.random() * 0.5 * parseFloat(campaign.target.split(' ')[0])).toFixed(2)} ${campaign.token.symbol}`
          }));

          setFeaturedCampaigns(featured);
          setTrendingCampaigns(trending);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setIsLoading(false);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate progress percentage
  const calculateProgress = (target: string, fundsRaised: string) => {
    const targetValue = parseFloat(target.split(' ')[0]) || 0;
    const raisedValue = parseFloat(fundsRaised.split(' ')[0]) || 0;
    return targetValue > 0 ? Math.min((raisedValue / targetValue) * 100, 100) : 0;
  };

  // Format address
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Box py="xl" ta="center">
          <Loader size="lg" />
          <Text mt="md">Loading featured campaigns...</Text>
        </Box>
      </Container>
    );
  }

  const spotlightCampaign = featuredCampaigns[0];
  const secondaryFeatured = featuredCampaigns.slice(0);

  return (
    <>
      <Helmet>
        <title>Featured Campaigns | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Group justify="apart" mb="xl">
          <div>
            <Title order={1} mb="xs">Featured Campaigns</Title>
            <Text c="dimmed">Discover the most innovative projects on StarkNet</Text>
          </div>
          <Badge size="xl" radius="md" variant="filled" color="yellow" leftSection={<IconTrophy size={16} />}>
            Curated Selection
          </Badge>
        </Group>

        {/* Spotlight Campaign */}
        {spotlightCampaign && (
          <Paper 
            radius="lg" 
            p={0} 
            mb="xl" 
            style={{ 
              overflow: 'hidden',
              justify: 'relative',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            //   boxShadow: isDark ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            <Box style={{ justify: 'relative', height: 400 }}>
              <Image
                src={spotlightCampaign.image}
                height={400}
                style={{ objectFit: 'cover' }}
              />
              {/* <Overlay
                gradient={`linear-gradient(0deg, ${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.7)'} 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)`}
                opacity={0.85}
                zIndex={1}
              /> */}
              <Box
                style={{
                  justify: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  zIndex: 2,
                  color: 'white',
                }}
              >
                <Group mb="md">
                  <Badge color="yellow" size="lg">
                    Spotlight Project
                  </Badge>
                  <Badge color={spotlightCampaign.network === 'mainnet' ? 'green' : 'orange'} size="lg">
                    {spotlightCampaign.network}
                  </Badge>
                </Group>
                
                <Title order={1} mb="md" style={{ color: 'white' }}>
                  {spotlightCampaign.title}
                </Title>
                
                <Text size="lg" mb="xl" lineClamp={2} style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {spotlightCampaign.description}
                </Text>
                
                <Group justify="apart">
                  <Text fw={600} size="lg" style={{ color: 'white' }}>
                    {spotlightCampaign.fundsRaised} raised of {spotlightCampaign.target}
                  </Text>
                  
                  <Group>
                    <Button 
                      component="a"
                      href={`/campaigns/${spotlightCampaign.contractAddress}`}
                      variant="gradient"
                      gradient={{ from: 'yellow', to: 'orange' }}
                      size="md"
                      radius="md"
                      rightSection={<IconArrowUp size={16} />}
                    >
                      View Project
                    </Button>
                  </Group>
                </Group>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Secondary Featured */}
        <Grid mb="xl">
          {secondaryFeatured.map((campaign) => (
            <Grid.Col key={campaign.contractAddress} span={{ base: 12, md: 4 }}>
              <CampaignCard
                {...campaign}
                onFavorite={() => {}}
                onShare={() => {}}
              />
            </Grid.Col>
          ))}
        </Grid>

        {/* Why Featured Section */}
        <Paper 
          radius="lg" 
          p="xl" 
          mb="xl" 
          withBorder
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }}
        >
          <Title order={2} mb="lg" ta="center">Why Featured on StarkRaise?</Title>
          
          <SimpleGrid cols={3} spacing="lg">
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="blue" mb="md">
                <IconRocket size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Innovation</Text>
              <Text size="sm" c="dimmed">
                Projects that push the boundaries of what's possible on StarkNet and contribute to the ecosystem.
              </Text>
            </Card>
            
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="violet" mb="md">
                <IconUsers size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Community Impact</Text>
              <Text size="sm" c="dimmed">
                Solutions that address real needs within the StarkNet community and broader blockchain ecosystem.
              </Text>
            </Card>
            
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="green" mb="md">
                <IconStar size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Quality & Execution</Text>
              <Text size="sm" c="dimmed">
                Teams with proven track records, clear roadmaps, and strong technical foundations.
              </Text>
            </Card>
          </SimpleGrid>
        </Paper>

        {/* Trending Campaigns */}
        <Title order={2} mb="lg">
          <Group gap="xs">
            <IconFlame color="orange" />
            <Text>Trending Projects</Text>
          </Group>
        </Title>
        
        <Grid mb="xl">
          {trendingCampaigns.map((campaign) => (
            <Grid.Col key={campaign.contractAddress} span={{ base: 12, sm: 6, md: 4 }}>
              <CampaignCard
                {...campaign}
                onFavorite={() => {}}
                onShare={() => {}}
              />
            </Grid.Col>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper 
          radius="lg" 
          p="xl" 
          withBorder
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <Stack align="center" gap="md">
            <Title order={2}>Ready to Launch Your Project?</Title>
            <Text size="lg" maw={600} mx="auto">
              Join the growing community of innovators building on StarkNet. Create your campaign today and bring your vision to life.
            </Text>
            <Group mt="md">
              <Button 
                component="a"
                href="/create-campaign"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                size="lg"
                radius="md"
                leftSection={<IconRocket size={20} />}
              >
                Create Your Campaign
              </Button>
              <Button 
                component="a"
                href="https://twitter.com/StarkNetFyi"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="lg"
                radius="md"
                leftSection={<IconBrandTwitter size={20} />}
              >
                Follow Us
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default FeaturedCampaignsPage;
