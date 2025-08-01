
import { useState } from 'react';
import {
    Group,
    TextInput,
    Select,
    MultiSelect,
    Button,
    Paper,
    Accordion,
    Box,
    Chip,
    Divider,
    ActionIcon,
    Tooltip,
    useMantineTheme,
    Text,
    Badge,
    Stack,
    SegmentedControl,
} from '@mantine/core';
import { IconSearch, IconFilter, IconX, IconRefresh, IconSortAscending, IconSortDescending } from '@tabler/icons-react';

export interface FilterValues {
    search: string;
    network: string;
    developmentStage: string[];
    category: string[];
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

interface CampaignFilterFormProps {
    onFilterChange: (filters: FilterValues) => void;
    totalCampaigns: number;
    filteredCount: number;
}

export function CampaignFilterForm({ onFilterChange, totalCampaigns, filteredCount }: CampaignFilterFormProps) {
    const theme = useMantineTheme();
    const [expanded, setExpanded] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        network: 'all',
        developmentStage: [],
        category: [],
        sortBy: 'newest',
        sortDirection: 'desc',
    });

    // Handle filter changes
    const handleFilterChange = (key: keyof FilterValues, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Reset all filters
    const handleReset = () => {
        const defaultFilters = {
            search: '',
            network: 'all',
            developmentStage: [],
            category: [],
            sortBy: 'newest',
            sortDirection: 'desc',
        };
        setFilters(defaultFilters as any);
        onFilterChange(defaultFilters as any);
    };

    // Toggle sort direction
    const toggleSortDirection = () => {
        const newDirection = filters.sortDirection === 'asc' ? 'desc' : 'asc';
        handleFilterChange('sortDirection', newDirection);
    };

    const borderRadius = theme.radius.md;

    return (
        <Paper radius="md" p="md" withBorder>
            <Group justify="apart" mb="md">
                <Group>
                    <TextInput
                        placeholder="Search campaigns..."
                        radius={borderRadius}
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        leftSection={<IconSearch size={16} />}
                        rightSection={
                            filters.search ? (
                                <ActionIcon size="sm" onClick={() => handleFilterChange('search', '')}>
                                    <IconX size={16} />
                                </ActionIcon>
                            ) : null
                        }
                        style={{ minWidth: 250 }}
                    />

                    <Select
                        radius={borderRadius}
                        placeholder="Sort by"
                        value={filters.sortBy}
                        onChange={(value) => handleFilterChange('sortBy', value || 'newest')}
                        data={[
                            { value: 'newest', label: 'Newest' },
                            { value: 'oldest', label: 'Oldest' },
                            { value: 'funding', label: 'Most Funded' },
                            { value: 'ending', label: 'Ending Soon' },
                        ]}
                        style={{ width: 130 }}
                    />

                    <Tooltip label={filters.sortDirection === 'asc' ? 'Ascending' : 'Descending'}>
                        <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={toggleSortDirection}
                        >
                            {filters.sortDirection === 'asc' ?
                                <IconSortAscending size={18} /> :
                                <IconSortDescending size={18} />}
                        </ActionIcon>
                    </Tooltip>
                </Group>

                <Group>
                    <Badge size="lg" radius={borderRadius} variant='default'>
                        {filteredCount} of {totalCampaigns} campaigns
                    </Badge>
                    <Button
                        variant="subtle"
                        leftSection={<IconRefresh size={16} />}
                        onClick={handleReset}
                        disabled={filters.search === '' &&
                            filters.network === 'all' &&
                            filters.developmentStage.length === 0 &&
                            filters.category.length === 0 &&
                            filters.sortBy === 'newest' &&
                            filters.sortDirection === 'desc'}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="light"
                        leftSection={<IconFilter size={16} />}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Hide Filters' : 'More Filters'}
                    </Button>
                </Group>
            </Group>

            {expanded && (
                <Box mt="md">
                    <Divider mb="md" />
                    <Stack gap="md">
                        <Box>
                            <Text size="sm" fw={500} mb="xs">Network</Text>
                            <SegmentedControl
                                radius={borderRadius}
                                value={filters.network}
                                onChange={(value) => handleFilterChange('network', value)}
                                data={[
                                    { label: 'All Networks', value: 'all' },
                                    { label: 'Mainnet', value: 'mainnet' },
                                    { label: 'Sepolia', value: 'sepolia' },
                                    { label: 'Custom', value: 'custom' }
                                ]}
                                fullWidth
                            />
                        </Box>

                        <Box>
                            <Text size="sm" fw={500} mb="xs">Development Stage</Text>
                            <MultiSelect
                                radius={borderRadius}
                                data={[
                                    { value: 'ideation', label: 'Ideation' },
                                    { value: 'prototype', label: 'Prototype' },
                                    { value: 'alpha', label: 'Alpha' },
                                    { value: 'beta', label: 'Beta' },
                                    { value: 'mainnet', label: 'Mainnet' },
                                    { value: 'completed', label: 'Completed' },
                                ]}
                                placeholder="Select stages"
                                value={filters.developmentStage}
                                onChange={(value) => handleFilterChange('developmentStage', value)}
                                clearable
                            />
                        </Box>

                        <Box>
                            <Text size="sm" fw={500} mb="xs">Category</Text>
                            <Chip.Group
                                multiple
                                value={filters.category}
                                onChange={(value) => handleFilterChange('category', value)}
                            >
                                <Group>
                                    <Chip value="DeFi">DeFi</Chip>
                                    <Chip value="NFT">NFT</Chip>
                                    <Chip value="DAO">DAO</Chip>
                                    <Chip value="Gaming">Gaming</Chip>
                                    <Chip value="Infrastructure">Infrastructure</Chip>
                                    <Chip value="Wallet">Wallet</Chip>
                                    <Chip value="Oracle">Oracle</Chip>
                                    <Chip value="Identity">Identity</Chip>
                                </Group>
                            </Chip.Group>
                        </Box>
                    </Stack>
                </Box>
            )}
        </Paper>
    );
}

export default CampaignFilterForm;