import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Paper,
  Progress,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import {
  IconAlertHexagon,
  IconArrowRight,
  IconBell,
  IconBrandDiscord,
  IconCalendarEvent,
  IconChartBar,
  IconCoin,
  IconCreditCard,
  IconFlame,
  IconHistory,
  IconInfoCircle,
  IconRefresh,
  IconStar,
  IconTrendingUp,
  IconX
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Mock data for announcements
const announcements = [
  {
    id: 'ann1',
    type: 'community',
    title: 'Join our Discord AMA',
    message: 'Join us this Friday for an AMA with StarkNet core developers!',
    date: 'July 18, 2025',
    link: 'https://discord.gg/starknet',
    linkText: 'Join Discord',
    icon: IconBrandDiscord
  },
  {
    id: 'ann2',
    type: 'marketing',
    title: 'StarkRaise v2.0 Launch',
    message: 'We\'re excited to announce our platform upgrade with new features!',
    date: 'July 20, 2025',
    link: '/about',
    linkText: 'Learn More',
    icon: IconAlertHexagon
  }
];

// Mock data for recent projects
const recentProjects = [
  {
    id: 'proj1',
    title: 'StarkNet Ecosystem Explorer',
    image: 'https://picsum.photos/seed/starknet1/300/200',
    progress: 78,
    raised: '34.5 ETH',
    goal: '50 ETH',
    backers: 145,
    daysLeft: 12
  },
  {
    id: 'proj2',
    title: 'DeFi Aggregator on StarkNet',
    image: 'https://picsum.photos/seed/starknet2/300/200',
    progress: 42,
    raised: '21.2 ETH',
    goal: '60 ETH',
    backers: 89,
    daysLeft: 18
  },
  {
    id: 'proj3',
    title: 'StarkNet Gaming Platform',
    image: 'https://picsum.photos/seed/starknet3/300/200',
    progress: 95,
    raised: '47.5 ETH',
    goal: '50 ETH',
    backers: 203,
    daysLeft: 3
  }
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 'tx1',
    type: 'Contribution',
    project: 'StarkNet Ecosystem Explorer',
    amount: '2.5 ETH',
    date: 'July 15, 2025',
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'Withdrawal',
    project: 'DeFi Aggregator on StarkNet',
    amount: '1.2 ETH',
    date: 'July 14, 2025',
    status: 'completed'
  },
  {
    id: 'tx3',
    type: 'Contribution',
    project: 'StarkNet Gaming Platform',
    amount: '0.8 ETH',
    date: 'July 12, 2025',
    status: 'pending'
  }
];

// Mock data for trending projects
const trendingProjects = [
  {
    id: 'trend1',
    title: 'StarkNet NFT Marketplace',
    image: 'https://picsum.photos/seed/starknet4/300/200',
    category: 'NFT',
    progress: 67,
    raised: '134.5 ETH',
    backers: 1245,
    trending: '+45%'
  },
  {
    id: 'trend2',
    title: 'StarkNet Social Media dApp',
    image: 'https://picsum.photos/seed/starknet5/300/200',
    category: 'Social',
    progress: 82,
    raised: '98.2 ETH',
    backers: 876,
    trending: '+38%'
  },
  {
    id: 'trend3',
    title: 'StarkNet Governance Protocol',
    image: 'https://picsum.photos/seed/starknet6/300/200',
    category: 'Governance',
    progress: 53,
    raised: '76.5 ETH',
    backers: 543,
    trending: '+27%'
  }
];

