import { ActionIcon, Box, Group, Image, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import CustomNavLink, { ICustomNavLinkProps } from './CustomNavLink'
import { isDarkMode } from '../../utils/utilities';
import { IconSun, IconMoon, IconHome2, IconPlus, IconLayoutDashboard, IconRocket } from '@tabler/icons-react';
import ConnectWalletBtn from './ConnectWalletBtn';


const navlinks: ICustomNavLinkProps[] = [
    {
        to: '/',
        title: 'Home',
        icon: <IconHome2 stroke={1.5} />
    },
    {
        to: '/my-campaigns',
        title: 'My Campaigns',
        icon: <IconLayoutDashboard stroke={1.5} />
    },
    {
        to: '/create-campaign',
        title: 'Create Campaign',
        icon: <IconPlus stroke={1.5} />
    },
    {
        to: '/campaigns/featured',
        title: 'Featured',
        icon: <IconRocket stroke={1.5} />
    },
]

const TopBarNavigation = () => {
    const { setColorScheme, colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()

    return (
        <Box p={'md'} style={{
            background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[3],
            borderRadius: "20px 20px 0 0",
        }}>
            <Group align='center' justify='space-between'>
                <Group>
                    <Image src={'/images/icon1.png'} h={'60px'} alt="StarkRaise" />
                    {
                        navlinks?.map((link: ICustomNavLinkProps, i: number) => (
                            <CustomNavLink key={`navlink_${i}`} {...link} />
                        ))
                    }
                </Group>
                <Group>
                    <ConnectWalletBtn />
                    <ActionIcon size={'lg'} variant='subtle' radius={'md'} onClick={() => setColorScheme(isDarkMode(colorScheme) ? 'light' : 'dark')}>
                        {isDarkMode(colorScheme) ? <IconSun /> : <IconMoon />}
                    </ActionIcon>
                </Group>
            </Group>
        </Box>
    )
}

export default TopBarNavigation