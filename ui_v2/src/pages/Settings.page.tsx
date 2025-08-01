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
  Box,
  TextInput,
  Textarea,
  Switch,
  Select,
  Avatar,
  FileInput,
  Stack,
  Tabs,
  ActionIcon,
  Badge,
  useMantineColorScheme,
  rem,
  Accordion,
  SimpleGrid,
  Alert,
  CopyButton,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconUser,
  IconBell,
  IconWallet,
  IconLock,
  IconPalette,
  IconDevices,
  IconCheck,
  IconCopy,
  IconAlertCircle,
  IconTrash,
  IconUpload,
  IconRefresh,
  IconPlus,
  IconX,
  IconShield,
  IconSettings,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandDiscord,
  IconWorld,
} from '@tabler/icons-react';
import { useState } from 'react';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

const SettingsPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<string | null>('account');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [connectedWallets, setConnectedWallets] = useState([
    { 
      id: 'wallet1', 
      name: 'ArgentX', 
      address: '0x04a9...7c3e', 
      isPrimary: true,
      balance: '1.45 ETH'
    },
    { 
      id: 'wallet2', 
      name: 'Braavos', 
      address: '0x06b2...9f1a', 
      isPrimary: false,
      balance: '0.32 ETH'
    }
  ]);

  const accountForm = useForm({
    initialValues: {
      username: 'starkuser',
      displayName: 'Stark User',
      email: 'user@starkraise.io',
      bio: 'Blockchain enthusiast and early StarkNet adopter.',
      website: 'https://mywebsite.com',
      github: 'starkuser',
      twitter: 'starkuser',
      discord: 'starkuser#1234',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      website: (value) => (value === '' || /^https?:\/\//.test(value) ? null : 'URL must start with http:// or https://'),
    },
  });

  const notificationForm = useForm({
    initialValues: {
      emailNotifications: true,
      campaignUpdates: true,
      newBackers: true,
      milestoneReached: true,
      newComments: false,
      marketingEmails: false,
      browserNotifications: true,
    },
  });

  const securityForm = useForm({
    initialValues: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: '30',
    },
  });

  const appearanceForm = useForm({
    initialValues: {
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      currencyDisplay: 'symbol',
    },
  });

  const handleSaveAccount = (values: typeof accountForm.values) => {
    notifications.show({
      title: 'Account Updated',
      message: 'Your account information has been successfully updated.',
      color: 'green',
    });
  };

  const handleSaveNotifications = (values: typeof notificationForm.values) => {
    notifications.show({
      title: 'Notification Preferences Updated',
      message: 'Your notification preferences have been saved.',
      color: 'green',
    });
  };

  const handleSaveSecurity = (values: typeof securityForm.values) => {
    notifications.show({
      title: 'Security Settings Updated',
      message: 'Your security settings have been updated successfully.',
      color: 'green',
    });
  };

  const handleSaveAppearance = (values: typeof appearanceForm.values) => {
    notifications.show({
      title: 'Appearance Settings Updated',
      message: 'Your appearance settings have been saved.',
      color: 'green',
    });
  };

  const handleDisconnectWallet = (walletId: string) => {
    setConnectedWallets(connectedWallets.filter(wallet => wallet.id !== walletId));
    notifications.show({
      title: 'Wallet Disconnected',
      message: 'The wallet has been disconnected from your account.',
      color: 'blue',
    });
  };

  const handleSetPrimaryWallet = (walletId: string) => {
    setConnectedWallets(connectedWallets.map(wallet => ({
      ...wallet,
      isPrimary: wallet.id === walletId,
    })));
    notifications.show({
      title: 'Primary Wallet Updated',
      message: 'Your primary wallet has been updated.',
      color: 'green',
    });
  };

  const handleAvatarUpload = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      notifications.show({
        title: 'Avatar Uploaded',
        message: 'Your new avatar has been uploaded.',
        color: 'green',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Paper p="xl" radius="md" withBorder mb="xl">
          <Group justify="space-between" mb="md">
            <Box>
              <Title order={1}>Settings</Title>
              <Text c="dimmed">Manage your account and preferences</Text>
            </Box>
          </Group>
        </Paper>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Paper p="md" radius="md" withBorder style={{ position: 'sticky', top: '80px' }}>
              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                orientation="vertical"
                variant="pills"
                styles={{
                  tab: {
                    justifyContent: 'flex-start',
                    paddingLeft: rem(12),
                    paddingRight: rem(12),
                  },
                }}
              >
                <Tabs.List>
                  <Tabs.Tab value="account" leftSection={<IconUser size={16} />}>
                    Account
                  </Tabs.Tab>
                  <Tabs.Tab value="wallets" leftSection={<IconWallet size={16} />}>
                    Wallets
                  </Tabs.Tab>
                  <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
                    Notifications
                  </Tabs.Tab>
                  <Tabs.Tab value="security" leftSection={<IconLock size={16} />}>
                    Security
                  </Tabs.Tab>
                  <Tabs.Tab value="appearance" leftSection={<IconPalette size={16} />}>
                    Appearance
                  </Tabs.Tab>
                  <Tabs.Tab value="sessions" leftSection={<IconDevices size={16} />}>
                    Sessions
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Tabs value={activeTab} onChange={setActiveTab}>
              {/* Account Settings */}
              <Tabs.Panel value="account">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Account Settings</Title>
                  <form onSubmit={accountForm.onSubmit(handleSaveAccount)}>
                    <Grid>
                      <Grid.Col span={{ base: 12, md: 3 }}>
                        <Stack align="center" gap="sm">
                          <Avatar 
                            size={120} 
                            radius="xl" 
                            src={avatarFile ? URL.createObjectURL(avatarFile) : null}
                            color="blue"
                          >
                            {accountForm.values.displayName.substring(0, 2).toUpperCase()}
                          </Avatar>
                          <FileInput
                            accept="image/png,image/jpeg,image/webp"
                            placeholder="Upload avatar"
                            value={avatarFile}
                            onChange={handleAvatarUpload}
                            leftSection={<IconUpload size={16} />}
                            size="xs"
                            style={{ width: '100%' }}
                          />
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 9 }}>
                        <Grid>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                              label="Username"
                              placeholder="Your username"
                              {...accountForm.getInputProps('username')}
                              mb="md"
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                              label="Display Name"
                              placeholder="Your display name"
                              {...accountForm.getInputProps('displayName')}
                              mb="md"
                            />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <TextInput
                              label="Email"
                              placeholder="Your email"
                              {...accountForm.getInputProps('email')}
                              mb="md"
                            />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Textarea
                              label="Bio"
                              placeholder="Tell us about yourself"
                              {...accountForm.getInputProps('bio')}
                              minRows={3}
                              mb="md"
                            />
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                    </Grid>

                    <Divider my="md" label="Social Links" labelPosition="center" />

                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Website"
                          placeholder="https://yourwebsite.com"
                          leftSection={<IconWorld size={16} />}
                          {...accountForm.getInputProps('website')}
                          mb="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="GitHub"
                          placeholder="Your GitHub username"
                          leftSection={<IconBrandGithub size={16} />}
                          {...accountForm.getInputProps('github')}
                          mb="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Twitter"
                          placeholder="Your Twitter username"
                          leftSection={<IconBrandTwitter size={16} />}
                          {...accountForm.getInputProps('twitter')}
                          mb="md"
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Discord"
                          placeholder="Your Discord username"
                          leftSection={<IconBrandDiscord size={16} />}
                          {...accountForm.getInputProps('discord')}
                          mb="md"
                        />
                      </Grid.Col>
                    </Grid>

                    <Group justify="flex-end" mt="xl">
                      <Button type="submit" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        Save Changes
                      </Button>
                    </Group>
                  </form>
                </Paper>
              </Tabs.Panel>

              {/* Wallets Settings */}
              <Tabs.Panel value="wallets">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Connected Wallets</Title>
                  <Text c="dimmed" mb="xl">
                    Manage your connected wallets and set your primary wallet for transactions.
                  </Text>

                  {connectedWallets.length > 0 ? (
                    <Stack gap="md">
                      {connectedWallets.map((wallet) => (
                        <Paper key={wallet.id} p="md" radius="md" withBorder>
                          <Group justify="space-between" wrap="nowrap">
                            <Group wrap="nowrap">
                              <Avatar color={wallet.isPrimary ? "blue" : "gray"} radius="xl">
                                {wallet.name.substring(0, 2)}
                              </Avatar>
                              <Box>
                                <Group gap="xs">
                                  <Text fw={500}>{wallet.name}</Text>
                                  {wallet.isPrimary && (
                                    <Badge color="blue" size="xs">Primary</Badge>
                                  )}
                                </Group>
                                <Group gap="xs">
                                  <Text size="sm" c="dimmed">{wallet.address}</Text>
                                  <CopyButton value={wallet.address} timeout={2000}>
                                    {({ copied, copy }) => (
                                      <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                                        <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                                          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                        </ActionIcon>
                                      </Tooltip>
                                    )}
                                  </CopyButton>
                                </Group>
                                <Text size="sm">{wallet.balance}</Text>
                              </Box>
                            </Group>
                            <Group>
                              {!wallet.isPrimary && (
                                <Button 
                                  variant="light" 
                                  size="xs"
                                  onClick={() => handleSetPrimaryWallet(wallet.id)}
                                >
                                  Set as Primary
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                color="red" 
                                size="xs"
                                onClick={() => handleDisconnectWallet(wallet.id)}
                              >
                                Disconnect
                              </Button>
                            </Group>
                          </Group>
                        </Paper>
                      ))}
                    </Stack>
                  ) : (
                    <Alert icon={<IconAlertCircle size={16} />} title="No wallets connected" color="yellow">
                      You don't have any wallets connected to your account yet.
                    </Alert>
                  )}

                  <Button 
                    leftSection={<IconPlus size={16} />} 
                    variant="outline" 
                    mt="xl"
                  >
                    Connect New Wallet
                  </Button>
                </Paper>
              </Tabs.Panel>

              {/* Notification Settings */}
              <Tabs.Panel value="notifications">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Notification Settings</Title>
                  <Text c="dimmed" mb="xl">
                    Manage how and when you receive notifications from StarkRaise.
                  </Text>

                  <form onSubmit={notificationForm.onSubmit(handleSaveNotifications)}>
                    <Accordion variant="separated" radius="md">
                      <Accordion.Item value="email">
                        <Accordion.Control>
                          <Group gap="xs">
                            <IconBell size={20} />
                            <Text fw={500}>Email Notifications</Text>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack gap="md">
                            <Switch
                              label="Enable email notifications"
                              description="Receive important updates via email"
                              {...notificationForm.getInputProps('emailNotifications', { type: 'checkbox' })}
                              size="md"
                            />
                            <Switch
                              label="Campaign updates"
                              description="Get notified about updates to campaigns you've backed"
                              {...notificationForm.getInputProps('campaignUpdates', { type: 'checkbox' })}
                              disabled={!notificationForm.values.emailNotifications}
                              size="md"
                            />
                            <Switch
                              label="New backers"
                              description="Get notified when someone backs your campaign"
                              {...notificationForm.getInputProps('newBackers', { type: 'checkbox' })}
                              disabled={!notificationForm.values.emailNotifications}
                              size="md"
                            />
                            <Switch
                              label="Milestone reached"
                              description="Get notified when your campaign reaches a funding milestone"
                              {...notificationForm.getInputProps('milestoneReached', { type: 'checkbox' })}
                              disabled={!notificationForm.values.emailNotifications}
                              size="md"
                            />
                            <Switch
                              label="New comments"
                              description="Get notified when someone comments on your campaign"
                              {...notificationForm.getInputProps('newComments', { type: 'checkbox' })}
                              disabled={!notificationForm.values.emailNotifications}
                              size="md"
                            />
                            <Switch
                              label="Marketing emails"
                              description="Receive promotional content and platform updates"
                              {...notificationForm.getInputProps('marketingEmails', { type: 'checkbox' })}
                              disabled={!notificationForm.values.emailNotifications}
                              size="md"
                            />
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>

                      <Accordion.Item value="browser">
                        <Accordion.Control>
                          <Group gap="xs">
                            <IconBell size={20} />
                            <Text fw={500}>Browser Notifications</Text>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack gap="md">
                            <Switch
                              label="Enable browser notifications"
                              description="Receive notifications in your browser"
                              {...notificationForm.getInputProps('browserNotifications', { type: 'checkbox' })}
                              size="md"
                            />
                            <Button 
                              variant="light" 
                              leftSection={<IconBell size={16} />}
                              disabled={!notificationForm.values.browserNotifications}
                            >
                              Test Browser Notification
                            </Button>
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>

                    <Group justify="flex-end" mt="xl">
                      <Button type="submit" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        Save Preferences
                      </Button>
                    </Group>
                  </form>
                </Paper>
              </Tabs.Panel>

              {/* Security Settings */}
              <Tabs.Panel value="security">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Security Settings</Title>
                  <Text c="dimmed" mb="xl">
                    Manage your account security and privacy settings.
                  </Text>

                  <form onSubmit={securityForm.onSubmit(handleSaveSecurity)}>
                    <Stack gap="md">
                      <Paper p="md" radius="md" withBorder>
                        <Group justify="space-between">
                          <Box>
                            <Text fw={500}>Two-Factor Authentication</Text>
                            <Text size="sm" c="dimmed">
                              Add an extra layer of security to your account
                            </Text>
                          </Box>
                          <Switch
                            {...securityForm.getInputProps('twoFactorAuth', { type: 'checkbox' })}
                            size="md"
                          />
                        </Group>
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Group justify="space-between">
                          <Box>
                            <Text fw={500}>Login Notifications</Text>
                            <Text size="sm" c="dimmed">
                              Get notified when someone logs into your account
                            </Text>
                          </Box>
                          <Switch
                            {...securityForm.getInputProps('loginNotifications', { type: 'checkbox' })}
                            size="md"
                          />
                        </Group>
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Box>
                          <Text fw={500} mb="xs">Session Timeout</Text>
                          <Text size="sm" c="dimmed" mb="md">
                            Automatically log out after a period of inactivity
                          </Text>
                          <Select
                            {...securityForm.getInputProps('sessionTimeout')}
                            data={[
                              { value: '15', label: '15 minutes' },
                              { value: '30', label: '30 minutes' },
                              { value: '60', label: '1 hour' },
                              { value: '120', label: '2 hours' },
                              { value: '0', label: 'Never' },
                            ]}
                          />
                        </Box>
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Box>
                          <Text fw={500} mb="xs">Password</Text>
                          <Text size="sm" c="dimmed" mb="md">
                            Change your account password
                          </Text>
                          <Button variant="light" leftSection={<IconLock size={16} />}>
                            Change Password
                          </Button>
                        </Box>
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Box>
                          <Text fw={500} color="red" mb="xs">Danger Zone</Text>
                          <Text size="sm" c="dimmed" mb="md">
                            Permanently delete your account and all associated data
                          </Text>
                          <Button 
                            variant="outline" 
                            color="red" 
                            leftSection={<IconTrash size={16} />}
                          >
                            Delete Account
                          </Button>
                        </Box>
                      </Paper>
                    </Stack>

                    <Group justify="flex-end" mt="xl">
                      <Button type="submit" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        Save Security Settings
                      </Button>
                    </Group>
                  </form>
                </Paper>
              </Tabs.Panel>

              {/* Appearance Settings */}
              <Tabs.Panel value="appearance">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Appearance Settings</Title>
                  <Text c="dimmed" mb="xl">
                    Customize how StarkRaise looks and feels.
                  </Text>

                  <form onSubmit={appearanceForm.onSubmit(handleSaveAppearance)}>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                      <Paper p="md" radius="md" withBorder>
                        <Text fw={500} mb="md">Theme</Text>
                        <Group>
                          <Text size="sm">Color scheme:</Text>
                          <ColorSchemeToggle />
                        </Group>
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Text fw={500} mb="md">Language</Text>
                        <Select
                          {...appearanceForm.getInputProps('language')}
                          data={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                            { value: 'de', label: 'German' },
                            { value: 'zh', label: 'Chinese' },
                          ]}
                        />
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Text fw={500} mb="md">Date Format</Text>
                        <Select
                          {...appearanceForm.getInputProps('dateFormat')}
                          data={[
                            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                          ]}
                        />
                      </Paper>

                      <Paper p="md" radius="md" withBorder>
                        <Text fw={500} mb="md">Currency Display</Text>
                        <Select
                          {...appearanceForm.getInputProps('currencyDisplay')}
                          data={[
                            { value: 'symbol', label: 'Symbol (e.g., $)' },
                            { value: 'code', label: 'Code (e.g., USD)' },
                            { value: 'name', label: 'Name (e.g., US Dollar)' },
                          ]}
                        />
                      </Paper>
                    </SimpleGrid>

                    <Group justify="flex-end" mt="xl">
                      <Button type="submit" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        Save Appearance Settings
                      </Button>
                    </Group>
                  </form>
                </Paper>
              </Tabs.Panel>

              {/* Sessions */}
              <Tabs.Panel value="sessions">
                <Paper p="xl" radius="md" withBorder mb="xl">
                  <Title order={2} mb="md">Active Sessions</Title>
                  <Text c="dimmed" mb="xl">
                    Manage your active sessions and connected devices.
                  </Text>

                  <Stack gap="md">
                    <Paper p="md" radius="md" withBorder>
                      <Group justify="space-between">
                        <Group>
                          <IconDevices size={24} />
                          <Box>
                            <Text fw={500}>Current Session</Text>
                            <Text size="sm" c="dimmed">Chrome on Windows • New York, USA</Text>
                            <Text size="xs" c="dimmed">Started: July 16, 2025 at 12:45 PM</Text>
                          </Box>
                        </Group>
                        <Badge color="green">Active</Badge>
                      </Group>
                    </Paper>

                    <Paper p="md" radius="md" withBorder>
                      <Group justify="space-between">
                        <Group>
                          <IconDevices size={24} />
                          <Box>
                            <Text fw={500}>Mobile App</Text>
                            <Text size="sm" c="dimmed">StarkRaise App on iPhone • San Francisco, USA</Text>
                            <Text size="xs" c="dimmed">Started: July 15, 2025 at 8:30 AM</Text>
                          </Box>
                        </Group>
                        <Button variant="subtle" color="red" size="xs" leftSection={<IconX size={14} />}>
                          Revoke
                        </Button>
                      </Group>
                    </Paper>
                  </Stack>

                  <Button 
                    leftSection={<IconRefresh size={16} />} 
                    variant="outline" 
                    color="red"
                    mt="xl"
                  >
                    Sign Out All Other Sessions
                  </Button>
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default SettingsPage;
