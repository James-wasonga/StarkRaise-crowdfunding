import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Grid,
  Tabs,
  Paper,
  Button,
  Group,
  Loader,
  Stack,
  Badge,
  useMantineColorScheme,
  Alert,
  Box,
  Divider,
  ActionIcon,
  Menu,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconDotsVertical, 
  IconExternalLink, 
  IconAlertCircle,
  IconCheck,
  IconClock,
  IconHourglass,
} from '@tabler/icons-react';
import CampaignCard from '../components/common/CampaignCard';
import dummyCampaigns from '../utils/dummyData';

// Mock function to simulate getting user's wallet address
const getUserWalletAddress = () => {
  // In a real app, this would come from your wallet connection
  return '0x1234567890abcdef1234567890abcdef12345678';
};

const MyCampaignsPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('active');
  const [isLoading, setIsLoading] = useState(true);
  const [myCampaigns, setMyCampaigns] = useState<any[]>([]);
  const [myDrafts, setMyDrafts] = useState<any[]>([]);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const userAddress = getUserWalletAddress();

  // Calculate days left
  const calculateDaysLeft = (endsAt: string) => {
    if (!endsAt) return 0;
    const now = new Date();
    const endDate = new Date(endsAt);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Fetch user's campaigns
  useEffect(() => {
    const fetchMyCampaigns = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with dummy data
        setTimeout(() => {
          // Filter campaigns where creator matches user's address
          const userCampaigns = dummyCampaigns
            .filter(campaign => campaign.creator === userAddress)
            .map(campaign => ({
              ...campaign,
              daysLeft: calculateDaysLeft(campaign.endsAt || ''),
              // Add some random funds raised for demo
              fundsRaised: `${(Math.random() * parseFloat(campaign.target.split(' ')[0])).toFixed(2)} ${campaign.token.symbol}`
            }));

          // Create some mock drafts
          const draftCampaigns = [
            {
              id: 'draft-1',
              title: 'Cairo Zero-Knowledge Proof Library',
              description: 'A comprehensive library for ZK proofs in Cairo',
              lastUpdated: '2025-06-28T14:30:00Z',
              developmentStage: 'ideation',
              image: 'https://picsum.photos/800/600?random=10',
            },
            {
              id: 'draft-2',
              title: 'StarkNet Gaming SDK',
              description: 'Build blockchain games on StarkNet with ease',
              lastUpdated: '2025-06-25T09:15:00Z',
              developmentStage: 'prototype',
              image: 'https://picsum.photos/800/600?random=11',
            }
          ];

          setMyCampaigns(userCampaigns);
          setMyDrafts(draftCampaigns);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setIsLoading(false);
      }
    };

    fetchMyCampaigns();
  }, [userAddress]);

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

  // Get badge color based on development stage
  const getBadgeColor = (stage: string) => {
    switch (stage) {
      case 'ideation': return 'blue';
      case 'prototype': return 'indigo';
      case 'alpha': return 'violet';
      case 'beta': return 'grape';
      case 'mainnet': return 'green';
      case 'completed': return 'teal';
      default: return 'gray';
    }
  };

  // Get campaign status badge
  const getCampaignStatusBadge = (campaign: any) => {
    if (!campaign.endsAt) return <Badge color="gray">Draft</Badge>;
    
    const now = new Date();
    const endDate = new Date(campaign.endsAt);
    
    if (now > endDate) {
      return <Badge color="gray">Ended</Badge>;
    }
    
    const startDate = new Date(campaign.createdAt || '');
    if (now < startDate) {
      return <Badge color="yellow">Scheduled</Badge>;
    }
    
    return <Badge color="green">Active</Badge>;
  };

  // Handle campaign deletion (mock)
  const handleDeleteCampaign = (id: string, isDraft: boolean = false) => {
    if (isDraft) {
      setMyDrafts(prev => prev.filter(draft => draft.id !== id));
    } else {
      setMyCampaigns(prev => prev.filter(campaign => campaign.contractAddress !== id));
    }
    // In a real app, you would call an API to delete the campaign
  };

  return (
    <>
      <Helmet>
        <title>My Campaigns | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Group justify="apart" mb="xl">
          <div>
            <Title order={1} mb="xs">My Campaigns</Title>
            <Text c="dimmed">Manage your StarkRaise campaigns and drafts</Text>
          </div>
          <Button
            component={Link}
            to="/create-campaign"
            leftSection={<IconPlus size={20} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            radius="md"
          >
            Create New Campaign
          </Button>
        </Group>

        <Paper 
          radius="lg" 
          p="xl" 
          withBorder 
          mb="xl"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
          }}
        >
          <Tabs value={activeTab} onChange={setActiveTab} radius="md">
            <Tabs.List grow mb="xl">
              <Tabs.Tab value="active">Active Campaigns</Tabs.Tab>
              <Tabs.Tab value="drafts">Drafts</Tabs.Tab>
              <Tabs.Tab value="ended">Ended Campaigns</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="active">
              {isLoading ? (
                <Box py="xl" ta="center">
                  <Loader size="md" />
                  <Text mt="md">Loading your campaigns...</Text>
                </Box>
              ) : myCampaigns.filter(c => {
                  const endDate = new Date(c.endsAt || '');
                  return endDate > new Date();
                }).length > 0 ? (
                <Grid>
                  {myCampaigns
                    .filter(campaign => {
                      const endDate = new Date(campaign.endsAt || '');
                      return endDate > new Date();
                    })
                    .map((campaign) => (
                      <Grid.Col key={campaign.contractAddress} span={{ base: 12, sm: 6, md: 4 }}>
                        <CampaignCard
                          {...campaign}
                          onFavorite={() => {}}
                          onShare={() => {}}
                        />
                      </Grid.Col>
                    ))}
                </Grid>
              ) : (
                <Alert 
                  icon={<IconAlertCircle size={16} />} 
                  title="No active campaigns" 
                  color="blue"
                  variant="light"
                >
                  You don't have any active campaigns. Create a new campaign to get started!
                </Alert>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="drafts">
              {isLoading ? (
                <Box py="xl" ta="center">
                  <Loader size="md" />
                  <Text mt="md">Loading your drafts...</Text>
                </Box>
              ) : myDrafts.length > 0 ? (
                <Stack gap="md">
                  {myDrafts.map((draft) => (
                    <Paper 
                      key={draft.id} 
                      withBorder 
                      p="md" 
                      radius="md"
                      style={{
                        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      }}
                    >
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 9 }}>
                          <Group wrap="nowrap" align="flex-start" gap="md">
                            <Box 
                              style={{ 
                                width: 80, 
                                height: 80, 
                                backgroundImage: `url(${draft.image})`,
                                backgroundSize: 'cover',
                                backgroundjustify: 'center',
                                borderRadius: 8,
                              }} 
                            />
                            <div>
                              <Text fw={700} size="lg" mb={5}>{draft.title}</Text>
                              <Text size="sm" c="dimmed" lineClamp={2} mb={8}>
                                {draft.description}
                              </Text>
                              <Group gap="xs">
                                <Badge color={getBadgeColor(draft.developmentStage)}>
                                  {draft.developmentStage}
                                </Badge>
                                <Badge color="gray" variant="outline">Draft</Badge>
                                <Text size="xs" c="dimmed">
                                  Last updated: {formatDate(draft.lastUpdated)}
                                </Text>
                              </Group>
                            </div>
                          </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 3 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Group>
                            <Button 
                              component={Link}
                              to={`/create-campaign?draft=${draft.id}`}
                              variant="light" 
                              leftSection={<IconEdit size={16} />}
                              radius="md"
                            >
                              Edit
                            </Button>
                            <Menu position="bottom-end" shadow="md">
                              <Menu.Target>
                                <ActionIcon variant="subtle">
                                  <IconDotsVertical size={16} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item 
                                  color="red" 
                                  leftSection={<IconTrash size={rem(14)} />}
                                  onClick={() => handleDeleteCampaign(draft.id, true)}
                                >
                                  Delete draft
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </Grid.Col>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Alert 
                  icon={<IconAlertCircle size={16} />} 
                  title="No drafts found" 
                  color="blue"
                  variant="light"
                >
                  You don't have any campaign drafts. Start creating a new campaign and your progress will be saved as a draft.
                </Alert>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="ended">
              {isLoading ? (
                <Box py="xl" ta="center">
                  <Loader size="md" />
                  <Text mt="md">Loading your ended campaigns...</Text>
                </Box>
              ) : myCampaigns.filter(c => {
                  const endDate = new Date(c.endsAt || '');
                  return endDate <= new Date();
                }).length > 0 ? (
                <Stack gap="md">
                  {myCampaigns
                    .filter(campaign => {
                      const endDate = new Date(campaign.endsAt || '');
                      return endDate <= new Date();
                    })
                    .map((campaign) => (
                      <Paper 
                        key={campaign.contractAddress} 
                        withBorder 
                        p="md" 
                        radius="md"
                        style={{
                          borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        }}
                      >
                        <Grid>
                          <Grid.Col span={{ base: 12, sm: 9 }}>
                            <Group wrap="nowrap" align="flex-start" gap="md">
                              <Box 
                                style={{ 
                                  width: 80, 
                                  height: 80, 
                                  backgroundImage: `url(${campaign.image})`,
                                  backgroundSize: 'cover',
                                  backgroundjustify: 'center',
                                  borderRadius: 8,
                                }} 
                              />
                              <div>
                                <Text fw={700} size="lg" mb={5}>{campaign.title}</Text>
                                <Text size="sm" c="dimmed" lineClamp={2} mb={8}>
                                  {campaign.description}
                                </Text>
                                <Group gap="xs" mb={8}>
                                  <Badge color={getBadgeColor(campaign.developmentStage)}>
                                    {campaign.developmentStage}
                                  </Badge>
                                  <Badge color="gray">Ended</Badge>
                                  <Text size="xs" c="dimmed">
                                    Ended: {formatDate(campaign.endsAt)}
                                  </Text>
                                </Group>
                                <Group gap="xs">
                                  <Text size="sm" fw={500}>
                                    {campaign.fundsRaised} raised of {campaign.target}
                                  </Text>
                                  <Divider orientation="vertical" />
                                  <Text size="sm" c="dimmed">
                                    Campaign ID: {campaign.contractAddress.substring(0, 8)}...
                                  </Text>
                                </Group>
                              </div>
                            </Group>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 3 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Group>
                              <Button 
                                component={Link}
                                to={`/campaigns/${campaign.contractAddress}`}
                                variant="light" 
                                leftSection={<IconExternalLink size={16} />}
                                radius="md"
                              >
                                View
                              </Button>
                              <Menu position="bottom-end" shadow="md">
                                <Menu.Target>
                                  <ActionIcon variant="subtle">
                                    <IconDotsVertical size={16} />
                                  </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                  <Menu.Item leftSection={<IconCheck size={rem(14)} />}>
                                    Mark as completed
                                  </Menu.Item>
                                  <Menu.Item leftSection={<IconClock size={rem(14)} />}>
                                    Extend deadline
                                  </Menu.Item>
                                  <Menu.Item 
                                    color="red" 
                                    leftSection={<IconTrash size={rem(14)} />}
                                    onClick={() => handleDeleteCampaign(campaign.contractAddress)}
                                  >
                                    Delete campaign
                                  </Menu.Item>
                                </Menu.Dropdown>
                              </Menu>
                            </Group>
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    ))}
                </Stack>
              ) : (
                <Alert 
                  icon={<IconAlertCircle size={16} />} 
                  title="No ended campaigns" 
                  color="blue"
                  variant="light"
                >
                  You don't have any ended campaigns yet.
                </Alert>
              )}
            </Tabs.Panel>
          </Tabs>
        </Paper>

        <Paper 
          radius="lg" 
          p="xl" 
          withBorder
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'white',
          }}
        >
          <Title order={3} mb="md">Campaign Stats</Title>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" radius="md" withBorder>
                <Text size="lg" fw={700} mb={5}>Total Raised</Text>
                <Text size="xl" fw={900} c="blue">
                  {myCampaigns.reduce((acc, campaign) => {
                    const amount = parseFloat(campaign.fundsRaised?.split(' ')[0] || '0');
                    return acc + amount;
                  }, 0).toFixed(2)} ETH
                </Text>
                <Text size="xs" c="dimmed">Across all campaigns</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" radius="md" withBorder>
                <Text size="lg" fw={700} mb={5}>Active Campaigns</Text>
                <Text size="xl" fw={900} c="green">
                  {myCampaigns.filter(c => {
                    const endDate = new Date(c.endsAt || '');
                    return endDate > new Date();
                  }).length}
                </Text>
                <Text size="xs" c="dimmed">Currently running</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" radius="md" withBorder>
                <Text size="lg" fw={700} mb={5}>Total Backers</Text>
                <Text size="xl" fw={900} c="violet">
                  {/* Mock data for backers */}
                  {Math.floor(Math.random() * 50) + 10}
                </Text>
                <Text size="xs" c="dimmed">Supporting your projects</Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default MyCampaignsPage;
