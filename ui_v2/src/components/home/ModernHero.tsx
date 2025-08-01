import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Title,
  Text,
  Button,
  Group,
  useMantineTheme,
  useMantineColorScheme,
  rem,
  useStyles
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { motion } from 'framer-motion';

interface ModernHeroProps {
  onExplore?: () => void;
  onLearnMore?: () => void;
}

// Animation variants for Framer Motion
const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseAnimation = {
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [0.95, 1, 0.95],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const shimmerAnimation = {
  animate: {
    backgroundPosition: ['-200% 0', '200% 0'],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export function ModernHero({ onExplore, onLearnMore }: ModernHeroProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { width } = useViewportSize();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for mouse position to create interactive effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for interactive effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  // Generate orb positions
  const orbs = [
    {
      size: width > 768 ? 300 : 200,
      top: '10%',
      left: '15%',
      background: isDark 
        ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.1) 70%)'
        : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.05) 70%)',
    },
    {
      size: width > 768 ? 250 : 150,
      top: '60%',
      right: '10%',
      background: isDark 
        ? 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.1) 70%)'
        : 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.05) 70%)',
    },
    {
      size: width > 768 ? 200 : 120,
      bottom: '15%',
      left: '25%',
      background: isDark 
        ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.1) 70%)'
        : 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 70%)',
    },
  ];
  
  // Generate floating shapes
  const shapes = [
    {
      type: 'circle',
      size: width > 768 ? 60 : 40,
      top: '15%',
      right: '20%',
      background: isDark ? theme.colors.blue[6] : theme.colors.blue[4],
      delay: 0,
    },
    {
      type: 'square',
      size: width > 768 ? 40 : 30,
      bottom: '25%',
      right: '30%',
      background: isDark ? theme.colors.yellow[6] : theme.colors.yellow[4],
      delay: 2,
    },
    {
      type: 'triangle',
      size: width > 768 ? 50 : 35,
      top: '60%',
      left: '15%',
      color: isDark ? theme.colors.pink[6] : theme.colors.pink[4],
      delay: 1,
    },
  ];
  
  // Effect to move orbs slightly based on mouse position
  useEffect(() => {
    if (!containerRef.current) return;
    
    const orbElements = containerRef.current.querySelectorAll('.glow-orb');
    const rect = containerRef.current.getBoundingClientRect();
    
    orbElements.forEach((orb, i) => {
      const orbElement = orb as HTMLElement;
      const moveX = (mousePosition.x - rect.width / 2) / (i + 10) * 0.5;
      const moveY = (mousePosition.y - rect.height / 2) / (i + 10) * 0.5;
      
      orbElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }, [mousePosition]);
  
  // Calculate rotation based on mouse position
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleMouseMoveWithRotation = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Handle the existing mouse move logic
    handleMouseMove(e);
    
    // Add subtle rotation effect
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (very subtle - only 1 degree max)
    const rotateY = ((mouseX - centerX) / centerX) * 0.5;
    const rotateX = ((centerY - mouseY) / centerY) * 0.5;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  return (
    <motion.div 
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: rem(600),
        borderRadius: theme.radius.lg,
        padding: `${rem(60)} ${rem(40)}`,
        marginTop: rem(16),
        marginBottom: rem(48),
        isolation: 'isolate',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? theme.colors.dark[8] : theme.white,
        boxShadow: isDark 
          ? '0 30px 60px rgba(0,0,0,0.4), 0 0 80px rgba(0,0,0,0.1) inset'
          : '0 30px 60px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.05) inset',
        border: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
        mass: 0.8
      }}
      onMouseMove={handleMouseMoveWithRotation}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
    >
      {/* Main grid pattern with perspective effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          right: -100,
          bottom: -100,
          backgroundImage: isDark 
            ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.07) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1.5px, transparent 1.5px)',
          backgroundSize: '80px 80px', // Larger tiles (80px)
          zIndex: 1,
          transform: 'perspective(1000px) rotateX(5deg)',
          transformOrigin: 'center center',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Secondary grid pattern (creates a nested effect) */}
      <Box style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: isDark 
          ? 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
          : 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px', // Smaller tiles (20px) for the nested grid
        zIndex: 1,
      }} />
      
      {/* Glowing orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="glow-orb"
          variants={pulseAnimation as any}
          animate="animate"
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.6,
            zIndex: 1,
            width: rem(orb.size),
            height: rem(orb.size),
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: orb.background,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
      
      {/* Floating shapes */}
      {shapes.map((shape, i) => {
        if (shape.type === 'triangle') {
          return (
            <motion.div
              key={`shape-${i}`}
              variants={floatAnimation as any}
              animate="animate"
              style={{
                position: 'absolute',
                zIndex: 2,
                opacity: 0.7,
                top: shape.top,
                left: shape.left,
                right: shape.right,
                bottom: shape.bottom,
                width: 0,
                height: 0,
                borderLeft: `${rem(shape.size / 2)} solid transparent`,
                borderRight: `${rem(shape.size / 2)} solid transparent`,
                borderBottom: `${rem(shape.size)} solid ${shape.color}`,
              }}
              transition={{ delay: shape.delay }}
            />
          );
        }
        
        return (
          <motion.div
            key={`shape-${i}`}
            variants={floatAnimation as any}
            animate="animate"
            style={{
              position: 'absolute',
              zIndex: 2,
              opacity: 0.7,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              width: rem(shape.size),
              height: rem(shape.size),
              background: shape.background,
              borderRadius: shape.type === 'circle' ? '50%' : '4px',
            }}
            transition={{ delay: shape.delay }}
          />
        );
      })}
      
      {/* Content */}
      <Box style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: rem(900),
        width: '100%',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            style={{
              fontSize: width > 768 ? rem(60) : width > 576 ? rem(42) : rem(32),
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              padding: 0,
              color: isDark ? theme.white : theme.black,
            }}
          >
            Fund the Future with{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'orange', deg: 45 }}
              inherit
            >
              Stark
            </Text>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
              inherit
            >
              Raise
            </Text>
          </Title>
          
          <Text 
            style={{
              fontSize: width > 576 ? rem(24) : rem(18),
              marginTop: theme.spacing.lg,
              marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
              color: isDark ? theme.colors.dark[0] : theme.colors.gray[7],
            }}
          >
            The premier crowdfunding platform for blockchain projects on StarkNet
          </Text>
          
          <Group justify="center">
            <motion.div
              whileHover={{ y: -3, boxShadow: '0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Button
                size="xl"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                onClick={onExplore}
                px={36}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Explore Projects
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -3, opacity: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Button
                size="xl"
                radius="xl"
                variant="outline"
                color={isDark ? 'gray.5' : 'dark'}
                onClick={onLearnMore}
                px={36}
              >
                Learn More
              </Button>
            </motion.div>
          </Group>
        </motion.div>
      </Box>
    </motion.div>
  );
}
