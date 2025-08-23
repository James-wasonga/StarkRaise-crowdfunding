import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Badge,
  Image,
  Timeline,
  ThemeIcon,
  List,
  Card,
  SimpleGrid,
  useMantineColorScheme,
  rem,
  Box,
  Avatar,
  Button,
} from '@mantine/core';
import {
  IconRocket,
  IconUsers,
  IconCoin,
  IconShieldCheck,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandDiscord,
  IconCalendarEvent,
  IconCheck,
  IconArrowRight,
} from '@tabler/icons-react';

// import team images
import jamesImage from '../assets/img/james.jpg';
import dalmasImage from '../assets/img/dalmas.png';

// Team members data
const teamMembers = [
  {
    name: 'James Wasonga',
    role: 'Founder & CEO',
    bio: 'Blockchain enthusiast with 3+ years of experience in decentralized finance and smart contract development.',
    // avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    avatar: jamesImage,
    social: {
      twitter: 'https://x.com/JamesWasonga8',
      github: 'https://github.com/James-wasonga',
    }
  },
  {
    name: 'Dalmas Ogembo',
    role: 'CTO & Co-Founder',
    bio: 'StarkNet core contributor and Cairo expert. Previously led engineering teams at major blockchain projects.',
    // avatar: 'https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    avatar: dalmasImage,
    social: {
      twitter: 'https://x.com/dalmasonto',
      github: 'https://github.com/dalmasonto',
    }
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in React and Cairo. Passionate about building user-friendly dApps.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      }
    },
  {
    name: 'Emily Nakamoto',
    role: 'Product Manager',
    bio: 'Former PM at major tech companies. Focused on creating intuitive user experiences for Web3 products.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    social: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    }
  },
];

// Milestones data
const milestones = [
  {
    title: 'StarkRaise Conception',
    description: 'The idea for a decentralized crowdfunding platform on StarkNet was born.',
    date: 'January 2023',
    icon: <IconRocket size={16} />,
    color: 'blue',
  },
  {
    title: 'Alpha Launch',
    description: 'First version of StarkRaise deployed to StarkNet testnet with basic functionality.',
    date: 'April 2023',
    icon: <IconCalendarEvent size={16} />,
    color: 'green',
  },
  {
    title: 'Beta Release',
    description: 'Enhanced platform with improved UI/UX and additional features based on community feedback.',
    date: 'August 2023',
    icon: <IconUsers size={16} />,
    color: 'orange',
  },
  {
    title: 'Mainnet Launch',
    description: 'StarkRaise officially launched on StarkNet mainnet, enabling real crowdfunding campaigns.',
    date: 'January 2024',
    icon: <IconRocket size={16} />,
    color: 'violet',
  },
  {
    title: 'Community Governance',
    description: 'Introduction of decentralized governance allowing community members to vote on platform decisions.',
    date: 'May 2024',
    icon: <IconUsers size={16} />,
    color: 'cyan',
  },
  {
    title: 'Global Expansion',
    description: 'Support for multiple languages and currencies, making StarkRaise accessible worldwide.',
    date: 'Present',
    icon: <IconCoin size={16} />,
    color: 'blue',
  },
];

const AboutPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Helmet>
        <title>About Us | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        {/* Hero Section */}
        <Grid mb={50}>
          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Badge mb="md" size="lg" radius="sm" color="blue" variant="filled">About StarkRaise</Badge>
            <Title order={1} mb="md">Empowering Creators on StarkNet</Title>
            <Text mb="xl" size="lg">
              StarkRaise is a decentralized crowdfunding platform built on StarkNet, 
              designed to connect innovative projects with passionate backers in a 
              transparent, secure, and efficient environment.
            </Text>
            <Group>
              <Button variant="filled" color="blue" rightSection={<IconArrowRight size={16} />}>
                Explore Campaigns
              </Button>
              <Button variant="light" color="blue" rightSection={<IconBrandGithub size={16} />}>
                View on GitHub
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="StarkRaise Team"
              radius="md"
            />
          </Grid.Col>
        </Grid>

        {/* Our Mission */}
        <Paper p="xl" radius="md" withBorder mb={50}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Title order={2} mb="md">Our Mission</Title>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Text size="lg" mb="md">
                At StarkRaise, we believe in the power of community-driven innovation. Our mission is to create 
                a platform where visionary creators can bring their ideas to life with the support of like-minded individuals.
              </Text>
              <Text>
                By leveraging the scalability and security of StarkNet, we're building a crowdfunding ecosystem 
                that is accessible, transparent, and efficient. We aim to eliminate the traditional barriers to 
                fundraising and create opportunities for projects that might otherwise struggle to find support.
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Core Values */}
        <Title order={2} mb="xl" ta="center">Our Core Values</Title>
        <SimpleGrid cols={3} spacing="lg" mb={50}>
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="blue">
              <IconShieldCheck size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Security & Trust</Title>
            <Text>
              We prioritize the security of our platform and the trust of our users. 
              All smart contracts are audited and our operations are transparent.
            </Text>
          </Card>
          
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="green">
              <IconUsers size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Community First</Title>
            <Text>
              Our community is at the heart of everything we do. We actively listen to feedback 
              and involve our users in the evolution of the platform.
            </Text>
          </Card>
          
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="orange">
              <IconRocket size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Innovation</Title>
            <Text>
              We continuously strive to innovate and improve our platform, embracing new 
              technologies and approaches to better serve our users.
            </Text>
          </Card>
        </SimpleGrid>

        {/* Our Journey */}
        <Paper p="xl" radius="md" withBorder mb={50}>
          <Title order={2} mb="xl" ta="center">Our Journey</Title>
          <Timeline active={milestones.length - 1} bulletSize={24} lineWidth={2}>
            {milestones.map((milestone, index) => (
              <Timeline.Item 
                key={index} 
                bullet={<ThemeIcon color={milestone.color} size={22} radius="xl">{milestone.icon}</ThemeIcon>} 
                title={<Text fw={700}>{milestone.title}</Text>}
              >
                <Text size="sm" c="dimmed">{milestone.date}</Text>
                <Text size="sm" mt={4}>{milestone.description}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Paper>

        {/* Why StarkNet */}
        <Grid mb={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="StarkNet Technology"
              radius="md"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Title order={2} mb="md">Why We Chose StarkNet</Title>
            <Text mb="md">
              StarkNet offers the perfect foundation for our crowdfunding platform due to its:
            </Text>
            <List spacing="sm" size="md" mb="md" icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCheck size={16} />
              </ThemeIcon>
            }>
              <List.Item>Scalability with thousands of transactions per second</List.Item>
              <List.Item>Low transaction fees, making microfunding viable</List.Item>
              <List.Item>Strong security inherited from Ethereum</List.Item>
              <List.Item>Composability with the broader Ethereum ecosystem</List.Item>
              <List.Item>Cairo programming language for robust smart contracts</List.Item>
            </List>
          </Grid.Col>
        </Grid>

        {/* Meet Our Team */}
        <Title order={2} mb="xl" ta="center">Meet Our Team</Title>
        <SimpleGrid cols={4} spacing="lg" mb={50}>
          {teamMembers.map((member, index) => (
            <Card key={index} p="lg" radius="md" withBorder>
              <Card.Section style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 10px' }}>
                <Avatar src={member.avatar} size={120} radius={120} />
              </Card.Section>
              <Text ta="center" fw={700} size="lg" mt="md">{member.name}</Text>
              <Text ta="center" c="dimmed" mb="md">{member.role}</Text>
              <Text size="sm" mb="md">{member.bio}</Text>
              <Group justify="center">
                <Button variant="subtle" size="xs" color="gray" component="a" href={member.social.twitter} target="_blank" leftSection={<IconBrandTwitter size={16} />}>
                  Twitter
                </Button>
                <Button variant="subtle" size="xs" color="gray" component="a" href={member.social.github} target="_blank" leftSection={<IconBrandGithub size={16} />}>
                  GitHub
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>

        {/* Join Us */}
        <Paper p="xl" radius="md" withBorder style={{ 
          background: isDark 
            ? 'linear-gradient(45deg, var(--mantine-color-dark-6) 0%, var(--mantine-color-dark-8) 100%)' 
            : 'linear-gradient(45deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-blue-1) 100%)'
        }}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} mb="sm">Join Our Community</Title>
              <Text mb="lg">
                Become part of the StarkRaise community and help shape the future of decentralized crowdfunding.
                Whether you're a creator, backer, or developer, there's a place for you in our ecosystem.
              </Text>
              <Group>
                <Button variant="filled" color="blue" leftSection={<IconBrandDiscord size={18} />}>
                  Join Discord
                </Button>
                <Button variant="light" leftSection={<IconBrandTwitter size={18} />}
                onClick={() => window.open('https://x.com/StarkRaise1')}
                >
                  Follow on Twitter
                </Button>
                <Button variant="outline" leftSection={<IconBrandGithub size={18} />}
                onClick={() => window.open('https://github.com/James-wasonga/StarkRaise-crowdfunding')}
                >
                  Contribute on GitHub
                </Button>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ThemeIcon size={150} radius={150} color="blue" variant="light">
                <IconUsers size={80} />
              </ThemeIcon>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AboutPage;
