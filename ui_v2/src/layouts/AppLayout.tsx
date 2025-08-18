
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import CustomTabLink, { CreateCampaignButton, CustomNavbarLink, CustomNavbarLinkJustComponent } from '@/components/navigation/CustomTabLink';
import TopBarNavigation from '@/components/navigation/TopBarNavigation';
import {
  ActionIcon,
  AppShell,
  AppShellSection,
  Avatar,
  BackgroundImage,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
  rgba,
  useMantineColorScheme
} from '@mantine/core';
import { 
  IconBrandDiscord, 
  IconBrandTwitter, 
  IconChevronRight, 
  IconCoin, 
  IconCreditCard, 
  IconCurrencyEthereum, 
  IconDashboard, 
  IconFileText, 
  IconFlame, 
  IconGift, 
  IconInfoCircle, 
  IconLock, 
  IconLogout, 
  IconMail, 
  IconPlus, 
  IconQuestionMark, 
  IconReportMoney, 
  IconSearch, 
  IconSettings, 
  IconSunLow, 
  IconUser, 
  IconUsers 
} from '@tabler/icons-react';
import { Outlet, useLocation } from 'react-router-dom';
import AppShellAsideContent from './AppShellAsideContent';

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  notification?: boolean;
  beta?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, notification, beta, onClick }: NavbarLinkProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      style={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: active ? theme.colors.blue[5] : theme.colors.dark[0],
        backgroundColor: active ? rgba(theme.colors.blue[5], 0.1) : 'transparent',
        '&:hover': {
          backgroundColor: rgba(theme.colors.blue[5], 0.05),
        },
      })}
      mb={8}
    >
      <Flex align="center">
        <Icon size={20} stroke={1.5} />
        <Text ml="md" size="sm" fw={active ? 600 : 400}>
          {label}
        </Text>
        <div style={{ flexGrow: 1 }} />
        {notification && (
          <Badge size="xs" variant="filled" color="orange" radius="xl" p={4} />
        )}
        {beta && (
          <Badge size="xs" variant="outline" color="blue" radius="sm">
            BETA
          </Badge>
        )}
      </Flex>
    </UnstyledButton>
  );
}

// Add custom Twitter Link Component
function TwitterNavbarLink() {
  const handleTwitterClick = () => {
    window.open('https://twitter.com/starkraise1', '_blank', 'noopener,noreferrer');
  };

  return (
    <UnstyledButton
    onClick={handleTwitterClick}
    style={(theme) => ({
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colors.dark[0],
      backgroundColor: 'transparent',
      '&:hover': {
        BackgroundColor: rgba(theme.colors.blue[5], 0.05),
      },
    })}
    mb={8}
    >
      <Flex align="center">
        <IconBrandTwitter size={20} stroke={1.5} />
        <Text ml="md" size="sm" fw={400}>
          Twitter
        </Text>
      </Flex>
    </UnstyledButton>
  );
}

// Add Custom Discord Link Component
function DiscordNavbarLink() {
  const handleDiscordClick = () => {
    window.open('https://discord.com/invite/starkraise', '_blank', 'noopener,noreferrer');
  };

  return (
    <UnstyledButton
    onClick={handleDiscordClick}
    style={(theme) => ({
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colors.dark[0],
      backgroundColor: 'transparent',
      '&:hover': {
        BackgroundColor: rgba(theme.colors.blue[5], 0.05),
      },
    })}
    mb={8}
    >
      <Flex align="center">
        <IconBrandDiscord size={20} stroke={1.5} />
        <Text ml="md" size="sm" fw={400}>
          Discord
          </Text>
      </Flex>
      </UnstyledButton>
  );
}

