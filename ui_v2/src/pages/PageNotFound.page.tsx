import { Box, Button, Container, Group, rgba, Text, Title, useMantineColorScheme } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageNotFound = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const glitchVariants = {
    animate: {
      textShadow: [
        '2px 2px 0 #00ff88, -2px -2px 0 #ff00cc',
        '-2px 2px 0 #00ccff, 2px -2px 0 #ffaa00',
        '2px -2px 0 #00ff88, -2px 2px 0 #ff00cc',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [0.95, 1, 0.95],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container
      size="xl"
      px="md"
      py="xl"
      style={(theme) => ({
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: isDark
        //   ? linearGradient(180, theme.colors.dark[8], theme.colors.dark[9])
        //   : theme.fn.linearGradient(180, theme.colors.gray[0], theme.colors.gray[2]),
      })}
      aria-label="Page Not Found"
    >
      <AnimatePresence>
        {mounted && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              width: '100%',
              maxWidth: 600,
            }}
          >
            {/* Decorative Glow Elements */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #00ff88, #00ccff)',
                filter: 'blur(30px)',
                zIndex: -1,
              }}
              variants={glowVariants as any}
              animate="animate"
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '-15%',
                right: '-15%',
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ff00cc, #ffaa00)',
                filter: 'blur(40px)',
                zIndex: -1,
              }}
              variants={glowVariants as any}
              animate="animate"
            />

            {/* 404 Text */}
            <motion.div variants={itemVariants as any}>
              <Title
                order={1}
                style={(theme) => ({
                  fontSize: '10rem',
                  fontWeight: 900,
                  background: 'linear-gradient(45deg, #00ff88, #00ccff, #ff00cc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 8px ${isDark ? 'rgba(0, 255, 136, 0.5)' : 'rgba(0, 0, 0, 0.15)'}`,
                  // [theme.fn.smallerThan('sm')]: {
                  //   fontSize: '6rem',
                  // },
                })}
              >
                <motion.span variants={glitchVariants as any} animate="animate">
                  404
                </motion.span>
              </Title>
            </motion.div>

            {/* StarkRaise Logo */}
            <motion.div variants={itemVariants as any}>
              <motion.div variants={floatVariants as any} animate="animate">
                <Title
                  order={2}
                  mb="md"
                  style={{ fontWeight: 700 }}
                >
                  <Text span c="yellow" inherit>
                    Stark
                  </Text>
                  <Text span c="blue" inherit>
                    Raise
                  </Text>
                </Title>
              </motion.div>
            </motion.div>

            {/* Page Not Found Title */}
            <motion.div variants={itemVariants as any}>
              <Title
                order={3}
                mb="sm"
                style={(theme) => ({
                  color: isDark ? theme.colors.gray[2] : theme.colors.dark[8],
                  fontWeight: 600,
                })}
              >
                Page Not Found
              </Title>
            </motion.div>

            {/* Description */} 
            <motion.div variants={itemVariants as any}>
              <Text
                size="lg"
                c="dimmed"
                mb="xl"
                maw={500}
                style={(theme) => ({
                  color: isDark ? theme.colors.gray[4] : theme.colors.gray[6],
                })}
              >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                Let's get you back on track.
              </Text>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants as any}>
              <Group justify="center">
                <Button
                  component={Link}
                  to="/"
                  size="md"
                  leftSection={<IconHome size={20} />}
                  variant="gradient"
                  gradient={{ from: '#00ff88', to: '#00ccff', deg: 45 }}
                  radius="xl"
                  style={(theme) => ({
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: 600,
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      inset: -2,
                      background: 'linear-gradient(45deg, #00ff88, #00ccff, #ff00cc, #ffaa00, #00ff88)',
                      backgroundSize: '300% 300%',
                      borderRadius: theme.radius.xl,
                      zIndex: -1,
                      animation: 'gradientShift 3s ease infinite',
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      inset: 2,
                      background: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
                      borderRadius: theme.radius.xl,
                      zIndex: -1,
                    },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${rgba(theme.black, 0.3)}`,
                    },
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  })}
                  styles={{
                    root: {
                      '@keyframes gradientShift': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' },
                      },
                    },
                  }}
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  size="md"
                  leftSection={<IconArrowLeft size={20} />}
                  variant="outline"
                  color="blue"
                  radius="xl"
                  style={(theme) => ({
                    borderColor: isDark ? theme.colors.blue[4] : theme.colors.blue[6],
                    color: isDark ? theme.colors.blue[3] : theme.colors.blue[7],
                    '&:hover': {
                      backgroundColor: isDark
                        ? rgba(theme.colors.blue[4], 0.1)
                        : rgba(theme.colors.blue[6], 0.1),
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${rgba(theme.black, 0.3)}`,
                    },
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  })}
                >
                  Go Back
                </Button>
              </Group>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default PageNotFound;