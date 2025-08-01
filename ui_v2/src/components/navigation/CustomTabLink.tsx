import { Box, Button, Text, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import classes from './navlink.module.css';
import campaignBtnClasses from './campaign-btn.module.css';
import { IconPlus } from '@tabler/icons-react';

export interface ICustomTabLinkProps {
  to: string
  title: string
  icon: any
  color: string
  isExternal?: boolean
}

const CustomTabLink = ({ to, title, icon, color, isExternal }: ICustomTabLinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Button leftSection={icon} w={"100%"} ta={"start"} target={isExternal ? '_blank' : undefined} component={NavLink} color={color} to={to} variant={match ? 'subtle' : 'default'} radius={'md'} style={{
      outline: `2px solid ${match ? color : 'transparent'}`,
      outlineOffset: "2px",
      border: "none",
      fontWeight: "400",
      alignItems: "start",
      justifyContent: "start",
      height: "40px"
    }}>
      {title}
    </Button>
  )
}

export const CustomNavbarLink = ({ to, title, icon, color }: ICustomTabLinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      component={NavLink}
      to={to}
      className={`${classes.link} ${match ? classes.active : ''}`}
      data-color={color}
      data-color-scheme={colorScheme}
    >
      {icon && (
        <Box className={classes.icon}>
          {icon}
        </Box>
      )}
      <Text size="sm" fw={match ? 600 : 400}>
        {title}
      </Text>
    </Box>
  );
};

export const CustomNavbarLinkJustComponent = ({ to, title, icon, color, rightSection }: ICustomTabLinkProps & { rightSection?: any }) => {
  const { colorScheme } = useMantineColorScheme();
  const isExternalLink = to.startsWith('http');

  const boxProps = {
    className: `${classes.link}`,
    // 'data-color': color,
    // 'data-color-scheme': colorScheme,
    w: "100%",
    // component: isExternalLink ? 'a' : 'div',
    href: isExternalLink ? to : undefined,
    target: isExternalLink ? '_blank' : undefined,
    rel: isExternalLink ? 'noopener noreferrer' : undefined,
    style: { cursor: 'pointer' }
  };

  return (
    <Box {...boxProps}>
      {icon && (
        <Box className={classes.icon}>
          {icon}
        </Box>
      )}
      <Text size="sm" fw={400}>
        {title}
      </Text>
      <Box ms="auto">
        {rightSection}
      </Box>
    </Box>
  );
};

export const CreateCampaignButton = () => {
  return (
    <UnstyledButton component={NavLink} to="/create-campaign">
      <button className={`${campaignBtnClasses.campaignBtn} ${campaignBtnClasses.ripple}`}>
        <IconPlus />
        <span>Create Campaign</span>
      </button>
    </UnstyledButton>
  );
};

export default CustomTabLink