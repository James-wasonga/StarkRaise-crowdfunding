import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Paper,
  Accordion,
  Grid,
  Button,
  Group,
  Divider,
  List,
  ThemeIcon,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { IconCheck, IconDownload, IconPrinter } from '@tabler/icons-react';

const TermsAndConditionsPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const lastUpdated = "July 15, 2024";

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Paper p="xl" radius="md" withBorder mb="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={1}>Terms and Conditions</Title>
              <Text c="dimmed" mt="xs">Last Updated: {lastUpdated}</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Group>
                <Button 
                  variant="outline" 
                  leftSection={<IconPrinter size={16} />} 
                  onClick={() => {
                    const printContent = document.getElementById('terms-content')?.innerHTML;
                    if (printContent) {
                      const printWindow = window.open('', '_blank');
                      if (printWindow) {
                        printWindow.document.write(`
                          <html>
                            <head>
                              <title>StarkRaise - Terms and Conditions</title>
                              <style>
                                body { font-family: Arial, sans-serif; padding: 20px; }
                                h1 { font-size: 24px; margin-bottom: 20px; }
                                h2 { font-size: 20px; margin-top: 30px; margin-bottom: 15px; }
                                p { line-height: 1.6; margin-bottom: 15px; }
                              </style>
                            </head>
                            <body>
                              <h1>StarkRaise - Terms and Conditions</h1>
                              ${printContent}
                            </body>
                          </html>
                        `);
                        printWindow.document.close();
                        printWindow.focus();
                        printWindow.print();
                      }
                    }
                  }}
                >
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  leftSection={<IconDownload size={16} />}
                  onClick={() => {
                    const content = document.getElementById('terms-content')?.innerHTML;
                    if (content) {
                      const blob = new Blob([`
                        <html>
                          <head>
                            <title>StarkRaise - Terms and Conditions</title>
                            <style>
                              body { font-family: Arial, sans-serif; padding: 20px; }
                              h1 { font-size: 24px; margin-bottom: 20px; }
                              h2 { font-size: 20px; margin-top: 30px; margin-bottom: 15px; }
                              p { line-height: 1.6; margin-bottom: 15px; }
                            </style>
                          </head>
                          <body>
                            <h1>StarkRaise - Terms and Conditions</h1>
                            ${content}
                          </body>
                        </html>
                      `], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'StarkRaise-Terms-and-Conditions.html';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }
                  }}
                >
                  Download HTML
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Grid mb="xl">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper p="md" radius="md" withBorder style={{ position: 'sticky', top: '80px' }}>
              <Title order={4} mb="md">Table of Contents</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button variant="subtle" justify="start" component="a" href="#introduction">1. Introduction</Button>
                <Button variant="subtle" justify="start" component="a" href="#definitions">2. Definitions</Button>
                <Button variant="subtle" justify="start" component="a" href="#account">3. Account Registration</Button>
                <Button variant="subtle" justify="start" component="a" href="#platform-use">4. Platform Use</Button>
                <Button variant="subtle" justify="start" component="a" href="#campaigns">5. Campaigns</Button>
                <Button variant="subtle" justify="start" component="a" href="#payments">6. Payments</Button>
                <Button variant="subtle" justify="start" component="a" href="#intellectual-property">7. Intellectual Property</Button>
                <Button variant="subtle" justify="start" component="a" href="#liability">8. Limitation of Liability</Button>
                <Button variant="subtle" justify="start" component="a" href="#termination">9. Termination</Button>
                <Button variant="subtle" justify="start" component="a" href="#governing-law">10. Governing Law</Button>
                <Button variant="subtle" justify="start" component="a" href="#changes">11. Changes to Terms</Button>
                <Button variant="subtle" justify="start" component="a" href="#contact">12. Contact Information</Button>
              </div>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Paper id="terms-content" p="xl" radius="md" withBorder>
              <Box id="introduction" mb="xl">
                <Title order={2} mb="md">1. Introduction</Title>
                <Text>
                  Welcome to StarkRaise ("we," "our," or "us"). These Terms and Conditions govern your access to and use of the StarkRaise platform, 
                  including any content, functionality, and services offered on or through our website (the "Platform").
                </Text>
                <Text mt="md">
                  By accessing or using the Platform, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, 
                  you must not access or use the Platform.
                </Text>
                <Text mt="md">
                  Please read these Terms and Conditions carefully before you start to use the Platform. These Terms and Conditions constitute a legally 
                  binding agreement between you and StarkRaise.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="definitions" mb="xl">
                <Title order={2} mb="md">2. Definitions</Title>
                <Text mb="md">In these Terms and Conditions, the following terms shall have the meanings set forth below:</Text>
                <List spacing="md">
                  <List.Item>
                    <Text fw={600}>"User"</Text> refers to any individual or entity that accesses or uses the Platform, whether as a Creator or Backer.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>"Creator"</Text> refers to a User who creates and manages a Campaign on the Platform.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>"Backer"</Text> refers to a User who contributes funds to a Campaign.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>"Campaign"</Text> refers to a fundraising project created by a Creator on the Platform.
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>"Content"</Text> refers to any information, data, text, software, graphics, photographs, videos, audio clips, written posts, articles, comments, or other material that a User posts, uploads, publishes, displays, or transmits on the Platform.
                  </List.Item>
                </List>
              </Box>

              <Divider my="xl" />

              <Box id="account" mb="xl">
                <Title order={2} mb="md">3. Account Registration</Title>
                <Text mb="md">
                  To access certain features of the Platform, you may be required to connect a StarkNet-compatible wallet. By connecting your wallet, you agree to:
                </Text>
                <List spacing="md" withPadding icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }>
                  <List.Item>Provide accurate and complete information</List.Item>
                  <List.Item>Maintain the security of your wallet and private keys</List.Item>
                  <List.Item>Accept all responsibility for activities that occur under your account</List.Item>
                  <List.Item>Notify us immediately of any unauthorized use of your account</List.Item>
                </List>
                <Text mt="md">
                  We reserve the right to disable any user account at any time if, in our opinion, you have failed to comply with any provision of these Terms and Conditions.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="platform-use" mb="xl">
                <Title order={2} mb="md">4. Platform Use</Title>
                <Text mb="md">You agree not to use the Platform:</Text>
                <List spacing="md" withPadding>
                  <List.Item>In any way that violates any applicable federal, state, local, or international law or regulation</List.Item>
                  <List.Item>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</List.Item>
                  <List.Item>To impersonate or attempt to impersonate StarkRaise, a StarkRaise employee, another user, or any other person or entity</List.Item>
                  <List.Item>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Platform, or which may harm StarkRaise or users of the Platform</List.Item>
                </List>
                <Text mt="md">
                  Additionally, you agree not to:
                </Text>
                <List spacing="md" withPadding>
                  <List.Item>Use the Platform in any manner that could disable, overburden, damage, or impair the site</List.Item>
                  <List.Item>Use any robot, spider, or other automatic device, process, or means to access the Platform for any purpose</List.Item>
                  <List.Item>Use any manual process to monitor or copy any of the material on the Platform</List.Item>
                  <List.Item>Use any device, software, or routine that interferes with the proper working of the Platform</List.Item>
                  <List.Item>Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</List.Item>
                  <List.Item>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Platform</List.Item>
                </List>
              </Box>

              <Divider my="xl" />

              <Box id="campaigns" mb="xl">
                <Title order={2} mb="md">5. Campaigns</Title>
                <Accordion variant="separated" radius="md">
                  <Accordion.Item value="creator-obligations">
                    <Accordion.Control>
                      <Text fw={600}>Creator Obligations</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">As a Creator, you agree to:</Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Provide accurate and complete information about your Campaign</List.Item>
                        <List.Item>Use the funds raised solely for the purposes described in your Campaign</List.Item>
                        <List.Item>Fulfill all rewards or promises made to Backers in a timely manner</List.Item>
                        <List.Item>Communicate regularly with your Backers about the progress of your Campaign</List.Item>
                        <List.Item>Comply with all applicable laws and regulations</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="backer-acknowledgments">
                    <Accordion.Control>
                      <Text fw={600}>Backer Acknowledgments</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">As a Backer, you acknowledge and agree that:</Text>
                      <List spacing="sm" withPadding>
                        <List.Item>You are supporting a project that may or may not be completed</List.Item>
                        <List.Item>StarkRaise does not guarantee the success of any Campaign</List.Item>
                        <List.Item>StarkRaise does not guarantee that Creators will fulfill their obligations</List.Item>
                        <List.Item>You have conducted your own research and due diligence before backing a Campaign</List.Item>
                        <List.Item>Your contribution may be non-refundable, depending on the Campaign's terms</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="prohibited-campaigns">
                    <Accordion.Control>
                      <Text fw={600}>Prohibited Campaigns</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text mb="md">The following types of Campaigns are prohibited on the Platform:</Text>
                      <List spacing="sm" withPadding>
                        <List.Item>Campaigns that promote illegal activities</List.Item>
                        <List.Item>Campaigns that promote violence, hate speech, or discrimination</List.Item>
                        <List.Item>Campaigns that involve regulated financial activities without proper licensing</List.Item>
                        <List.Item>Campaigns that involve the sale of prohibited items</List.Item>
                        <List.Item>Campaigns that infringe on the intellectual property rights of others</List.Item>
                        <List.Item>Campaigns that are fraudulent or misleading</List.Item>
                      </List>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Box>

              <Divider my="xl" />

              <Box id="payments" mb="xl">
                <Title order={2} mb="md">6. Payments</Title>
                <Text mb="md">
                  All payments on the Platform are processed through smart contracts on the StarkNet blockchain. By using the Platform, you acknowledge and agree that:
                </Text>
                <List spacing="md" withPadding>
                  <List.Item>Transactions on the blockchain are irreversible</List.Item>
                  <List.Item>You are responsible for any gas fees associated with your transactions</List.Item>
                  <List.Item>The value of cryptocurrencies can be volatile, and StarkRaise is not responsible for any losses due to price fluctuations</List.Item>
                  <List.Item>StarkRaise may charge platform fees, which will be clearly disclosed before you complete a transaction</List.Item>
                </List>
              </Box>

              <Divider my="xl" />

              <Box id="intellectual-property" mb="xl">
                <Title order={2} mb="md">7. Intellectual Property</Title>
                <Text mb="md">
                  The Platform and its original content, features, and functionality are owned by StarkRaise and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </Text>
                <Text mb="md">
                  By posting Content on the Platform, you grant StarkRaise a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Content throughout the world in any media.
                </Text>
                <Text>
                  You represent and warrant that you own or control all rights in and to the Content that you post on the Platform and that the Content does not infringe upon the rights of any third party.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="liability" mb="xl">
                <Title order={2} mb="md">8. Limitation of Liability</Title>
                <Text mb="md">
                  IN NO EVENT SHALL STARKRAISE, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER RESULTING FROM:
                </Text>
                <List spacing="md" withPadding>
                  <List.Item>YOUR ACCESS TO OR USE OF THE PLATFORM</List.Item>
                  <List.Item>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM</List.Item>
                  <List.Item>ANY CONTENT OBTAINED FROM THE PLATFORM</List.Item>
                  <List.Item>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</List.Item>
                  <List.Item>BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE PLATFORM</List.Item>
                  <List.Item>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE PLATFORM</List.Item>
                  <List.Item>ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE PLATFORM</List.Item>
                </List>
                <Text mt="md">
                  THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="termination" mb="xl">
                <Title order={2} mb="md">9. Termination</Title>
                <Text>
                  We may terminate or suspend your access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.
                </Text>
                <Text mt="md">
                  Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the Platform.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="governing-law" mb="xl">
                <Title order={2} mb="md">10. Governing Law</Title>
                <Text>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which StarkRaise is established, without regard to its conflict of law provisions.
                </Text>
                <Text mt="md">
                  Any dispute arising from or relating to these Terms and Conditions shall be resolved through arbitration in accordance with the rules of the jurisdiction in which StarkRaise is established.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="changes" mb="xl">
                <Title order={2} mb="md">11. Changes to Terms</Title>
                <Text>
                  We reserve the right, at our sole discretion, to modify or replace these Terms and Conditions at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                </Text>
                <Text mt="md">
                  By continuing to access or use our Platform after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Platform.
                </Text>
              </Box>

              <Divider my="xl" />

              <Box id="contact" mb="xl">
                <Title order={2} mb="md">12. Contact Information</Title>
                <Text>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </Text>
                <Text mt="md" fw={600}>
                  Email: legal@starkraise.io
                </Text>
                <Text mt="xs" fw={600}>
                  Address: 123 Blockchain Avenue, Suite 456, San Francisco, CA 94105
                </Text>
              </Box>

              <Divider my="xl" />

              <Box>
                <Text fw={600}>Effective Date: {lastUpdated}</Text>
                <Text mt="md">
                  By using the StarkRaise platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </Text>
              </Box>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default TermsAndConditionsPage;
