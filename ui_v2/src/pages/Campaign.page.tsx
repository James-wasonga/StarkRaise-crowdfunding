
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Button,
  Progress,
  Tabs,
  Anchor,
  Avatar,
  Card,
  Stack,
  Table,
  Timeline,
  Box,
  useMantineColorScheme,
  rem,
  TextInput,
  Textarea,
  Checkbox,
  Divider,
  SimpleGrid,
  Select,
  List,
  ThemeIcon,
  CopyButton,
  ActionIcon,
  useMantineTheme,
  Image,
  Tooltip,
} from '@mantine/core';
import {
  IconHeart,
  IconShare,
  IconExternalLink,
  IconBrandTwitter,
  IconBrandDiscord,
  IconWorld,
  IconCheck,
  IconCopy,
  IconCoin,
  IconCalendar,
  IconUsers,
  IconChartBar,
  IconClock,
  IconBrandTelegram,
  IconCircleCheck,
  IconCircleDashed,
  IconBrandGithub,
  IconGift,
} from '@tabler/icons-react';
import dummyCampaigns from '../utils/dummyData';
import ReactMarkdown from 'react-markdown';
import { modals } from '@mantine/modals';
import { IconCurrencyEthereum } from '@tabler/icons-react';
import { IStarknetCampaign } from '@/types';

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    txHash: '0x123...abc',
    from: '0xabc...123',
    amount: '0.5 ETH',
    timestamp: '2025-07-14T15:30:00Z',
    status: 'confirmed',
  },
  {
    id: '2',
    txHash: '0x456...def',
    from: '0xdef...456',
    amount: '1.2 ETH',
    timestamp: '2025-07-13T12:45:00Z',
    status: 'confirmed',
  },
  {
    id: '3',
    txHash: '0x789...ghi',
    from: '0xghi...789',
    amount: '0.3 ETH',
    timestamp: '2025-07-12T09:15:00Z',
    status: 'confirmed',
  },
  {
    id: '4',
    txHash: '0xjkl...012',
    from: '0x012...jkl',
    amount: '0.8 ETH',
    timestamp: '2025-07-11T18:20:00Z',
    status: 'confirmed',
  },
  {
    id: '5',
    txHash: '0xmno...345',
    from: '0x345...mno',
    amount: '0.6 ETH',
    timestamp: '2025-07-10T14:10:00Z',
    status: 'confirmed',
  },
];

