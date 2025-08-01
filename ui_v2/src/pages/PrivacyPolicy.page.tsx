import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Paper,
  Grid,
  Button,
  Group,
  Divider,
  List,
  ThemeIcon,
  Box,
  Accordion,
  Badge,
  useMantineColorScheme,
} from '@mantine/core';
import { 
  IconCheck, 
  IconDownload, 
  IconPrinter, 
  IconShieldLock, 
  IconCookie, 
  IconUserCircle,
  IconServer,
  IconShare,
  IconAlertCircle,
  IconLock
} from '@tabler/icons-react';

const PrivacyPolicyPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const lastUpdated = "July 15, 2024";

  return (
    <>
      <Helmet>
        <title>Privacy Policy | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl" pos="relative">
        <Paper p="xl" radius="md" withBorder mb="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Group mb="xs">
                <ThemeIcon size={40} radius="md" color="blue">
                  <IconShieldLock size={24} />
                </ThemeIcon>
                <Title order={1}>Privacy Policy</Title>
              </Group>
              <Text c="dimmed">Last Updated: {lastUpdated}</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Group>
                <Button variant="outline" leftSection={<IconPrinter size={16} />} onClick={() => window.print()}>
                  Print
                </Button>
                <Button variant="outline" leftSection={<IconDownload size={16} />}>
                  Download PDF
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Grid mb="xl" style={{scrollBehavior: 'smooth'}} pos="relative">
          <Grid.Col span={{ base: 12, md: 3 }} pos="relative">
            <Paper p="md" radius="md" withBorder style={{ position: 'sticky', top: '90px', zIndex: 10 }}>
              <Title order={4} mb="md">Table of Contents</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button variant="subtle" justify="start" component="a" href="#introduction">1. Introduction</Button>
                <Button variant="subtle" justify="start" component="a" href="#information-collected">2. Information We Collect</Button>
                <Button variant="subtle" justify="start" component="a" href="#use-of-information">3. How We Use Your Information</Button>
                <Button variant="subtle" justify="start" component="a" href="#information-sharing">4. Information Sharing</Button>
                <Button variant="subtle" justify="start" component="a" href="#data-security">5. Data Security</Button>
                <Button variant="subtle" justify="start" component="a" href="#cookies">6. Cookies and Tracking</Button>
                <Button variant="subtle" justify="start" component="a" href="#user-rights">7. Your Rights</Button>
                <Button variant="subtle" justify="start" component="a" href="#children">8. Children's Privacy</Button>
                <Button variant="subtle" justify="start" component="a" href="#changes">9. Changes to Privacy Policy</Button>
                <Button variant="subtle" justify="start" component="a" href="#contact">10. Contact Information</Button>
              </div>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Paper p="xl" radius="md" withBorder>
              <Box id="introduction" mb="xl">
                <Title order={2} mb="md">1. Introduction</Title>
                <Text>
                  StarkRaise ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our website and services (collectively, the "Platform").
                </Text>
                <Text mt="md">
                  We respect your privacy and are committed to protecting your personal information. This Privacy Policy will inform you about what data we collect, 
                  how we use it, and the steps we take to ensure it remains private and secure.
                </Text>
                <Text mt="md">
                  Please read this Privacy Policy carefully. By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound 
                  by this Privacy Policy. If you do not agree with our policies and practices, please do not use our Platform.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="information-collected" mb="xl">
                <Title order={2} mb="md">2. Information We Collect</Title>
                
                <Accordion variant="separated" radius="md">
                  <Accordion.Item value="blockchain-data">
                    <Accordion.Control>
                      <Group>
                        <ThemeIcon color="blue" variant="light" size={28} radius="xl">
                          <IconServer size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Blockchain Data</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">
                        When you interact with the StarkRaise platform, certain information is automatically recorded on the StarkNet blockchain, including:
                      </Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Your wallet address</List.Item>
                        <List.Item>Transaction data (amounts, timestamps, contract interactions)</List.Item>
                        <List.Item>Smart contract interactions</List.Item>
                      </List>
                      <Text mt="md">
                        This information is inherently public due to the transparent nature of blockchain technology and is not under StarkRaise's control.
                      </Text>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="account-information">
                    <Accordion.Control>
                      <Group>
                        <ThemeIcon color="green" variant="light" size={28} radius="xl">
                          <IconUserCircle size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Account Information</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">
                        When you create an account or profile on StarkRaise, we may collect:
                      </Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Username or display name</List.Item>
                        <List.Item>Profile picture</List.Item>
                        <List.Item>Email address (if provided)</List.Item>
                        <List.Item>Social media handles (if provided)</List.Item>
                        <List.Item>Biography or description</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="campaign-information">
                    <Accordion.Control>
                      <Group>
                        <ThemeIcon color="orange" variant="light" size={28} radius="xl">
                          <IconShare size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Campaign Information</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">
                        When you create or interact with campaigns, we collect:
                      </Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Campaign details (title, description, funding goals, etc.)</List.Item>
                        <List.Item>Campaign media (images, videos)</List.Item>
                        <List.Item>Updates and comments</List.Item>
                        <List.Item>Backing history</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="usage-data">
                    <Accordion.Control>
                      <Group>
                        <ThemeIcon color="violet" variant="light" size={28} radius="xl">
                          <IconCookie size={16} />
                        </ThemeIcon>
                        <Text fw={600}>Usage Data</Text>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">
                        We automatically collect certain information when you visit, use, or navigate the Platform:
                      </Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Device and connection information (IP address, browser type, operating system)</List.Item>
                        <List.Item>Usage patterns (pages visited, time spent on pages, click patterns)</List.Item>
                        <List.Item>Referral sources</List.Item>
                        <List.Item>Device characteristics</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Box>

              <Divider my="xl" />

              <Box id="use-of-information" mb="xl">
                <Title order={2} mb="md">3. How We Use Your Information</Title>
                <Text mb="md">
                  We use the information we collect for various purposes, including:
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper p="md" radius="md" withBorder>
                      <ThemeIcon size={32} radius="md" color="blue" mb="md">
                        <IconServer size={18} />
                      </ThemeIcon>
                      <Title order={4} mb="sm">Platform Operation</Title>
                      <List spacing="xs" size="sm">
                        <List.Item>Providing and maintaining our services</List.Item>
                        <List.Item>Processing transactions</List.Item>
                        <List.Item>Managing user accounts</List.Item>
                        <List.Item>Facilitating campaign creation and backing</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper p="md" radius="md" withBorder>
                      <ThemeIcon size={32} radius="md" color="green" mb="md">
                        <IconUserCircle size={18} />
                      </ThemeIcon>
                      <Title order={4} mb="sm">User Experience</Title>
                      <List spacing="xs" size="sm">
                        <List.Item>Personalizing your experience</List.Item>
                        <List.Item>Recommending relevant campaigns</List.Item>
                        <List.Item>Responding to your requests and inquiries</List.Item>
                        <List.Item>Providing customer support</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                    <Paper p="md" radius="md" withBorder>
                      <ThemeIcon size={32} radius="md" color="orange" mb="md">
                        <IconAlertCircle size={18} />
                      </ThemeIcon>
                      <Title order={4} mb="sm">Security & Compliance</Title>
                      <List spacing="xs" size="sm">
                        <List.Item>Protecting against fraud and abuse</List.Item>
                        <List.Item>Enforcing our Terms and Conditions</List.Item>
                        <List.Item>Complying with legal obligations</List.Item>
                        <List.Item>Resolving disputes</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                    <Paper p="md" radius="md" withBorder>
                      <ThemeIcon size={32} radius="md" color="violet" mb="md">
                        <IconShare size={18} />
                      </ThemeIcon>
                      <Title order={4} mb="sm">Communication & Improvement</Title>
                      <List spacing="xs" size="sm">
                        <List.Item>Sending administrative notifications</List.Item>
                        <List.Item>Providing updates about campaigns you back</List.Item>
                        <List.Item>Analyzing usage to improve our Platform</List.Item>
                        <List.Item>Marketing and promotional purposes (with consent)</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Box>

              <Divider my="xl" />

              <Box id="information-sharing" mb="xl">
                <Title order={2} mb="md">4. Information Sharing</Title>
                <Text mb="md">
                  We may share your information in the following circumstances:
                </Text>
                <List spacing="md" withPadding icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }>
                  <List.Item>
                    <Text fw={600}>With Your Consent:</Text> We may share your information when you direct us to do so.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Service Providers:</Text> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Legal Requirements:</Text> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Business Transfers:</Text> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Platform Users:</Text> Certain information, such as your username, profile picture, and campaign details, will be publicly visible to other users of the Platform.
                  </List.Item>
                </List>
                <Text mt="md">
                  We do not sell your personal information to third parties.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="data-security" mb="xl">
                <Title order={2} mb="md">5. Data Security</Title>
                <Text mb="md">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </Text>
                <Paper p="md" radius="md" withBorder bg={isDark ? 'dark.6' : 'gray.0'}>
                  <Group mb="sm">
                    <ThemeIcon size={32} radius="xl" color="blue">
                      <IconLock size={18} />
                    </ThemeIcon>
                    <Title order={4}>Our Security Measures Include:</Title>
                  </Group>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <List spacing="sm" size="sm">
                        <List.Item>Encryption of sensitive data</List.Item>
                        <List.Item>Regular security assessments</List.Item>
                        <List.Item>Access controls and authentication</List.Item>
                      </List>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <List spacing="sm" size="sm">
                        <List.Item>Secure network architecture</List.Item>
                        <List.Item>Continuous monitoring for threats</List.Item>
                        <List.Item>Employee security training</List.Item>
                      </List>
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Box>

              <Divider my="xl" />

              <Box id="cookies" mb="xl">
                <Title order={2} mb="md">6. Cookies and Tracking</Title>
                <Group mb="md">
                  <ThemeIcon size={36} radius="xl" color="orange">
                    <IconCookie size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600}>We use cookies and similar tracking technologies to:</Text>
                  </div>
                </Group>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <List spacing="sm" withPadding>
                      <List.Item>Remember your preferences and settings</List.Item>
                      <List.Item>Understand how you use our Platform</List.Item>
                      <List.Item>Improve your browsing experience</List.Item>
                    </List>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <List spacing="sm" withPadding>
                      <List.Item>Analyze trends and traffic patterns</List.Item>
                      <List.Item>Protect against fraud and abuse</List.Item>
                      <List.Item>Personalize content and recommendations</List.Item>
                    </List>
                  </Grid.Col>
                </Grid>
                <Text mt="md">
                  You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of the Platform may become inaccessible or not function properly.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="user-rights" mb="xl">
                <Title order={2} mb="md">7. Your Rights</Title>
                <Text mb="md">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper p="md" radius="md" withBorder>
                      <Badge color="blue" mb="md">Access & Portability</Badge>
                      <List spacing="xs" size="sm">
                        <List.Item>Right to access your personal information</List.Item>
                        <List.Item>Right to receive a copy of your data</List.Item>
                        <List.Item>Right to transfer your data to another service</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper p="md" radius="md" withBorder>
                      <Badge color="green" mb="md">Rectification & Erasure</Badge>
                      <List spacing="xs" size="sm">
                        <List.Item>Right to correct inaccurate information</List.Item>
                        <List.Item>Right to delete your personal information</List.Item>
                        <List.Item>Right to be forgotten</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                    <Paper p="md" radius="md" withBorder>
                      <Badge color="orange" mb="md">Restriction & Objection</Badge>
                      <List spacing="xs" size="sm">
                        <List.Item>Right to restrict processing of your data</List.Item>
                        <List.Item>Right to object to certain processing activities</List.Item>
                        <List.Item>Right to withdraw consent</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                  
                  <Grid.Col span={{ base: 12, md: 6 }} mt="md">
                    <Paper p="md" radius="md" withBorder>
                      <Badge color="violet" mb="md">Additional Rights</Badge>
                      <List spacing="xs" size="sm">
                        <List.Item>Right to non-discrimination for exercising rights</List.Item>
                        <List.Item>Right to lodge a complaint with authorities</List.Item>
                        <List.Item>Right to opt-out of certain data sharing</List.Item>
                      </List>
                    </Paper>
                  </Grid.Col>
                </Grid>
                <Text mt="md">
                  To exercise these rights, please contact us using the information provided in the "Contact Information" section below.
                </Text>
                <Text mt="md">
                  Please note that blockchain data, including wallet addresses and transaction history, is immutable and cannot be modified or deleted once recorded on the blockchain.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="children" mb="xl">
                <Title order={2} mb="md">8. Children's Privacy</Title>
                <Text>
                  Our Platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children without verification of parental consent, we will take steps to remove that information from our servers.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="changes" mb="xl">
                <Title order={2} mb="md">9. Changes to Privacy Policy</Title>
                <Text>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                </Text>
                <Text mt="md">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="contact" mb="xl">
                <Title order={2} mb="md">10. Contact Information</Title>
                <Text>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </Text>
                <Text mt="md" fw={600}>
                  Email: privacy@starkraise.io
                </Text>
                <Text mt="xs" fw={600}>
                  Address: 123 Blockchain Avenue, Suite 456, San Francisco, CA 94105
                </Text>
              </Box>

              <Divider my="xl" />

              <Box>
                <Text fw={600}>Effective Date: {lastUpdated}</Text>
                <Text mt="md">
                  By using the StarkRaise platform, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                </Text>
              </Box>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
