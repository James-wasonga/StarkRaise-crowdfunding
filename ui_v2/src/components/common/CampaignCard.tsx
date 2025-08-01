import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    Progress,
    Button,
    Box,
    useMantineTheme,
    Tooltip,
    ActionIcon,
    useMantineColorScheme,
    Avatar,
} from '@mantine/core';
import { IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import { ICampaignCard } from '../../types';

interface CampaignCardProps extends ICampaignCard {
    onFavorite?: (id: string) => void;
    onShare?: (id: string) => void;
}

export function CampaignCard({
    title,
    description,
    image,
    target,
    fundsRaised = '0 ETH',
    creator,
    contractAddress = '',
    network,
    developmentStage,
    daysLeft = 0,
    badgeText,
    onFavorite,
    onShare,
}: CampaignCardProps) {
    const theme = useMantineTheme();
    const [isFavorite, setIsFavorite] = useState(false);

    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    // Calculate progress percentage
    const targetValue = parseFloat(target.split(' ')[0]) || 0;
    const raisedValue = parseFloat(fundsRaised.split(' ')[0]) || 0;
    const progressPercentage = targetValue > 0 ? Math.min((raisedValue / targetValue) * 100, 100) : 0;

    // Get badge color based on development stage
    const getBadgeColor = () => {
        switch (developmentStage) {
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
    const getNetworkColor = () => {
        switch (network) {
            case 'mainnet': return 'green';
            case 'sepolia': return 'orange';
            case 'custom': return 'gray';
            default: return 'blue';
        }
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        if (onFavorite && contractAddress) {
            onFavorite(contractAddress);
        }
    };

    const handleShareClick = () => {
        if (onShare && contractAddress) {
            onShare(contractAddress);
        }
    };

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDark
                        ? '0 10px 20px rgba(0, 0, 0, 0.3)'
                        : '0 10px 20px rgba(0, 0, 0, 0.1)',
                },
                borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
            })}
        >
            <Card.Section>
                <Box style={{ position: 'relative' }}>
                    <Image
                        src={image}
                        height={180}
                        alt={title}
                        style={{
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    />
                    {badgeText && (
                        <Badge
                            color="pink"
                            variant="filled"
                            size="md"
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                        >
                            {badgeText}
                        </Badge>
                    )}
                </Box>
            </Card.Section>

            <Group justify="apart" mt="md" mb="xs">
                <Text fw={700} size="lg" lineClamp={1}>
                    {title}
                </Text>
                <Group gap={5}>
                    <Badge color={getNetworkColor()} variant="light">
                        {network}
                    </Badge>
                    <Badge color={getBadgeColor()} variant="light">
                        {developmentStage}
                    </Badge>
                </Group>
            </Group>

            <Text size="sm" color="dimmed" lineClamp={2} mb="md">
                {description}
            </Text>

            {/* Creator info */}
            <Group mb="md" align="center">
                <Avatar
                    color={theme.primaryColor}
                    radius="xl"
                    size="sm"
                >
                    {creator.substring(0, 2)}
                </Avatar>
                <Text size="xs" color="dimmed">
                    {creator.substring(0, 6)}...{creator.substring(creator.length - 4)}
                </Text>
            </Group>

            <Box mb="md" mt="auto">
                <Group justify="apart" mb={5}>
                    <Text size="sm" fw={600}>
                        {fundsRaised} raised of {target}
                    </Text>
                    <Text
                        size="sm"
                        fw={600}
                        color={progressPercentage >= 100 ? 'green' : progressPercentage > 50 ? 'blue' : 'dimmed'}
                    >
                        {progressPercentage.toFixed(0)}%
                    </Text>
                </Group>
                <Progress
                    value={progressPercentage}
                    color={progressPercentage >= 100 ? 'green' : progressPercentage > 75 ? 'teal' : progressPercentage > 50 ? 'blue' : 'violet'}
                    size="md"
                    radius="sm"
                    striped={progressPercentage > 90}
                    animated={progressPercentage > 90}
                />
            </Box>

            <Group justify="apart" mt="md">
                <Text
                    size="sm"
                    fw={500}
                    color={daysLeft < 3 ? 'red' : daysLeft < 7 ? 'orange' : 'dimmed'}
                >
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}
                </Text>
                <Group gap={8}>
                    <Tooltip label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} withArrow position="top">
                        <ActionIcon
                            onClick={handleFavoriteClick}
                            variant={isFavorite ? "filled" : "subtle"}
                            color="pink"
                            radius="xl"
                        >
                            {isFavorite ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Share campaign" withArrow position="top">
                        <ActionIcon
                            onClick={handleShareClick}
                            variant="subtle"
                            radius="xl"
                        >
                            <IconShare size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>

            <Button
                component={Link}
                to={`/campaigns/${contractAddress}`}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan' }}
                fullWidth
                mt="md"
                radius="md"
                style={{
                    transition: 'transform 0.2s ease, opacity 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        opacity: 0.9,
                    },
                }}
            >
                View Campaign
            </Button>
        </Card>
    );
}

export default CampaignCard;