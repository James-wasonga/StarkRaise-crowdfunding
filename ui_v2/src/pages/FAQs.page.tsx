import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Accordion,
  Grid,
  Paper,
  Group,
  Badge,
  Box,
  useMantineColorScheme,
  Tabs,
  ThemeIcon,
  rem,
  Card,
  SimpleGrid,
  Input,
  Button,
} from '@mantine/core';
import { 
  IconQuestionMark, 
  IconSearch, 
  IconWallet, 
  IconCoin, 
  IconRocket,
  IconUsers,
  IconShieldCheck,
  IconBuildingBank
} from '@tabler/icons-react';

// FAQ data organized by category
const faqData = {
  general: [
    {
      question: "What is StarkRaise?",
      answer: "StarkRaise is a decentralized crowdfunding platform built on StarkNet that allows creators to raise funds for their projects directly from the community. It leverages the security, scalability, and low fees of StarkNet to provide a seamless crowdfunding experience."
    },
    {
      question: "How does StarkRaise work?",
      answer: "Project creators can launch campaigns with funding goals, timelines, and rewards. Backers can browse campaigns and contribute funds using supported cryptocurrencies. If a campaign reaches its funding goal within the specified timeframe, the creator receives the funds; otherwise, contributions are returned to backers."
    },
    {
      question: "What makes StarkRaise different from other crowdfunding platforms?",
      answer: "StarkRaise is built on StarkNet, a Layer 2 scaling solution for Ethereum, which provides significantly lower fees, faster transactions, and enhanced security. Additionally, our platform incorporates decentralized governance, allowing the community to have a say in platform development and featured projects."
    },
    {
      question: "Is StarkRaise open source?",
      answer: "Yes, StarkRaise is fully open source. Our code repositories are available on GitHub, and we welcome contributions from the community to help improve the platform."
    }
  ],
  creators: [
    {
      question: "How do I create a campaign on StarkRaise?",
      answer: "To create a campaign, connect your wallet, click on 'Create Campaign' in the navigation menu, and follow the step-by-step process. You'll need to provide details about your project, funding goals, timeline, team information, and rewards for backers."
    },
    {
      question: "What types of projects can I fund on StarkRaise?",
      answer: "StarkRaise supports a wide range of projects, including but not limited to: blockchain applications, open-source software, community initiatives, educational content, research, and development projects related to StarkNet and the broader blockchain ecosystem."
    },
    {
      question: "How much does it cost to create a campaign?",
      answer: "Creating a campaign on StarkRaise involves only the gas fees required to deploy your campaign contract on StarkNet. These fees are significantly lower than on Ethereum mainnet. StarkRaise does not charge any platform fees for campaign creation."
    },
    {
      question: "How long can my campaign run?",
      answer: "Campaigns can run for a duration of your choosing, typically between 1 to 90 days. The optimal campaign length depends on your funding goals and project timeline."
    },
    {
      question: "Can I edit my campaign after it's live?",
      answer: "You can update certain aspects of your campaign after it's live, such as the description, images, and updates. However, critical parameters like funding goals, end dates, and reward structures cannot be modified once the campaign is active to maintain trust with backers."
    }
  ],
  backers: [
    {
      question: "How do I contribute to a campaign?",
      answer: "To contribute to a campaign, connect your wallet, browse to the campaign page, select the amount you wish to contribute, and confirm the transaction. You'll receive a receipt of your contribution and any associated rewards."
    },
    {
      question: "What cryptocurrencies can I use to back projects?",
      answer: "Currently, StarkRaise supports contributions in ETH and several ERC-20 tokens on StarkNet. The specific tokens accepted for each campaign are listed on the campaign's page."
    },
    {
      question: "What happens if a campaign doesn't reach its funding goal?",
      answer: "If a campaign doesn't reach its funding goal by the end date, all contributions are automatically returned to the backers. This is handled by the smart contract, ensuring that funds are safely returned."
    },
    {
      question: "Can I get a refund after backing a project?",
      answer: "Refund policies are set by individual campaign creators and should be clearly stated on the campaign page. In general, contributions are non-refundable once a campaign has been successfully funded, unless specified otherwise by the creator."
    }
  ],
  technical: [
    {
      question: "What is StarkNet?",
      answer: "StarkNet is a permissionless, decentralized Layer 2 (L2) scaling solution for Ethereum. It uses STARK proofs to provide scalability and security, allowing for lower fees and faster transactions while inheriting Ethereum's security guarantees."
    },
    {
      question: "Do I need a special wallet to use StarkRaise?",
      answer: "Yes, you need a StarkNet-compatible wallet such as ArgentX, Braavos, or any other wallet that supports StarkNet. These wallets allow you to interact with StarkNet applications and manage your assets on the network."
    },
    {
      question: "How secure is StarkRaise?",
      answer: "StarkRaise inherits the security properties of StarkNet and Ethereum. All campaign contracts are open source and audited. Funds are held in secure escrow contracts until campaign conditions are met. We implement best practices for smart contract security and regularly conduct security audits."
    },
    {
      question: "What are the gas fees like on StarkRaise?",
      answer: "Gas fees on StarkRaise are significantly lower than on Ethereum mainnet due to StarkNet's Layer 2 scaling technology. Typical transaction fees are a fraction of what you would pay on Ethereum, making it more accessible for smaller contributions and projects."
    }
  ]
};

const FAQsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Create an "all" category that combines all FAQs
  const allFaqData = {
    ...faqData,
    all: Object.values(faqData).flat()
  };

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === '' 
    ? allFaqData 
    : Object.fromEntries(
        Object.entries(allFaqData).map(([category, questions]) => [
          category,
          questions.filter(
            (faq) => 
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        ])
      );

  // Count total FAQs
  const totalFAQs = Object.values(faqData).reduce(
    (total, questions) => total + questions.length, 
    0
  );

  return (
    <>
      <Helmet>
        <title>FAQs | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Group justify="apart" mb="xl">
          <div>
            <Title order={1} mb="xs">Frequently Asked Questions</Title>
            <Text c="dimmed">Find answers to common questions about StarkRaise</Text>
          </div>
          <Badge size="xl" radius="md" variant="filled" color="blue" leftSection={<IconQuestionMark size={16} />}>
            {totalFAQs} Questions
          </Badge>
        </Group>

        {/* Search Bar */}
        <Paper p="md" radius="md" withBorder mb="xl">
          <Group>
            <Input
              leftSection={<IconSearch size={16} />}
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              style={{ flexGrow: 1 }}
              size="md"
            />
            {searchQuery && (
              <Button variant="subtle" onClick={() => setSearchQuery('')}>
                Clear
              </Button>
            )}
          </Group>
        </Paper>

        {/* FAQ Categories */}
        <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="lg" mb="xl">
          <Card 
            p="md" 
            radius="md" 
            withBorder 
            style={{ 
              borderColor: activeTab === 'all' ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: activeTab === 'all' ? '2px' : '1px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('all')}
          >
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="gray">
                <IconQuestionMark size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>All Questions</Text>
                <Text size="sm" c="dimmed">{Object.values(faqData).flat().length} questions</Text>
              </div>
            </Group>
          </Card>
          <Card 
            p="md" 
            radius="md" 
            withBorder 
            style={{ 
              borderColor: activeTab === 'general' ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: activeTab === 'general' ? '2px' : '1px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('general')}
          >
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                <IconQuestionMark size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>General</Text>
                <Text size="sm" c="dimmed">{faqData.general.length} questions</Text>
              </div>
            </Group>
          </Card>
          
          <Card 
            p="md" 
            radius="md" 
            withBorder 
            style={{ 
              borderColor: activeTab === 'creators' ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: activeTab === 'creators' ? '2px' : '1px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('creators')}
          >
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="green">
                <IconRocket size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>For Creators</Text>
                <Text size="sm" c="dimmed">{faqData.creators.length} questions</Text>
              </div>
            </Group>
          </Card>
          
          <Card 
            p="md" 
            radius="md" 
            withBorder 
            style={{ 
              borderColor: activeTab === 'backers' ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: activeTab === 'backers' ? '2px' : '1px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('backers')}
          >
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="orange">
                <IconUsers size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>For Backers</Text>
                <Text size="sm" c="dimmed">{faqData.backers.length} questions</Text>
              </div>
            </Group>
          </Card>
          
          <Card 
            p="md" 
            radius="md" 
            withBorder 
            style={{ 
              borderColor: activeTab === 'technical' ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: activeTab === 'technical' ? '2px' : '1px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('technical')}
          >
            <Group>
              <ThemeIcon size={40} radius="md" variant="light" color="violet">
                <IconShieldCheck size={20} />
              </ThemeIcon>
              <div>
                <Text fw={700}>Technical</Text>
                <Text size="sm" c="dimmed">{faqData.technical.length} questions</Text>
              </div>
            </Group>
          </Card>
        </SimpleGrid>

        {/* FAQ Accordion */}
        <Paper p="xl" radius="md" withBorder>
          <Title order={2} mb="lg">
            {activeTab === 'all' && 'All Questions'}
            {activeTab === 'general' && 'General Questions'}
            {activeTab === 'creators' && 'Questions for Project Creators'}
            {activeTab === 'backers' && 'Questions for Backers'}
            {activeTab === 'technical' && 'Technical Questions'}
          </Title>
          
          <Accordion variant="separated" radius="md">
            {filteredFAQs[activeTab as keyof typeof filteredFAQs]?.map((faq, index) => (
              <Accordion.Item key={index} value={`faq-${index}`}>
                <Accordion.Control>
                  <Text fw={600}>{faq.question}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text>{faq.answer}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
            
            {filteredFAQs[activeTab as keyof typeof filteredFAQs]?.length === 0 && (
              <Box py="lg" ta="center">
                <IconQuestionMark size={40} stroke={1.5} color="var(--mantine-color-gray-5)" />
                <Text mt="md" c="dimmed">No questions found matching your search criteria.</Text>
              </Box>
            )}
          </Accordion>
        </Paper>

        {/* Still Have Questions */}
        <Paper p="xl" radius="md" withBorder mt="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} mb="sm">Still Have Questions?</Title>
              <Text mb="lg">
                Can't find the answer you're looking for? Please reach out to our support team or join our community channels.
              </Text>
              <Group>
                <Button variant="filled" leftSection={<IconUsers size={16} />}>
                  Join Discord Community
                </Button>
                <Button variant="light" leftSection={<IconBuildingBank size={16} />}>
                  Contact Support
                </Button>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ThemeIcon size={120} radius="xl" variant="light" color="blue">
                <IconQuestionMark size={60} />
              </ThemeIcon>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default FAQsPage;