export function AppLayout() {

  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'md' }}
      aside={{ width: {lg: 400, md: 300, sm: 250}, breakpoint: 'md' }}
      padding="0"
      layout="alt"
      offsetScrollbars={true}
      
    >
      <AppShell.Header style={{ 
        borderBottom: `${colorScheme === 'dark' ? '#2C2E33' : '#E2E8F0'} 1px solid`,
        backdropFilter: 'blur(10px)',
        backgroundColor: colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        position: 'fixed',
        top: 0,
        zIndex: 100
      }}>
        <Container size="xl" h={'100%'} mx={"auto"}>
          <Group h="100%" px={{base: 'md', md: 'xl'}} justify="space-between" wrap="nowrap">
            <Group gap="xs">
              <Title order={2} style={{ fontWeight: 'bold' }}>
                <Text span c="yellow" inherit>Stark</Text><Text span c="blue" inherit>Raise</Text>
              </Title>
              <Badge variant="outline" color="blue" radius="sm" size="sm" style={{ transform: 'translateY(-8px)' }}>
                BETA
              </Badge>
            </Group>

            <Group gap="md" wrap="nowrap">
              <TextInput
                placeholder="Search for campaigns"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                style={{ width: '300px' }}
                radius="xl"
                size="sm"
                className="search-input"
                styles={(theme) => ({
                  input: {
                    '&:focus': {
                      borderColor: theme.colors.blue[5],
                      boxShadow: `0 0 0 2px ${rgba(theme.colors.blue[5], 0.25)}`
                    }
                  }
                })}
                visibleFrom="md"
              />
              <Group gap="xs" wrap="nowrap">
                <Button
                  leftSection={<IconPlus size={16} stroke={1.5} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                  radius="xl"
                  size="sm"
                  styles={{ root: { fontWeight: 500 } }}
                  visibleFrom="sm"
                >
                  Create a campaign
                </Button>
                <Menu position="bottom-end" withArrow shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar 
                      color="blue" 
                      radius="xl" 
                      style={{ cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s ease' }}
                      className="user-avatar"
                      styles={(theme) => ({
                        root: {
                          '&:hover': {
                            borderColor: theme.colors.blue[5]
                          }
                        }
                      })}
                    >
                      JD
                    </Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
                    <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item leftSection={<IconCoin size={14} />}>My Campaigns</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout size={14} />} color="red">Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ background: colorScheme === 'dark' ? '#1A1B1E' : rgba('#FFF', 1), borderRight: `1px solid ${colorScheme === 'dark' ? '#2C2E33' : '#E2E8F0'}` }}>
        <AppShellSection h="60px">
          {/* <Group mb="xl" px="xs" h="100%" align='center'>
            <Title order={4} style={{ fontWeight: 'bold' }}>
              <Text span c="yellow" inherit>Stark</Text><Text span c="blue" inherit>Raise</Text>
              <Text span size="xs" c="dimmed" ml={5}>v1.0</Text>
            </Title>
          </Group> */}
          <CreateCampaignButton />
        </AppShellSection>
        <AppShellSection grow my="md" component={ScrollArea}>
          <Stack gap={"xs"}>
            <CustomNavbarLink to="/" title="Dashboard" icon={<IconDashboard />} color="blue" />
            <CustomNavbarLink to="/campaigns/featured" title="Featured" icon={<IconCoin />} color="blue" />
            <CustomNavbarLink to="/campaigns/trending" title="Trending" icon={<IconCurrencyEthereum />} color="blue" />
            <CustomNavbarLink to="/donate" title="Donate" icon={<IconCreditCard />} color="blue" />
            <CustomNavbarLink to="/contributions" title="Contributions" icon={<IconGift />} color="blue" />
            <CustomNavbarLink to="/community" title="Community" icon={<IconUsers />} color="blue" />
            <CustomNavbarLink to="/reports" title="Reports" icon={<IconReportMoney />} color="blue" />
            <CustomNavbarLink to="/staking" title="Staking" icon={<IconFlame />} color="blue" />

            <Divider label="Account" labelPosition='left' />

            <CustomNavbarLink to="/my-campaigns" title="My campaigns" icon={<IconCoin />} color="blue" />

            <Divider label="Support & Legal" labelPosition='left' />

            <CustomNavbarLink to="/faqs" title="FAQs" icon={<IconQuestionMark />} color="blue" />
            <CustomNavbarLink to="/about" title="About" icon={<IconInfoCircle />} color="blue" />
            <CustomNavbarLink to="/contact" title="Contact" icon={<IconMail />} color="blue" />
            <CustomNavbarLink to="/terms-and-conditions" title="Terms & Conditions" icon={<IconFileText />} color="blue" />
            <CustomNavbarLink to="/privacy-policy" title="Privacy Policy" icon={<IconLock />} color="blue" />

            <Divider label="Our Socials" labelPosition='left' />

            {/* <CustomNavbarLinkJustComponent to="https://twitter.com/StarkNetFyi" title="Twitter" icon={<IconBrandTwitter />} color="blue" /> */}
            <TwitterNavbarLink/>
            {/* <CustomNavbarLinkJustComponent to="https://discord.gg/starknet" title="Discord" icon={<IconBrandDiscord />} color="blue" /> */}
            <DiscordNavbarLink/>

          </Stack>
        </AppShellSection>
        <AppShellSection>
          <Stack gap={"xs"}>
            <CustomNavbarLink to="/settings" title="Settings" icon={<IconSettings />} color="blue" />
            <CustomNavbarLinkJustComponent to="#" title="Theme" icon={<IconSunLow />} color="blue" rightSection={<ColorSchemeToggle />} />
          </Stack>
        </AppShellSection>
      </AppShell.Navbar>

      <AppShell.Aside withBorder={false}>
        <AppShellAsideContent />
      </AppShell.Aside>

      <AppShell.Main
        style={{
          backgroundColor: colorScheme === 'dark' ? '#101113' : '#FFF',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Fixed position gradient background container */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {/* Top right gradient */}
          <div
            style={{
              position: 'absolute',
              top: '-20%', // Moved up to ensure the full circle is visible
              right: '-10%', // Moved right to ensure the full circle is visible
              width: '70%', // Increased width
              height: '70%', // Increased height to make it a full circle
              background: colorScheme === 'dark'
                ? 'radial-gradient(circle at 70% 30%, rgba(30, 50, 100, 0.2) 0%, rgba(16, 17, 19, 0) 70%)'
                : 'radial-gradient(circle at 70% 30%, rgba(200, 220, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none'
            }}
          />
          {/* Bottom left gradient */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '5%',
              width: '50%',
              height: '60%',
              background: colorScheme === 'dark'
                ? 'radial-gradient(circle, rgba(60, 30, 90, 0.18) 0%, rgba(16, 17, 19, 0) 70%)'
                : 'radial-gradient(circle, rgba(230, 240, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none'
            }}
          />
          {/* Middle gradient */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '30%',
              width: '40%',
              height: '40%',
              background: colorScheme === 'dark'
                ? 'radial-gradient(circle, rgba(40, 80, 70, 0.15) 0%, rgba(16, 17, 19, 0) 70%)'
                : 'radial-gradient(circle, rgba(220, 250, 240, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none'
            }}
          />
        </div>
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
