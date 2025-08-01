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
  Tabs,
  RingProgress,
  Card,
  SimpleGrid,
  ThemeIcon,
  rem,
  Stack,
  Divider,
} from '@mantine/core';
import { 
  IconTrendingUp, 
  IconArrowUpRight, 
  IconUsers, 
  IconClock, 
  IconCoin,
  IconChartBar,
  IconChartPie,
  IconRocket
} from '@tabler/icons-react';
import CampaignCard from '../components/common/CampaignCard';
import dummyCampaigns from '../utils/dummyData';

const TrendingCampaignsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trendingCampaigns, setTrendingCampaigns] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>('today');
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

  // Fetch trending campaigns based on active tab
  useEffect(() => {
    const fetchTrendingCampaigns = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with dummy data
        setTimeout(() => {
          // Shuffle campaigns to simulate different trending lists
          const shuffled = [...dummyCampaigns].sort(() => 0.5 - Math.random());
          
          // Add trending metrics based on the selected time period
          const trending = shuffled.slice(0, 9).map(campaign => {
            // Generate random metrics based on the selected time period
            let growth = 0;
            let backers = 0;
            let views = 0;
            
            switch(activeTab) {
              case 'today':
                growth = Math.random() * 15 + 5; // 5-20%
                backers = Math.floor(Math.random() * 50) + 10;
                views = Math.floor(Math.random() * 500) + 100;
                break;
              case 'week':
                growth = Math.random() * 40 + 10; // 10-50%
                backers = Math.floor(Math.random() * 200) + 50;
                views = Math.floor(Math.random() * 2000) + 500;
                break;
              case 'month':
                growth = Math.random() * 100 + 20; // 20-120%
                backers = Math.floor(Math.random() * 500) + 100;
                views = Math.floor(Math.random() * 5000) + 1000;
                break;
              default:
                growth = Math.random() * 15 + 5;
                backers = Math.floor(Math.random() * 50) + 10;
                views = Math.floor(Math.random() * 500) + 100;
            }
            
            return {
              ...campaign,
              daysLeft: calculateDaysLeft(campaign.endsAt || ''),
              // Add some random funds raised for demo
              fundsRaised: `${(Math.random() * 0.7 * parseFloat(campaign.target.split(' ')[0])).toFixed(2)} ${campaign.token.symbol}`,
              growth: growth.toFixed(1), // Growth percentage
              newBackers: backers,
              views: views,
              rank: Math.floor(Math.random() * 5) + 1, // Rank 1-5 for trending score
            };
          });

          // Sort by growth rate
          trending.sort((a, b) => parseFloat(b.growth) - parseFloat(a.growth));
          
          setTrendingCampaigns(trending);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setIsLoading(false);
      }
    };

    fetchTrendingCampaigns();
  }, [activeTab]);

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

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Box py="xl" ta="center">
          <Loader size="lg" />
          <Text mt="md">Loading trending campaigns...</Text>
        </Box>
      </Container>
    );
  }

  // Get top 3 trending campaigns
  const topTrending = trendingCampaigns.slice(0, 3);
  // Get the rest of the trending campaigns
  const otherTrending = trendingCampaigns.slice(3);

  return (
    <>
      <Helmet>
        <title>Trending Campaigns | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Group justify="apart" mb="xl">
          <div>
            <Title order={1} mb="xs">Trending Campaigns</Title>
            <Text c="dimmed">Discover what's hot on StarkRaise right now</Text>
          </div>
          <Badge size="xl" radius="md" variant="filled" color="green" leftSection={<IconTrendingUp size={16} />}>
            Rising Projects
          </Badge>
        </Group>

        {/* Time period tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
          <Tabs.List>
            <Tabs.Tab value="today" leftSection={<IconClock size={16} />}>
              Today
            </Tabs.Tab>
            <Tabs.Tab value="week" leftSection={<IconChartBar size={16} />}>
              This Week
            </Tabs.Tab>
            <Tabs.Tab value="month" leftSection={<IconChartPie size={16} />}>
              This Month
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Trending Stats */}
        <SimpleGrid cols={3} spacing="lg" mb="xl" >
          <Paper p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="green">
                <IconArrowUpRight size={24} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">Average Growth</Text>
                <Text size="xl" fw={700}>
                  {(trendingCampaigns.reduce((acc, campaign) => acc + parseFloat(campaign.growth), 0) / trendingCampaigns.length).toFixed(1)}%
                </Text>
              </div>
            </Group>
          </Paper>
          
          <Paper p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="blue">
                <IconUsers size={24} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">New Backers</Text>
                <Text size="xl" fw={700}>
                  {trendingCampaigns.reduce((acc, campaign) => acc + campaign.newBackers, 0).toLocaleString()}
                </Text>
              </div>
            </Group>
          </Paper>
          
          <Paper p="md" radius="md" withBorder>
            <Group>
              <ThemeIcon size={48} radius="md" variant="light" color="violet">
                <IconCoin size={24} />
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">Total Raised</Text>
                <Text size="xl" fw={700}>
                  {trendingCampaigns.reduce((acc, campaign) => {
                    const amount = parseFloat(campaign.fundsRaised.split(' ')[0]);
                    return acc + amount;
                  }, 0).toFixed(2)} ETH
                </Text>
              </div>
            </Group>
          </Paper>
        </SimpleGrid>

        {/* Top 3 Trending */}
        <Title order={2} mb="md">Top Trending</Title>
        <Grid mb="xl">
          {topTrending.map((campaign, index) => (
            <Grid.Col key={campaign.contractAddress} span={{ base: 12, md: 4 }}>
              <Card p="lg" radius="md" withBorder>
                <Card.Section>
                  <Box pos="relative">
                    <Badge 
                      pos="absolute" 
                      top={10} 
                      left={10} 
                      size="lg" 
                      radius="sm" 
                      color="green"
                      variant="filled"
                    >
                      #{index + 1} Trending
                    </Badge>
                    <Badge 
                      pos="absolute" 
                      top={10} 
                      right={10} 
                      size="lg" 
                      radius="sm" 
                      color="orange"
                      variant="filled"
                      leftSection={<IconArrowUpRight size={14} />}
                    >
                      +{campaign.growth}%
                    </Badge>
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover' 
                      }}
                    />
                  </Box>
                </Card.Section>
                
                <Text fw={700} size="lg" mt="md" mb="xs" lineClamp={1}>
                  {campaign.title}
                </Text>
                
                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                  {campaign.description}
                </Text>
                
                <Group justify="apart" mb="xs">
                  <Text size="sm" c="dimmed">Progress</Text>
                  <Text size="sm" fw={500}>
                    {calculateProgress(campaign.target, campaign.fundsRaised).toFixed(0)}%
                  </Text>
                </Group>
                
                <Group justify="apart" mb="md">
                  <div>
                    <Text size="xs" c="dimmed">Raised</Text>
                    <Text fw={500}>{campaign.fundsRaised}</Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text size="xs" c="dimmed">Target</Text>
                    <Text fw={500}>{campaign.target}</Text>
                  </div>
                </Group>
                
                <Divider mb="md" />
                
                <Group justify="apart">
                  <div>
                    <Text size="xs" c="dimmed">New Backers</Text>
                    <Group>
                      <IconUsers size={14} />
                      <Text size="sm">+{campaign.newBackers}</Text>
                    </Group>
                  </div>
                  <div>
                    <Text size="xs" c="dimmed">Days Left</Text>
                    <Group>
                      <IconClock size={14} />
                      <Text size="sm">{campaign.daysLeft}</Text>
                    </Group>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Other Trending Campaigns */}
        <Title order={2} mb="md">More Trending Projects</Title>
        <Grid>
          {otherTrending.map((campaign) => (
            <Grid.Col key={campaign.contractAddress} span={{ base: 12, sm: 6, md: 4 }}>
              <CampaignCard
                {...campaign}
                onFavorite={() => {}}
                onShare={() => {}}
              />
            </Grid.Col>
          ))}
        </Grid>
        
        {/* Trending Insights */}
        <Paper 
          radius="lg" 
          p="xl" 
          mt="xl"
          withBorder
          style={{
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }}
        >
          <Title order={2} mb="lg" ta="center">What Makes a Project Trend?</Title>
          
          <SimpleGrid cols={3} spacing="lg">
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="green" mb="md">
                <IconArrowUpRight size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Rapid Growth</Text>
              <Text size="sm" c="dimmed">
                Projects that show significant funding momentum and attract new backers quickly.
              </Text>
            </Card>
            
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="blue" mb="md">
                <IconUsers size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Community Engagement</Text>
              <Text size="sm" c="dimmed">
                High levels of social sharing, comments, and active participation from the community.
              </Text>
            </Card>
            
            <Card p="lg" radius="md" withBorder>
              <ThemeIcon size={50} radius="md" variant="light" color="orange" mb="md">
                <IconRocket size={rem(26)} />
              </ThemeIcon>
              <Text fw={700} size="lg" mb="xs">Innovation Factor</Text>
              <Text size="sm" c="dimmed">
                Unique solutions and innovative approaches that capture attention in the StarkNet ecosystem.
              </Text>
            </Card>
          </SimpleGrid>
        </Paper>
      </Container>
    </>
  );
};

export default TrendingCampaignsPage;