const ProjectCard = ({ project, isTrending = false }: { project: any, isTrending?: boolean }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  
  return (
    <Card 
      p="xs" 
      radius="md" 
      withBorder 
      mb="xs"
      style={{
        borderColor: colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows.md,
        },
      }}
      onClick={() => navigate(`/campaigns/${project.id}`)}
    >
      <Group wrap="nowrap" align="flex-start" gap="xs">
        {/* Image on the left */}
        <Box 
          pos="relative" 
          w={80} 
          h={80} 
          style={{ 
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: theme.radius.sm,
            flexShrink: 0,
          }}
        >
          {isTrending && (
            <Badge 
              leftSection={<IconFlame size={12} />}
              color="red" 
              variant="filled" 
              pos="absolute" 
              top={4} 
              right={4}
              size="xs"
              px={4}
              style={{ fontSize: '10px' }}
            >
              {project.trending}
            </Badge>
          )}
          <Badge 
            color="blue" 
            variant="filled" 
            pos="absolute" 
            bottom={4} 
            left={4}
            size="xs"
            px={4}
            style={{ fontSize: '10px' }}
          >
            {project.category || (project.daysLeft ? `${project.daysLeft}d` : '')}
          </Badge>
        </Box>
        
        {/* Content on the right */}
        <Stack gap={4} style={{ flex: 1 }}>
          <Text fw={600} size="sm" lineClamp={1}>
            {project.title}
          </Text>
          
          <Group justify="space-between" gap="xs">
            <Text size="xs" c="dimmed">
              {isTrending ? `${project.backers} backers` : `${project.raised} of ${project.goal}`}
            </Text>
            <Text size="xs" c="blue" fw={500}>
              {isTrending ? project.raised : `${project.backers} backers`}
            </Text>
          </Group>
          
          <Progress 
            value={project.progress} 
            size="xs" 
            color={project.progress > 90 ? 'green' : 'blue'}
            radius="xl"
          />
        </Stack>
      </Group>
    </Card>
  );
};

const TransactionItem = ({ transaction }: { transaction: any }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  
  return (
    <Paper 
      p="xs" 
      radius="md" 
      withBorder 
      mb="xs"
      style={{
        borderColor: colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
      }}
    >
      <Group wrap="nowrap" justify="space-between">
        <Group wrap="nowrap" gap="xs">
          <Avatar 
            radius="xl" 
            size="sm" 
            color={transaction.type === 'Contribution' ? 'blue' : 'orange'}
          >
            {transaction.type === 'Contribution' ? <IconCreditCard size={14} /> : <IconCoin size={14} />}
          </Avatar>
          <Box>
            <Text size="sm" fw={500}>{transaction.type}</Text>
            <Text size="xs" c="dimmed" lineClamp={1}>{transaction.project}</Text>
          </Box>
        </Group>
        <Box ta="right">
          <Text size="sm" fw={600} c={transaction.type === 'Contribution' ? 'blue' : 'orange'}>
            {transaction.type === 'Contribution' ? '-' : '+'}{transaction.amount}
          </Text>
          <Text size="xs" c="dimmed">{transaction.date}</Text>
        </Box>
      </Group>
      <Badge 
        size="xs" 
        mt={5}
        variant="light" 
        color={transaction.status === 'completed' ? 'green' : 'yellow'}
      >
        {transaction.status}
      </Badge>
    </Paper>
  );
};