const BackingForm = ({campaign}: {campaign: IStarknetCampaign}) => {
  
  const theme = useMantineTheme();

  const borderRadius = theme.radius.md;

  return (
    <>
      <Text size="sm" c="dimmed" mb="md">
        Join {campaign?.backers || 0} others in supporting this project and help make it a reality.
      </Text>

      <Tabs defaultValue="amount">
        <Tabs.List mb="md">
          <Tabs.Tab value="amount" leftSection={<IconCurrencyEthereum size={16} />}>
            Choose Amount
          </Tabs.Tab>
          <Tabs.Tab value="rewards" leftSection={<IconGift size={16} />}>
            Select Reward
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="amount">
          <Paper withBorder p="md" radius="md" mb="md">
            <Stack>
              <Text fw={500} size="lg">Contribution Amount</Text>

              <Group grow mb="xs">
                {[0.1, 0.5, 1, 5, 10].map((amount) => (
                  <Button
                    key={amount}
                    variant="light"
                    onClick={() => { }}
                    radius={borderRadius}
                  >
                    {amount} ETH
                  </Button>
                ))}
              </Group>

              <TextInput
                label="Custom amount"
                placeholder="Enter amount"
                rightSection={<Text size="sm" fw={500}>ETH</Text>}
                type="number"
                step="0.01"
                min="0.01"
                radius={borderRadius}
              />

              <Select
                label="Token"
                placeholder="Select token"
                data={[
                  { value: 'eth', label: 'Ethereum (ETH)' },
                  { value: 'usdc', label: 'USD Coin (USDC)' },
                  { value: 'dai', label: 'Dai (DAI)' },
                ]}
                defaultValue="eth"
                radius={borderRadius}
              />
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="md" mb="md">
            <Stack>
              <Text fw={500} size="lg">Message (Optional)</Text>
              <Textarea
                placeholder="Add a message of support to the creator"
                minRows={3}
                radius={borderRadius}
              />
              <Checkbox
                label="Make my contribution anonymous"
                radius={borderRadius}
              />
            </Stack>
          </Paper>

          <Paper withBorder p="md" radius="md" mb="md" style={{ background: 'rgba(var(--mantine-color-blue-light-color), 0.1)' }}>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Your contribution</Text>
              <Text fw={700}>1.0 ETH</Text>
            </Group>
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">Network fee (estimated)</Text>
              <Text size="sm">~0.001 ETH</Text>
            </Group>
            <Divider my="sm" />
            <Group justify="space-between">
              <Text fw={700}>Total</Text>
              <Text fw={700}>1.001 ETH</Text>
            </Group>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="rewards">
          <SimpleGrid cols={1} spacing="lg">
            {[1, 2, 3].map((tier) => (
              <Paper 
                key={tier} 
                withBorder 
                p="xl" 
                radius="lg"
                shadow={tier === 2 ? "md" : "none"}
                style={{
                  transform: tier === 2 ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                  position: 'relative',
                  border: tier === 2 ? '2px solid var(--mantine-color-violet-5)' : undefined,
                  zIndex: tier === 2 ? 2 : 1,
                }}
              >
                {tier === 2 && (
                  <Badge 
                    color="violet" 
                    size="lg" 
                    variant="filled" 
                    style={{ 
                      position: 'absolute', 
                      top: -12, 
                      right: 20,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    RECOMMENDED
                  </Badge>
                )}
                <Group justify="space-between" mb="md">
                  <Badge 
                    color={tier === 1 ? 'blue' : tier === 2 ? 'violet' : 'green'} 
                    size="lg"
                    radius="md"
                    variant={tier === 2 ? "filled" : "light"}
                    px="md"
                    py="xs"
                  >
                    {tier === 1 ? 'Early Bird' : tier === 2 ? 'Premium' : 'VIP'}
                  </Badge>
                  <Text 
                    fw={700} 
                    size={tier === 2 ? "xl" : "lg"}
                    c={tier === 2 ? "violet" : undefined}
                  >
                    {tier === 1 ? '0.5' : tier === 2 ? '2' : '5'} ETH
                  </Text>
                </Group>
                <Text 
                  fw={600} 
                  mb="sm"
                  size={tier === 2 ? "lg" : "md"}
                >
                  {tier === 1 ? 'Basic Support Package' :
                    tier === 2 ? 'Premium Supporter Bundle' :
                      'VIP Backer Experience'}
                </Text>
                <Text size="sm" mb="lg" c="dimmed">
                  {tier === 1 ? 'Get early access to the platform and a special mention on our website.' :
                    tier === 2 ? 'Receive exclusive NFT, premium access, and join monthly calls with the team.' :
                      'Full VIP experience with personalized support, custom features, and advisory role.'}
                </Text>
                <Divider my="md" />
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    <b>Limited:</b> {tier === 1 ? '50/100' : tier === 2 ? '25/50' : '5/10'} claimed
                  </Text>
                  <Button 
                    variant={tier === 2 ? 'gradient' : 'light'} 
                    gradient={tier === 2 ? { from: 'violet', to: 'grape' } : undefined}
                    size="md"
                    radius="md"
                    fw={500}
                  >
                    Select
                  </Button>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={() => modals.closeAll()}>Cancel</Button>
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          leftSection={<IconCurrencyEthereum size={16} />}
        >
          Complete Contribution
        </Button>
      </Group>
    </>
  )
}

const CampaignPage = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>('about');
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!campaign) return 0;
    const targetValue = parseFloat(campaign.target.split(' ')[0]) || 0;
    const raisedValue = parseFloat(campaign.fundsRaised?.split(' ')[0]) || 0;
    return targetValue > 0 ? Math.min((raisedValue / targetValue) * 100, 100) : 0;
  };

  // Calculate days left
  const calculateDaysLeft = () => {
    if (!campaign || !campaign.endsAt) return 0;
    const now = new Date();
    const endDate = new Date(campaign.endsAt);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

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

  // Format address
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
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

  // Get network badge color
  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'mainnet': return 'green';
      case 'sepolia': return 'orange';
      case 'custom': return 'gray';
      default: return 'blue';
    }
  };

  const openBackingModal = () => {
    return modals.open({
      title: 'Back This Project',
      size: 'lg',
      radius: "lg",
      // lockScroll: false, 
      transitionProps: {
        duration: 200,
        transition: "slide-up",
        timingFunction: 'ease',
      },
      children: (
        <BackingForm campaign={campaign} />
      ),
      centered: true,
    })
  };

  // Fetch campaign data
  useEffect(() => {
    // Simulate API call with dummy data
    const fetchCampaign = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCampaign = dummyCampaigns.find(c => c.contractAddress === id);
        if (foundCampaign) {
          // Add calculated fields
          const daysLeft = calculateDaysLeft();
          const targetAmount = parseFloat(foundCampaign.target.split(' ')[0]);
          const fundsRaised = (Math.random() * 0.8 + 0.1) * targetAmount;

          setCampaign({
            ...foundCampaign,
            daysLeft,
            fundsRaised: `${fundsRaised.toFixed(2)} ${foundCampaign.token.symbol}`,
            backers: Math.floor(Math.random() * 50) + 5, // Random backers count
          });
        }
        setLoading(false);
      }, 500);
    };

    if (id) {
      fetchCampaign();
    }
  }, [id]);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Text>Loading campaign details...</Text>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container size="xl" py="xl">
        <Text>Campaign not found</Text>
      </Container>
    );
  }

  const progress = calculateProgress();

  return (
    <>
      <Helmet>
        <title>{campaign?.title ? `${campaign.title} | StarkRaise` : 'Campaign Details | StarkRaise'}</title>
        <meta name="description" content={campaign?.description ? campaign.description.substring(0, 160) : 'View campaign details, progress, updates and support this project on StarkRaise.'} />
        <meta name="keywords" content="StarkNet, crowdfunding, blockchain, campaign details, crypto fundraising, web3" />
      </Helmet>
      <Container size="xl" py="xl">
      {/* Hero Section */}
      <Paper
        radius="lg"
        p={0}
        mb="xl"
        style={{
          overflow: 'hidden',
          border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          boxShadow: isDark ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.1)',
        }}
      >
        <Grid gutter={0}>
          <Grid.Col span={{ base: 12, md: 6 }} p="md">
            <Image
              src={campaign.image}
              height={400}
              radius="lg"
              style={{ objectFit: 'cover' }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p="xl" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Group mb="md">
                <Badge color={getNetworkColor(campaign.network)} size="lg">
                  {campaign.network}
                </Badge>
                <Badge color={getBadgeColor(campaign.developmentStage)} size="lg">
                  {campaign.developmentStage}
                </Badge>
                {campaign.category && (
                  <Badge color="pink" size="lg">
                    {campaign.category}
                  </Badge>
                )}
              </Group>

              <Title order={1} mb="md">{campaign.title}</Title>

              <Text size="lg" mb="xl" lineClamp={3}>
                {campaign.description}
              </Text>

              <Box mt="auto">
                <Group justify="apart" mb={5}>
                  <Text fw={600} size="lg">
                    {campaign.fundsRaised} raised of {campaign.target}
                  </Text>
                  <Text
                    fw={600}
                    size="lg"
                    c={progress >= 100 ? 'green' : progress > 50 ? 'blue' : undefined}
                  >
                    {progress.toFixed(0)}%
                  </Text>
                </Group>

                <Progress
                  value={progress}
                  size="xl"
                  radius="md"
                  color={progress >= 100 ? 'green' : progress > 75 ? 'teal' : progress > 50 ? 'blue' : 'violet'}
                  striped={progress > 90}
                  animated={progress > 90}
                  mb="md"
                />

                <Group justify="apart">
                  <Group gap="xs">
                    <ThemeIcon size="md" radius="xl" color="blue" variant="light">
                      <IconUsers size={16} />
                    </ThemeIcon>
                    <Text fw={500}>{campaign.backers} backers</Text>
                  </Group>

                  <Group gap="xs">
                    <ThemeIcon size="md" radius="xl" color={campaign.daysLeft < 3 ? 'red' : campaign.daysLeft < 7 ? 'orange' : 'blue'} variant="light">
                      <IconClock size={16} />
                    </ThemeIcon>
                    <Text
                      fw={500}
                      c={campaign.daysLeft < 3 ? 'red' : campaign.daysLeft < 7 ? 'orange' : undefined}
                    >
                      {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Campaign ended'}
                    </Text>
                  </Group>
                </Group>

                <Group mt="xl" justify="apart">
                  <Button
                    size="md"
                    radius="md"
                    leftSection={<IconCoin size={20} />}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    style={{ flex: 1 }}
                    onClick={() => openBackingModal()}
                  >
                    Back This Project
                  </Button>

                  <Group gap="xs">
                    <Tooltip label="Add to favorites" withArrow position="top">
                      <ActionIcon size="lg" variant="light" radius="xl">
                        <IconHeart size={20} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Share" withArrow position="top">
                      <ActionIcon size="lg" variant="light" radius="xl">
                        <IconShare size={20} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Campaign Details */}
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper radius="lg" p="xl" withBorder mb="xl">
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List grow mb="xl">
                <Tabs.Tab value="about">About</Tabs.Tab>
                <Tabs.Tab value="updates">Updates</Tabs.Tab>
                <Tabs.Tab value="transactions">Transactions</Tabs.Tab>
                <Tabs.Tab value="team">Team</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="about">
                <Title order={3} mb="md">Project Overview</Title>
                {/* <Text mb="xl">{campaign.fullDescription}</Text> */}
                <ReactMarkdown>{campaign.fullDescription}</ReactMarkdown>

                {campaign.milestones && campaign.milestones.length > 0 && (
                  <>
                    <Title order={3} mb="md">Roadmap & Milestones</Title>
                    <Timeline active={1} bulletSize={24} lineWidth={2} mb="xl">
                      {campaign.milestones.map((milestone: any, index: number) => (
                        <Timeline.Item
                          key={index}
                          title={milestone.title}
                          bullet={milestone.completed ? <IconCircleCheck size={12} /> : <IconCircleDashed size={12} />}
                          color={milestone.completed ? 'green' : 'blue'}
                        >
                          <Text color="dimmed" size="sm">{formatDate(milestone.targetDate)}</Text>
                          <Text size="sm" mt={4}>{milestone.description}</Text>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </>
                )}

                {campaign.techStack && campaign.techStack.length > 0 && (
                  <>
                    <Title order={3} mb="md">Technology Stack</Title>
                    <Group mb="xl">
                      {campaign.techStack.map((tech: string, index: number) => (
                        <Badge key={index} size="lg">{tech}</Badge>
                      ))}
                    </Group>
                  </>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="updates">
                <Text>No updates yet. Check back soon!</Text>
              </Tabs.Panel>

              <Tabs.Panel value="transactions">
                <Title order={3} mb="md">Recent Transactions</Title>
                <Table
                  striped="odd"
                  highlightOnHover
                  withTableBorder
                  withColumnBorders
                  horizontalSpacing="md"
                  verticalSpacing="sm"
                  stickyHeader
                  stickyHeaderOffset={0}
                  tabularNums
                  layout="fixed"
                  borderColor={colorScheme === 'dark' ? 'dark.4' : 'gray.3'}
                  highlightOnHoverColor={colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  stripedColor={colorScheme === 'dark' ? 'dark.6' : 'gray.0'}
                  style={{ overflow: 'auto' }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ width: '25%' }}>Transaction</Table.Th>
                      <Table.Th style={{ width: '25%' }}>From</Table.Th>
                      <Table.Th style={{ width: '15%' }}>Amount</Table.Th>
                      <Table.Th style={{ width: '20%' }}>Date</Table.Th>
                      <Table.Th style={{ width: '15%' }}>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {mockTransactions.map((tx) => (
                      <Table.Tr key={tx.id}>
                        <Table.Td>
                          <Group gap="xs">
                            <Text size="sm" fw={500}>{formatAddress(tx.txHash)}</Text>
                            <CopyButton value={tx.txHash}>
                              {({ copied, copy }) => (
                                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                                  <ActionIcon size="xs" color={copied ? 'teal' : 'gray'} onClick={copy}>
                                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </CopyButton>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <Avatar size="sm" radius="xl" color="blue">{tx.from.substring(2, 4)}</Avatar>
                            <Text size="sm">{formatAddress(tx.from)}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600} c="blue">{tx.amount}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{formatDate(tx.timestamp)}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color="green" size="sm" variant="light" radius="sm" px="sm">{tx.status}</Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>

              <Tabs.Panel value="team">
                <Title order={3} mb="md">Team & Contributors</Title>
                <Grid>
                  {campaign.contributors && campaign.contributors.map((contributor: any, index: number) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                      <Card p="md" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
                        <Stack align="center" gap="md">
                          <Avatar
                            src={`https://api.dicebear.com/9.x/shapes/svg?seed=${contributor.walletAddress}`}
                            size={80}
                            radius="xl"
                            color={['blue', 'cyan', 'green', 'teal'][index % 4]}
                          >
                            {contributor.walletAddress.substring(0, 2)}
                          </Avatar>
                          <div style={{ textAlign: 'center', width: '100%' }}>
                            <Text fw={700} size="lg" mb={5}>{contributor.role}</Text>
                            <Text size="sm" color="dimmed" mb={5}>{formatAddress(contributor.walletAddress)}</Text>
                            {contributor.githubUsername && (
                              <Button
                                component="a"
                                href={`https://github.com/${contributor.githubUsername}`}
                                target="_blank"
                                size="xs"
                                variant="light"
                                radius="xl"
                                rel="noopener noreferrer"
                                leftSection={<IconBrandGithub size={14} />}
                                mt={5}
                              >
                                @{contributor.githubUsername}
                              </Button>
                            )}
                          </div>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          {/* Project Info Card */}
          <Paper radius="lg" p="xl" withBorder mb="xl">
            <Title order={3} mb="lg">Project Info</Title>

            <Stack gap="md">
              <Group>
                <Text c="dimmed" w={120}>Contract Address</Text>
                <Group gap="xs" ml="auto">
                  <Text fw={500} size="sm">{formatAddress(campaign.contractAddress || '')}</Text>
                  <CopyButton value={campaign.contractAddress || ''}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon size="xs" color={copied ? 'teal' : 'gray'} onClick={copy}>
                          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </Group>

              <Divider />

              <Group>
                <Text c="dimmed" w={120}>Token</Text>
                <Group gap="xs" ml="auto">
                  {campaign.token.icon && (
                    <Avatar src={campaign.token.icon} size="xs" radius="xl" />
                  )}
                  <Text fw={500}>{campaign.token.symbol}</Text>
                </Group>
              </Group>

              <Divider />

              <Group>
                <Text c="dimmed" w={120}>Network</Text>
                <Badge ml="auto" color={getNetworkColor(campaign.network)}>{campaign.network}</Badge>
              </Group>

              <Divider />

              <Group>
                <Text c="dimmed" w={120}>Created</Text>
                <Text ml="auto">{formatDate(campaign.createdAt || '')}</Text>
              </Group>

              <Divider />

              <Group>
                <Text c="dimmed" w={120}>Ends</Text>
                <Text ml="auto">{formatDate(campaign.endsAt || '')}</Text>
              </Group>

              {campaign.cairoVersion && (
                <>
                  <Divider />
                  <Group>
                    <Text c="dimmed" w={120}>Cairo Version</Text>
                    <Badge ml="auto">{campaign.cairoVersion}</Badge>
                  </Group>
                </>
              )}

              {campaign.license && (
                <>
                  <Divider />
                  <Group>
                    <Text c="dimmed" w={120}>License</Text>
                    <Text ml="auto">{campaign.license}</Text>
                  </Group>
                </>
              )}
            </Stack>
          </Paper>

          {/* Links Card */}
          {(campaign.githubLink || campaign.demoLink || campaign.liveLink || campaign.socialLinks) && (
            <Paper radius="lg" p="xl" withBorder mb="xl">
              <Title order={3} mb="lg">Links</Title>

              <Stack gap="md">
                {campaign.githubLink && (
                  <Anchor
                    href={campaign.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Group>
                      <IconBrandGithub size={20} />
                      <Text>GitHub Repository</Text>
                    </Group>
                  </Anchor>
                )}

                {campaign.demoLink && (
                  <Anchor
                    href={campaign.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Group>
                      <IconExternalLink size={20} />
                      <Text>Demo / Prototype</Text>
                    </Group>
                  </Anchor>
                )}

                {campaign.liveLink && (
                  <Anchor
                    href={campaign.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Group>
                      <IconWorld size={20} />
                      <Text>Live Project</Text>
                    </Group>
                  </Anchor>
                )}

                {campaign.socialLinks && (
                  <>
                    <Divider label="Social Media" />

                    {campaign.socialLinks.twitter && (
                      <Anchor
                        href={campaign.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group>
                          <IconBrandTwitter size={20} />
                          <Text>Twitter</Text>
                        </Group>
                      </Anchor>
                    )}

                    {campaign.socialLinks.discord && (
                      <Anchor
                        href={campaign.socialLinks.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group>
                          <IconBrandDiscord size={20} />
                          <Text>Discord</Text>
                        </Group>
                      </Anchor>
                    )}

                    {campaign.socialLinks.telegram && (
                      <Anchor
                        href={campaign.socialLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group>
                          <IconBrandTelegram size={20} />
                          <Text>Telegram</Text>
                        </Group>
                      </Anchor>
                    )}

                    {campaign.socialLinks.website && (
                      <Anchor
                        href={campaign.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Group>
                          <IconWorld size={20} />
                          <Text>Website</Text>
                        </Group>
                      </Anchor>
                    )}
                  </>
                )}
              </Stack>
            </Paper>
          )}
        </Grid.Col>
      </Grid>
    </Container>
    </>
  );
};

export default CampaignPage;