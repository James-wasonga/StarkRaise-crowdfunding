
interface IToken {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    icon: string;
}

interface IStarknetCampaign {
    // Core campaign details
    id?: string; // Optional unique identifier (e.g., UUID or MongoDB ObjectId)
    creator: string; // Wallet address (Starknet or Ethereum) of the project creator
    title: string; // Short project title (e.g., "Decentralized Voting dApp")
    description: string; // Brief summary (e.g., 100-200 characters)
    fullDescription: string; // Detailed markdown or HTML description of the project
    category: string; // Project category (e.g., "DeFi", "NFT", "Governance", "Tooling")
    image: string; // URL to project logo or banner
    target: string; // Funding goal (e.g., "10 ETH" or "1000 STRK")
    duration: string; // Campaign duration (e.g., "30 days" or ISO duration format like "P30D")
  
    // Starknet-specific details
    contractAddress?: string; // Starknet contract address for the project (if deployed)
    network: 'mainnet' | 'sepolia' | 'custom'; // Starknet network (e.g., mainnet, goerli)
    token: IToken;
    cairoVersion?: string; // Cairo version used (e.g., "2.0.0")
    isVerified?: boolean; // Whether the contract is verified on Starkscan or similar
  
    // Development details
    githubLink?: string; // URL to GitHub repository
    demoLink?: string; // URL to demo video or prototype (e.g., YouTube, Figma)
    liveLink?: string; // URL to live dApp (if deployed)
    developmentStage:
      | 'ideation'
      | 'prototype'
      | 'alpha'
      | 'beta'
      | 'mainnet'
      | 'completed'; // Stage of development
    techStack?: string[]; // Technologies used (e.g., ["Cairo", "React", "Starknet.js"])
  
    // Team and contributors
    contributors?: {
      walletAddress: string; // Starknet/Ethereum address
      role: string; // Role (e.g., "Developer", "Designer", "Advisor")
      githubUsername?: string; // Optional GitHub username
    }[]; // Array of contributors
    teamSize?: number; // Total number of team members
  
    // Campaign status and metadata
    status?: 'draft' | 'active' | 'funded' | 'failed' | 'completed'; // Campaign lifecycle status
    fundsRaised?: string; // Current funds raised (e.g., "2.5 ETH")
    backers?: number; // Number of unique backers
    createdAt?: string; // ISO timestamp (e.g., "2025-07-15T10:00:00Z")
    updatedAt?: string; // ISO timestamp
    endsAt?: string; // ISO timestamp for campaign end
  
    // Additional metadata
    tags?: string[]; // Keywords for searchability (e.g., ["zk-rollup", "open-source"])
    milestones?: {
      title: string; // Milestone title (e.g., "MVP Launch")
      description: string; // Milestone details
      targetDate: string; // ISO timestamp or date string
      completed?: boolean; // Whether milestone is achieved
    }[]; // Development milestones
    license?: string; // License type (e.g., "MIT", "GPL-3.0")
    socialLinks?: {
      twitter?: string;
      discord?: string;
      telegram?: string;
      website?: string;
    }; // Social media and project website links
}

export interface ICampaignCard {
  title: string;
  description: string;
  image: string;
  target: string;
  fundsRaised?: string;
  creator: string;
  contractAddress?: string;
  network: 'mainnet' | 'sepolia' | 'custom';
  developmentStage: 'ideation' | 'prototype' | 'alpha' | 'beta' | 'mainnet' | 'completed';
  daysLeft?: number; // Calculated field
  badgeText?: string; // Custom field for UI
}

export type { IStarknetCampaign };