const SectionHeader = ({ title, icon, action }: { title: string, icon: any, action?: any }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const Icon = icon;
  
  return (
    <Group justify="space-between" mb="md">
      <Group gap="xs">
        <Avatar 
          radius="xl" 
          size="sm" 
          color={colorScheme === 'dark' ? 'blue.8' : 'blue.5'}
        >
          <Icon size={16} />
        </Avatar>
        <Text fw={600} size="sm">{title}</Text>
      </Group>
      {action && (
        <Button 
          variant="subtle" 
          rightSection={<IconArrowRight size={14} />}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </Group>
  );
};

const AnnouncementAlert = ({ announcement }: { announcement: any }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const Icon = announcement.icon;
  
  if (!visible) return null;
  
  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };
  
  return (
    <Alert
      radius="md"
      title={announcement.title}
      color={announcement.type === 'community' ? 'blue' : 'violet'}
      icon={<Icon size={16} />}
      withCloseButton
      onClose={() => setVisible(false)}
    >
      <Text size="sm" mb="xs">{announcement.message}</Text>
      <Group justify="space-between" wrap="nowrap">
        <Text size="xs" c="dimmed">{announcement.date}</Text>
        <Button 
          size="xs" 
          variant="light" 
          color={announcement.type === 'community' ? 'blue' : 'violet'}
          onClick={(e) => handleLinkClick(e, announcement.link)}
        >
          {announcement.linkText}
        </Button>
      </Group>
    </Alert>
  );
};

const AnnouncementCarousel = () => {
  const theme = useMantineTheme();
  const [visible, setVisible] = useState(true);
  
  if (!visible || announcements.length === 0) return null;
  
  return (
    <Box mb="md">
      <Carousel
        slideSize="100%"
        height="auto"
        withControls={announcements.length > 1}
        withIndicators={announcements.length > 1}
        emblaOptions={{loop: true, duration: 2000}}
        slideGap={0}
        controlsOffset="xs"
        controlSize={26}
      >
        {announcements.map((announcement) => (
          <Carousel.Slide key={announcement.id}>
            <AnnouncementAlert announcement={announcement} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

const AppShellAsideContent = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  
  return (
    <Box p="md" h="100%" style={{ borderLeft: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}` }}>
      {/* Announcements Carousel Section */}
      <AnnouncementCarousel />
      
      <Group mb="lg" justify="apart">
        <Title order={4}>Activity Center</Title>
        <IconRefresh 
          size={18} 
          style={{ cursor: 'pointer' }} 
          color={theme.colors.blue[5]} 
          onClick={() => console.log('Refreshing data...')} 
        />
      </Group>
      
      <Flex gap="md" mb="md">
        <Button 
          variant={activeTab === 'recent' ? 'filled' : 'light'}
          color="blue"
          radius="md"
          size="sm"
          onClick={() => setActiveTab('recent')}
          leftSection={<IconHistory size={16} />}
          style={{ flex: 1 }}
        >
          Recent
        </Button>
        <Button 
          variant={activeTab === 'trending' ? 'filled' : 'light'}
          color="blue"
          radius="md"
          size="sm"
          onClick={() => setActiveTab('trending')}
          leftSection={<IconTrendingUp size={16} />}
          style={{ flex: 1 }}
        >
          Trending
        </Button>
      </Flex>
      
      <ScrollArea h="calc(100vh - 180px)" offsetScrollbars>
        {activeTab === 'recent' ? (
          <Stack gap="xl">
            <Box>
              <SectionHeader 
                title="Recent Projects" 
                icon={IconStar}
                action={{ label: 'View all', onClick: () => navigate('/my-campaigns') }}
              />
              {recentProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Box>
            
            <Divider />
            
            <Box>
              <SectionHeader 
                title="Recent Transactions" 
                icon={IconCreditCard}
                action={{ label: 'View all', onClick: () => navigate('/contributions') }}
              />
              {recentTransactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </Box>
            
            <Box ta="center" mt="md">
              <Button 
                variant="outline" 
                color="blue" 
                radius="md"
                leftSection={<IconCalendarEvent size={16} />}
                onClick={() => navigate('/contributions')}
              >
                View All Activity
              </Button>
            </Box>
          </Stack>
        ) : (
          <Stack gap="xl">
            <Box>
              <SectionHeader 
                title="Trending Projects" 
                icon={IconChartBar}
                action={{ label: 'View all', onClick: () => navigate('/campaigns/trending') }}
              />
              {trendingProjects.map(project => (
                <ProjectCard key={project.id} project={project} isTrending />
              ))}
            </Box>
            
            <Divider />
            
            <Box>
              <Group gap="xs" mb="md">
                <Avatar radius="xl" size="sm" color="blue">
                  <IconInfoCircle size={16} />
                </Avatar>
                <Text fw={600} size="sm">Trending Categories</Text>
              </Group>
              
              <Group grow mb="md">
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">NFT</Button>
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">DeFi</Button>
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">Gaming</Button>
              </Group>
              
              <Group grow>
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">Social</Button>
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">DAO</Button>
                <Button variant="light" leftSection={<IconCoin size={16} />} radius="md" size="sm">More</Button>
              </Group>
            </Box>
            
            <Box ta="center" mt="md">
              <Button 
                variant="gradient" 
                gradient={{ from: 'blue', to: 'cyan' }}
                radius="md"
                leftSection={<IconFlame size={16} />}
                onClick={() => navigate('/campaigns/trending')}
              >
                Explore All Trending
              </Button>
            </Box>
          </Stack>
        )}
      </ScrollArea>
    </Box>
  );
};

export default AppShellAsideContent;