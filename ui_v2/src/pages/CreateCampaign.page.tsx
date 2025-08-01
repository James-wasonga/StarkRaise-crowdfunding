import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  Group,
  Box,
  Title,
  Text,
  Container,
  Paper,
  Stepper,
  Divider,
  FileInput,
  NumberInput,
  Stack,
  Grid,
  Chip,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  rem,
  em,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash, IconInfoCircle, IconUpload, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { CampaignDraft, db, useLatestDraft } from '../db';

const CATEGORIES = [
  { value: 'defi', label: 'DeFi' },
  { value: 'nft', label: 'NFT' },
  { value: 'governance', label: 'Governance' },
  { value: 'tooling', label: 'Tooling' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
];

const TECH_STACK_OPTIONS = [
  { value: 'cairo', label: 'Cairo' },
  { value: 'react', label: 'React' },
  { value: 'starknet.js', label: 'Starknet.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'hardhat', label: 'Hardhat' },
  { value: 'foundry', label: 'Foundry' },
];

const DEVELOPMENT_STAGES = [
  { value: 'ideation', label: 'Ideation' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'mainnet', label: 'Mainnet' },
  { value: 'completed', label: 'Completed' },
];

const NETWORKS = [
  { value: 'mainnet', label: 'Mainnet' },
  { value: 'testnet', label: 'Testnet (Goerli)' },
  { value: 'custom', label: 'Custom Network' },
];

const LICENSE_OPTIONS = [
  { value: 'MIT', label: 'MIT' },
  { value: 'GPL-3.0', label: 'GPL-3.0' },
  { value: 'Apache-2.0', label: 'Apache-2.0' },
  { value: 'BSD-3-Clause', label: 'BSD-3-Clause' },
  { value: 'Unlicense', label: 'Unlicense' },
  { value: 'proprietary', label: 'Proprietary' },
];

const CreateCampaign = () => {
  const [active, setActive] = useState(0);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [draftId, setDraftId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  
  // Get the latest draft from the database
  const latestDraft = useLatestDraft();

  // Auto-save function with debounce
  const autoSave = async (values: any) => {
    try {
      setAutoSaveStatus('saving');
      
      // Process the image file if it exists
      let draftValues = {...values};
      if (values.image) {
        // Check if it's a File object or has a file property
        if (typeof values.image === 'object') {
          if ('name' in values.image && 'type' in values.image && 'size' in values.image) {
            // Looks like a File object
            draftValues.image = await fileToDataUrl(values.image as unknown as File);
          } else if ('file' in values.image && values.image.file) {
            // Handle Mantine's FileInput value format
            draftValues.image = await fileToDataUrl(values.image.file as File);
          }
        } else if (typeof values.image === 'string') {
          // If it's already a string (URL or data URL), use it directly
          draftValues.image = values.image;
        }
      }
      
      // Add timestamp
      draftValues.lastUpdated = new Date().toISOString();
      
      const savedId = await db.autoSaveDraft(draftValues, draftId);
      if (!draftId) setDraftId(savedId);
      setAutoSaveStatus('saved');
    } catch (error) {
      console.error('Error auto-saving draft:', error);
      setAutoSaveStatus('error');
    }
  };

  // Load the latest draft when component mounts
  useEffect(() => {
    if (latestDraft && !draftId) {
      form.setValues(latestDraft as any); 
      setDraftId(latestDraft.id);
    }
  }, [latestDraft]);

  // Setup form with auto-save
  const form = useForm({
    initialValues: {
      // Core campaign details
      creator: '',
      title: '',
      description: '',
      fullDescription: '',
      category: '',
      image: null,
      target: '',
      duration: '',
      endsAt: null,
      // Token information
      token: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
      },
      // Starknet-specific details
      contractAddress: '',
      network: 'testnet',
      cairoVersion: '',
      isVerified: false,

      // Development details
      githubLink: '',
      demoLink: '',
      liveLink: '',
      developmentStage: 'ideation',
      techStack: [],

      // Team and contributors
      contributors: [
        { walletAddress: '', role: '', githubUsername: '' }
      ],
      teamSize: 1,

      // Campaign status and metadata
      tags: [],
      license: '',
      socialLinks: {
        twitter: '',
        discord: '',
        telegram: '',
        website: ''
      },

      // Milestones
      milestones: [
        { title: '', description: '', targetDate: '' }
      ],
    },

    validate: {
      creator: (value) => !value ? 'Creator wallet address is required' : null,
      title: (value) => !value ? 'Title is required' : null,
      description: (value) => !value ? 'Description is required' : null,
      category: (value) => !value ? 'Category is required' : null,
      target: (value) => !value ? 'Funding target is required' : null,
      duration: (value) => !value ? 'Campaign duration is required' : null,
      developmentStage: (value) => !value ? 'Development stage is required' : null,
      network: (value) => !value ? 'Network is required' : null,
    },
  });

  const nextStep = () => {
    if (form.validate().hasErrors) return;
    setActive((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // Helper function to convert File to data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      
      // Process the image file if it exists
      let imageData = '';
      if (values.image) {
        // Check if it's a File object or has a file property
        if (typeof values.image === 'object') {
          if ('name' in values.image && 'type' in values.image && 'size' in values.image) {
            // Looks like a File object
            imageData = await fileToDataUrl(values.image as unknown as File);
          } else if ('file' in values.image && values.image) {
            // Handle Mantine's FileInput value format
            imageData = await fileToDataUrl(values.image as File);
          }
        } else if (typeof values.image === 'string') {
          // If it's already a string (URL or data URL), use it directly
          imageData = values.image;
        }
      }
      
      // Mark the draft as completed
      const completeValues = {
        ...values,
        image: imageData,
        network: values.network as any,
        developmentStage: values.developmentStage as any,
        endsAt: values.endsAt as any,
        draftStatus: 'completed' as const,
        lastUpdated: new Date().toISOString()
      };
      
      // Save the final version
      await db.saveDraft(completeValues);
      
      // Here you would typically send the data to your backend or smart contract
      console.log(completeValues);
      
      notifications.show({
        title: 'Campaign Created',
        message: 'Your campaign has been successfully created!',
        color: 'green',
      });
      
      // Reset form and draft ID after successful submission
      form.reset();
      setDraftId(undefined);
    } catch (error) {
      console.error('Error submitting campaign:', error);
      notifications.show({
        title: 'Error',
        message: 'There was an error creating your campaign. Please try again.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to add a new contributor
  const addContributor = () => {
    form.insertListItem('contributors', { walletAddress: '', role: '', githubUsername: '' });
    form.setFieldValue('teamSize', form.values.contributors.length + 1);
    autoSave(form.values);
  };

  // Helper function to remove a contributor
  const removeContributor = (index: number) => {
    form.removeListItem('contributors', index);
    form.setFieldValue('teamSize', form.values.contributors.length - 1);
    autoSave(form.values);
  };

  // Helper function to add a new milestone
  const addMilestone = () => {
    form.insertListItem('milestones', { title: '', description: '', targetDate: '' });
    autoSave(form.values);
  };

  // Helper function to remove a milestone
  const removeMilestone = (index: number) => {
    form.removeListItem('milestones', index);
    autoSave(form.values);
  };
  
  // Setup auto-save on form changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.isDirty()) {
        autoSave(form.values);
      }
    }, 2000); // 2 second debounce
    
    return () => clearTimeout(timeout);
  }, [form.values]);

  const borderRadius = "md"

  return (
    <>
      <Helmet>
        <title>Create Campaign | StarkRaise</title>
      </Helmet>

      <Container size="lg" py="xl">
        <Paper
          shadow="lg"
          p="xl"
          radius="lg"
          style={(theme) => ({
            backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
            borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[2],
            borderWidth: 1,
            borderStyle: 'solid',
          })}
        >
          <Title order={2} mb="lg" ta="center">
            Create Your StarkRaise Campaign
          </Title>

          <Text c="dimmed" mb="xl" ta="center">
            Fill out the form below to create your fundraising campaign on StarkRaise.
            All fields marked with are required.
            {draftId && (
              <Text size="sm" mt="xs" c={autoSaveStatus === 'error' ? 'red' : 'green'}>
                {autoSaveStatus === 'saving' ? 'Saving draft...' : 
                 autoSaveStatus === 'error' ? 'Error saving draft' : 
                 'Draft auto-saved'}
              </Text>
            )}
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stepper
              active={active}
              onStepClick={setActive}
              // breakpoint="sm"
              color="blue"
              mb="xl"
              radius={"md"}
            >
              <Stepper.Step
                label="Basic Info"
                description="Campaign details"
                allowStepSelect={active > 0}
              >
                <Stack gap="md" mt="xl">
                  <TextInput
                    label="Creator Wallet Address"
                    placeholder="Enter your Starknet wallet address"
                    description="Your Starknet wallet address that will be associated with this campaign"
                    required
                    {...form.getInputProps('creator')}
                    radius={borderRadius}
                  />

                  <TextInput
                    label="Campaign Title"
                    placeholder="Enter a catchy title for your campaign"
                    description="Keep it concise and descriptive (max 60 characters)"
                    required
                    maxLength={60}
                    {...form.getInputProps('title')}
                    radius={borderRadius}
                  />

                  <Textarea
                    label="Short Description"
                    placeholder="Briefly describe your project in 1-2 sentences"
                    description="This will appear in campaign cards (max 200 characters)"
                    required
                    maxLength={200}
                    minRows={2}
                    {...form.getInputProps('description')}
                    radius={borderRadius}
                  />

                  <Textarea
                    label="Full Description"
                    placeholder="Provide a detailed description of your project, goals, and vision"
                    description="You can use markdown for formatting"
                    required
                    minRows={5}
                    {...form.getInputProps('fullDescription')}
                    radius={borderRadius}
                  />

                  <Select
                    label="Category"
                    placeholder="Select a category"
                    data={CATEGORIES}
                    required
                    searchable
                    {...form.getInputProps('category')}
                    radius={borderRadius}
                  />

                  <FileInput
                    label="Campaign Image"
                    placeholder="Upload your campaign banner or logo"
                    description="Recommended size: 1200x630px, max 5MB"
                    accept="image/png,image/jpeg,image/webp"
                    leftSection={<IconUpload size={em(24)} />}
                    required
                    {...form.getInputProps('image')}
                    radius={borderRadius}
                  />

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <TextInput
                        label="Funding Target"
                        placeholder="e.g., 10 ETH or 1000 STRK"
                        description="Amount you aim to raise"
                        required
                        {...form.getInputProps('target')}
                        radius={borderRadius}
                      />
                      
                      {/* Hidden token field - we're using ETH by default */}
                      <input type="hidden" {...form.getInputProps('token.name')} />
                      <input type="hidden" {...form.getInputProps('token.symbol')} />
                      <input type="hidden" {...form.getInputProps('token.decimals')} />
                      <input type="hidden" {...form.getInputProps('token.address')} />
                      <input type="hidden" {...form.getInputProps('token.icon')} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Campaign Duration"
                        placeholder="e.g., 30 days"
                        description="How long your campaign will run"
                        required
                        {...form.getInputProps('duration')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                  </Grid>

                  <DateInput
                    label="End Date"
                    placeholder="Select when your campaign will end"
                    description="If left blank, will be calculated based on duration"
                    valueFormat="YYYY-MM-DD"
                    minDate={new Date()}
                    clearable
                    {...form.getInputProps('endsAt')}
                    radius={borderRadius}
                  />
                </Stack>
              </Stepper.Step>

              <Stepper.Step
                label="Technical Details"
                description="Development info"
                allowStepSelect={active > 1}
              >
                <Stack gap="md" mt="xl">
                  <Select
                    label="Network"
                    placeholder="Select the Starknet network"
                    data={NETWORKS}
                    required
                    {...form.getInputProps('network')}
                    radius={borderRadius}
                  />

                  <TextInput
                    label="Contract Address"
                    placeholder="Enter your deployed contract address (if available)"
                    description="The Starknet contract address for your project"
                    {...form.getInputProps('contractAddress')}
                    radius={borderRadius}
                  />

                  <TextInput
                    label="Cairo Version"
                    placeholder="e.g., 2.0.0"
                    description="The Cairo version used in your project"
                    {...form.getInputProps('cairoVersion')}
                    radius={borderRadius}
                  />

                  <Select
                    label="Development Stage"
                    placeholder="Select your project's current stage"
                    data={DEVELOPMENT_STAGES}
                    required
                    {...form.getInputProps('developmentStage')}
                    radius={borderRadius}
                  />

                  <MultiSelect
                    label="Tech Stack"
                    placeholder="Select technologies used in your project"
                    data={TECH_STACK_OPTIONS}
                    searchable
                    {...form.getInputProps('techStack')}
                    radius={borderRadius}
                  />

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <TextInput
                        label="GitHub Repository"
                        placeholder="https://github.com/username/repo"
                        description="Link to your project's GitHub repository"
                        {...form.getInputProps('githubLink')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        label="License"
                        placeholder="Select your project's license"
                        data={LICENSE_OPTIONS}
                        searchable
                        clearable
                        {...form.getInputProps('license')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <TextInput
                        label="Demo Link"
                        placeholder="https://youtu.be/..."
                        description="Link to a demo video or prototype"
                        {...form.getInputProps('demoLink')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Live Project Link"
                        placeholder="https://your-dapp.com"
                        description="Link to your live dApp (if deployed)"
                        {...form.getInputProps('liveLink')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                  </Grid>

                  <MultiSelect
                    label="Tags"
                    placeholder="Add keywords for better discoverability"
                    description="Press Enter to add custom tags"
                    data={[
                      'zk-rollup', 'open-source', 'privacy', 'scaling', 'dao',
                      'defi', 'nft', 'gaming', 'social', 'identity'
                    ]}
                    searchable
                    {...form.getInputProps('tags')}
                    radius={borderRadius}
                  />
                </Stack>
              </Stepper.Step>

              <Stepper.Step
                label="Team & Milestones"
                description="Contributors & goals"
                allowStepSelect={active > 2}
              >
                <Stack gap="md" mt="xl">
                  <Box mb="md">
                    <Group justify="apart" mb="xs">
                      <Text fw={500}>Team Contributors</Text>
                      <Button
                        size="xs"
                        leftSection={<IconPlus size={16} />}
                        onClick={addContributor}
                        variant="light"
                      >
                        Add Contributor
                      </Button>
                    </Group>

                    {form.values.contributors.map((contributor, index) => (
                      <Paper
                        key={index}
                        p="md"
                        mb="sm"
                        withBorder
                        style={(theme) => ({
                          backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
                        })}
                      >
                        <Group justify="right" mb="xs">
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => removeContributor(index)}
                            disabled={form.values.contributors.length === 1}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>

                        <Grid gutter="md">
                          <Grid.Col span={{base: 12, md: 4}}>
                            <TextInput
                              label="Wallet Address"
                              placeholder="Starknet/Ethereum address"
                              {...form.getInputProps(`contributors.${index}.walletAddress`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                          <Grid.Col span={{base: 12, md: 4}}>
                            <TextInput
                              label="Role"
                              placeholder="e.g., Developer, Designer"
                              {...form.getInputProps(`contributors.${index}.role`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                          <Grid.Col span={{base: 12, md: 4}}>
                            <TextInput
                              label="GitHub Username"
                              placeholder="Optional"
                              {...form.getInputProps(`contributors.${index}.githubUsername`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>

                  <Divider my="lg" label="Project Milestones" />

                  <Box>
                    <Group justify="apart" mb="xs">
                      <Text fw={500}>Development Milestones</Text>
                      <Button
                        size="xs"
                        leftSection={<IconPlus size={16} />}
                        onClick={addMilestone}
                        variant="light"
                      >
                        Add Milestone
                      </Button>
                    </Group>

                    {form.values.milestones.map((milestone, index) => (
                      <Paper
                        key={index}
                        p="md"
                        mb="sm"
                        withBorder
                        style={(theme) => ({
                          backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
                        })}
                      >
                        <Group justify="right" mb="xs">
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => removeMilestone(index)}
                            disabled={form.values.milestones.length === 1}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>

                        <Grid gutter="md">
                          <Grid.Col span={{base: 12, md: 4}}>
                            <TextInput
                              label="Milestone Title"
                              placeholder="e.g., MVP Launch"
                              {...form.getInputProps(`milestones.${index}.title`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                          <Grid.Col span={{base: 12, md: 5}}>
                            <Textarea
                              label="Description"
                              placeholder="Details about this milestone"
                              minRows={2}
                              {...form.getInputProps(`milestones.${index}.description`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                          <Grid.Col span={{base: 12, md: 3}}>
                            <DateInput
                              label="Target Date"
                              placeholder="When?"
                              valueFormat="YYYY-MM-DD"
                              minDate={new Date()}
                              {...form.getInputProps(`milestones.${index}.targetDate`)}
                              radius={borderRadius}
                            />
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    ))}
                  </Box>

                  <Divider my="lg" label="Social Links" />

                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <TextInput
                        label="Twitter"
                        placeholder="https://twitter.com/username"
                        leftSection={<Text size="sm">𝕏</Text>}
                        {...form.getInputProps('socialLinks.twitter')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Discord"
                        placeholder="https://discord.gg/invite"
                        {...form.getInputProps('socialLinks.discord')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Telegram"
                        placeholder="https://t.me/groupname"
                        {...form.getInputProps('socialLinks.telegram')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Website"
                        placeholder="https://yourproject.com"
                        {...form.getInputProps('socialLinks.website')}
                        radius={borderRadius}
                      />
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Stepper.Step>

              <Stepper.Completed>
                <Stack gap="md" mt="xl" ta="center">
                  <Title order={3} ta="center" mb="md">
                    Review Your Campaign
                  </Title>

                  <Text ta="center" mb="xl">
                    Please review all the information you've provided before submitting your campaign.
                    Once submitted, your campaign will be reviewed by our team before going live.
                  </Text>

                  <Paper
                    p="md"
                    withBorder
                    style={(theme) => ({
                      backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
                      width: '100%',
                      maxWidth: 600,
                    })}
                  >
                    <Stack gap="xs">
                      <Group justify="apart">
                        <Text fw={500}>Title:</Text>
                        <Text>{form.values.title}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Category:</Text>
                        <Text>{form.values.category}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Target:</Text>
                        <Text>{form.values.target} {form.values.token.symbol}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Duration:</Text>
                        <Text>{form.values.duration}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Network:</Text>
                        <Text>{form.values.network}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Development Stage:</Text>
                        <Text>{form.values.developmentStage}</Text>
                      </Group>
                      <Group justify="apart">
                        <Text fw={500}>Team Size:</Text>
                        <Text>{form.values.contributors.length}</Text>
                      </Group>
                    </Stack>
                  </Paper>
                </Stack>
              </Stepper.Completed>
            </Stepper>

            <Group justify="apart" mt="xl">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}
                leftSection={<IconArrowLeft size={em(24)} />}
                radius="md"
                >
                  Back
                </Button>
              )}

              {active !== 3 ? (
                <Button onClick={nextStep} color="blue" radius="md" 
                rightSection={<IconArrowRight size={em(24)} />}
                variant='outline'
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  color="green" 
                  radius="md" 
                  rightSection={<IconArrowRight size={em(24)} />}
                  variant='light'
                  loading={isLoading}
                >
                  Submit Campaign
                </Button>
              )}
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateCampaign;