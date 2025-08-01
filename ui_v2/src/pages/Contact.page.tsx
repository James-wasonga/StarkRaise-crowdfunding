import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Title,
  Text,
  Paper,
  Grid,
  Button,
  Group,
  TextInput,
  Textarea,
  Select,
  ThemeIcon,
  SimpleGrid,
  Card,
  Divider,
  useMantineColorScheme,
  Notification,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandTwitter,
  IconBrandDiscord,
  IconBrandGithub,
  IconCheck,
  IconSend,
  IconQuestionMark,
  IconBug,
  IconBuildingCommunity,
  IconBriefcase,
} from '@tabler/icons-react';

const ContactPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      subject: (value) => (value.trim().length < 3 ? 'Subject must be at least 3 characters' : null),
      category: (value) => (!value ? 'Please select a category' : null),
      message: (value) => (value.trim().length < 10 ? 'Message must be at least 10 characters' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', values);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      title: 'Email',
      value: 'contact@starkraise.io',
      icon: <IconMail size={24} />,
      color: 'blue',
    },
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
      icon: <IconPhone size={24} />,
      color: 'green',
    },
    {
      title: 'Address',
      value: '123 Blockchain Avenue, Suite 456, San Francisco, CA 94105',
      icon: <IconMapPin size={24} />,
      color: 'orange',
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/starkraise',
      icon: <IconBrandTwitter size={24} />,
      color: 'blue',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/starkraise',
      icon: <IconBrandDiscord size={24} />,
      color: 'indigo',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/starkraise',
      icon: <IconBrandGithub size={24} />,
      color: 'dark',
    },
  ];

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'press', label: 'Press Inquiry' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | StarkRaise</title>
      </Helmet>

      <Container size="xl" py="xl">
        <Grid mb={50}>
          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Title order={1} mb="md">Get in Touch</Title>
            <Text size="lg" mb="xl">
              Have questions about StarkRaise? Want to partner with us? Or just want to say hello?
              We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </Text>
            <SimpleGrid cols={{lg: 3, md: 2, sm: 1}}>
              {contactInfo.map((item, index) => (
                <Card key={index} p="md" radius="md" withBorder>
                  <Group mb="xs">
                    <ThemeIcon size={40} radius="md" color={item.color}>
                      {item.icon}
                    </ThemeIcon>
                    <Text fw={700}>{item.title}</Text>
                  </Group>
                  <Text size="sm">{item.value}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="xl" radius="md" withBorder>
              {submitted ? (
                <Notification
                  icon={<IconCheck size={20} />}
                  color="green"
                  title="Message Sent!"
                  withCloseButton={false}
                  mb="md"
                >
                  Thank you for reaching out. We'll get back to you shortly.
                </Notification>
              ) : null}
              
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={3} mb="md">Send Us a Message</Title>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Your Name"
                      placeholder="John Doe"
                      required
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="john@example.com"
                      required
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Subject"
                      placeholder="How can we help?"
                      required
                      {...form.getInputProps('subject')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Category"
                      placeholder="Select a category"
                      data={supportCategories}
                      required
                      {...form.getInputProps('category')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Textarea
                      label="Message"
                      placeholder="Please describe your inquiry in detail..."
                      minRows={5}
                      required
                      {...form.getInputProps('message')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button 
                      type="submit" 
                      fullWidth 
                      leftSection={<IconSend size={16} />}
                    >
                      Send Message
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>

        <Divider my="xl" label="Connect With Us" labelPosition="center" />

        <SimpleGrid cols={{lg: 3, md: 2, sm: 1}} spacing="lg">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              leftSection={link.icon}
              variant="light"
              color={link.color}
              size="lg"
              fullWidth
            >
              Follow us on {link.name}
            </Button>
          ))}
        </SimpleGrid>

        <Title order={2} mb="xl" ta="center">How Can We Help You?</Title>
        <SimpleGrid cols={{lg: 4, md: 2, sm: 1}} spacing="lg" mb={50}>
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="blue">
              <IconQuestionMark size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">General Support</Title>
            <Text mb="md">
              Have questions about how to use StarkRaise or need help with your account?
            </Text>
            <Button variant="light" color="blue" fullWidth>
              Visit Help Center
            </Button>
          </Card>
          
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="red">
              <IconBug size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Report an Issue</Title>
            <Text mb="md">
              Found a bug or experiencing technical difficulties with the platform?
            </Text>
            <Button variant="light" color="red" fullWidth>
              Submit Bug Report
            </Button>
          </Card>
          
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="green">
              <IconBuildingCommunity size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Community</Title>
            <Text mb="md">
              Join our community to connect with other creators and backers.
            </Text>
            <Button variant="light" color="green" fullWidth>
              Join Community
            </Button>
          </Card>
          
          <Card p="xl" radius="md" withBorder>
            <ThemeIcon size={50} radius="md" mb="md" color="orange">
              <IconBriefcase size={26} />
            </ThemeIcon>
            <Title order={3} mb="sm">Business Inquiries</Title>
            <Text mb="md">
              Interested in partnering with StarkRaise or exploring business opportunities?
            </Text>
            <Button variant="light" color="orange" fullWidth>
              Contact Business Team
            </Button>
          </Card>
        </SimpleGrid>

        <Paper p="xl" radius="md" withBorder style={{ 
          background: isDark 
            ? 'linear-gradient(45deg, var(--mantine-color-dark-6) 0%, var(--mantine-color-dark-8) 100%)' 
            : 'linear-gradient(45deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-blue-1) 100%)'
        }}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} mb="sm">Frequently Asked Questions</Title>
              <Text mb="lg">
                Can't find what you're looking for? Check out our comprehensive FAQ section for answers to common questions.
              </Text>
              <Button component="a" href="/faqs" variant="filled" color="blue">
                View FAQs
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ThemeIcon size={120} radius={120} color="blue" variant="light">
                <IconQuestionMark size={60} />
              </ThemeIcon>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ContactPage;
