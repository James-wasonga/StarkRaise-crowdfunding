import { IStarknetCampaign } from "../types";

// 5 dummy campaigns with realistic data
const campaigns: IStarknetCampaign[] = [
    {
        id: "1",
        creator: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        title: "StarkVault: Secure Multi-Sig Wallet for Starknet",
        description: "A secure, audited multi-signature wallet solution built specifically for Starknet with advanced recovery options and social guardians.",
        fullDescription: `# StarkVault: The Ultimate Multi-Sig Solution for Starknet

## Overview
StarkVault is a comprehensive multi-signature wallet solution designed specifically for the Starknet ecosystem. Our mission is to provide institutional-grade security with consumer-level usability.

## Key Features
- **Multi-signature security**: Require multiple approvals for transactions
- **Social recovery**: Designate trusted guardians who can help recover your wallet
- **Time-locked transactions**: Schedule transactions with optional time-locks
- **Spending limits**: Set daily/weekly/monthly limits for different signers
- **Contract interactions**: Seamlessly interact with any Starknet contract
- **Hardware wallet support**: Compatible with major hardware wallets

## Technical Implementation
StarkVault is built using Cairo 1.0 with a focus on gas optimization and security. Our contracts have undergone rigorous testing and auditing by leading security firms in the space.

## Roadmap
- **Q3 2025**: Beta release with core multi-sig functionality
- **Q4 2025**: Social recovery and advanced security features
- **Q1 2026**: Mobile app and hardware wallet integrations
- **Q2 2026**: Enterprise features and white-label solutions`,
        category: "defi",
        image: "https://picsum.photos/seed/starkvault/800/600",
        target: "50 ETH",
        duration: "60 days",
        token: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        },
        contractAddress: "0x04a7c2a2f0a189a88c413666f17d8ff4a7c2a2f0a189a88c413666f17d8ff4a",
        network: "mainnet",
        cairoVersion: "2.0.0",
        isVerified: true,
        githubLink: "https://github.com/starkvault/contracts",
        demoLink: "https://demo.starkvault.io",
        liveLink: "",
        developmentStage: "alpha",
        techStack: ["Cairo", "React", "TypeScript", "Starknet.js"],
        contributors: [
            {
                walletAddress: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
                role: "Lead Developer",
                githubUsername: "cairodev"
            },
            {
                walletAddress: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
                role: "Security Researcher",
                githubUsername: "starknet-security"
            },
            {
                walletAddress: "0x456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123",
                role: "UI/UX Designer",
                githubUsername: "starkdesigner"
            }
        ],
        teamSize: 3,
        tags: ["wallet", "security", "multi-sig", "defi"],
        license: "MIT",
        socialLinks: {
            twitter: "https://twitter.com/starkvault",
            discord: "https://discord.gg/starkvault",
            telegram: "https://t.me/starkvault",
            website: "https://starkvault.io"
        },
        milestones: [
            {
                title: "Smart Contract Development",
                description: "Complete development and testing of core multi-sig contracts",
                targetDate: "2025-09-15"
            },
            {
                title: "Security Audit",
                description: "Complete third-party security audit of all contracts",
                targetDate: "2025-10-30"
            },
            {
                title: "Beta Launch",
                description: "Launch beta version with core functionality",
                targetDate: "2025-12-01"
            }
        ],
        endsAt: "2025-09-15",
        createdAt: "2025-07-15",
        updatedAt: "2025-07-15"
    },
    {
        id: "2",
        creator: "0x789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456",
        title: "StarkOracle: Decentralized Price Feeds for Starknet",
        description: "A robust, decentralized oracle network providing reliable price feeds and real-world data to Starknet dApps.",
        fullDescription: `# StarkOracle: Decentralized Price Feeds for Starknet

## The Problem
Reliable price feeds and real-world data are critical infrastructure for DeFi applications. Currently, Starknet lacks a truly decentralized, robust oracle solution built specifically for its unique architecture.

## Our Solution
StarkOracle is a purpose-built oracle network for Starknet that provides:

- **High-frequency price updates**: Sub-minute price updates for major trading pairs
- **Decentralized node network**: 15+ independent node operators at launch
- **Cryptographic guarantees**: Threshold signatures ensure data integrity
- **Low gas costs**: Optimized for Starknet's unique fee structure
- **Extensive data coverage**: Crypto, forex, commodities, and stocks

## Technical Architecture
StarkOracle uses a network of validators who stake STRK tokens as collateral. These validators collect data from multiple sources, reach consensus off-chain, and submit aggregated signed data to Starknet.

Our unique threshold signature scheme ensures that a minimum number of validators must agree on data before it's accepted on-chain, preventing manipulation by a small group of malicious actors.

## Token Economics
The ORACLE token will govern the protocol and incentivize node operators. Data consumers pay fees in ORACLE tokens, which are distributed to node operators based on their stake and performance.

## Team
Our team combines expertise in Starknet development, distributed systems, and cryptography, with members previously working at leading oracle projects and Starknet core development.`,
        category: "infrastructure",
        image: "https://picsum.photos/seed/starkoracle/800/600",
        target: "75 ETH",
        duration: "45 days",
        token: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        },
        contractAddress: "0x789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456",
        network: "mainnet",
        cairoVersion: "2.1.0",
        isVerified: true,
        githubLink: "https://github.com/starkoracle/protocol",
        demoLink: "https://demo.starkoracle.network",
        liveLink: "",
        developmentStage: "beta",
        techStack: ["Cairo", "Rust", "TypeScript", "Go"],
        contributors: [
            {
                walletAddress: "0x789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456",
                role: "Protocol Lead",
                githubUsername: "oracledev"
            },
            {
                walletAddress: "0xdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc",
                role: "Cryptography Researcher",
                githubUsername: "cryptomath"
            },
            {
                walletAddress: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
                role: "Node Infrastructure",
                githubUsername: "nodeguru"
            },
            {
                walletAddress: "0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234",
                role: "Smart Contract Developer",
                githubUsername: "cairomaster"
            }
        ],
        teamSize: 4,
        tags: ["oracle", "defi", "infrastructure", "data"],
        license: "Apache-2.0",
        socialLinks: {
            twitter: "https://twitter.com/starkoracle",
            discord: "https://discord.gg/starkoracle",
            telegram: "https://t.me/starkoracle",
            website: "https://starkoracle.network"
        },
        milestones: [
            {
                title: "Testnet Launch",
                description: "Deploy oracle network on Starknet testnet with 5 initial data feeds",
                targetDate: "2025-08-30"
            },
            {
                title: "Security Audit",
                description: "Complete comprehensive security audit with two independent firms",
                targetDate: "2025-10-15"
            },
            {
                title: "Mainnet Launch",
                description: "Full mainnet deployment with 15+ node operators and 20+ price feeds",
                targetDate: "2025-11-30"
            }
        ],
        endsAt: "2025-08-30",
        createdAt: "2025-07-10",
        updatedAt: "2025-07-14"
    },
    {
        id: "3",
        creator: "0xdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc",
        title: "StarkSwap: Zero-Knowledge AMM",
        description: "A next-generation AMM leveraging zero-knowledge proofs for enhanced privacy and capital efficiency on Starknet.",
        fullDescription: `# StarkSwap: The Next Evolution in AMM Design

## Introduction
StarkSwap is a revolutionary automated market maker (AMM) built natively for Starknet, leveraging zero-knowledge proofs to create a more efficient, private, and capital-efficient trading experience.

## Key Innovations

### Concentrated Liquidity with Privacy
StarkSwap combines concentrated liquidity (similar to Uniswap v3) with zero-knowledge privacy features. Liquidity providers can focus their capital in specific price ranges while keeping their strategies private from competitors.

### MEV Protection
Our unique order flow design uses ZK proofs to prevent miners and validators from extracting value through front-running and sandwich attacks, saving traders millions in potential lost value.

### Dynamic Fees
StarkSwap implements an adaptive fee structure that responds to market volatility and liquidity conditions, optimizing for both trader costs and liquidity provider returns.

### Capital Efficiency
Liquidity providers can achieve up to 4000x capital efficiency compared to traditional AMMs, significantly improving returns on deployed capital.

## Technical Architecture
StarkSwap is built entirely in Cairo 2.0, taking full advantage of Starknet's native zero-knowledge capabilities. Our core contracts implement:

- Non-custodial limit orders with privacy preservation
- Just-in-time liquidity provision
- Cross-pool flash swaps
- Gasless trading via account abstraction

## Tokenomics
The SSWAP token will govern the protocol with the following utility:
- Fee sharing for stakers
- Governance rights
- Liquidity mining incentives
- Protocol insurance fund contributions

## Roadmap
- **Q3 2025**: Testnet launch with core swap functionality
- **Q4 2025**: Mainnet launch with initial trading pairs
- **Q1 2026**: Advanced features including cross-margin trading
- **Q2 2026**: Cross-L2 bridged liquidity pools`,
        category: "defi",
        image: "https://picsum.photos/seed/starkswap/800/600",
        target: "120 ETH",
        duration: "60 days",
        token: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        },
        contractAddress: "0xdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc",
        network: "sepolia",
        cairoVersion: "2.0.0",
        isVerified: true,
        githubLink: "https://github.com/starkswap/core",
        demoLink: "https://testnet.starkswap.fi",
        liveLink: "",
        developmentStage: "prototype",
        techStack: ["Cairo", "TypeScript", "React", "Starknet.js"],
        contributors: [
            {
                walletAddress: "0xdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc",
                role: "Protocol Architect",
                githubUsername: "zk-amm-dev"
            },
            {
                walletAddress: "0x3456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012",
                role: "Cairo Developer",
                githubUsername: "cairo-wizard"
            },
            {
                walletAddress: "0x6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
                role: "Frontend Lead",
                githubUsername: "defi-ui-expert"
            },
            {
                walletAddress: "0x9abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
                role: "Tokenomics Researcher",
                githubUsername: "token-scientist"
            },
            {
                walletAddress: "0xcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789ab",
                role: "Security Engineer",
                githubUsername: "zk-security"
            }
        ],
        teamSize: 5,
        tags: ["defi", "amm", "dex", "privacy", "zk"],
        license: "GPL-3.0",
        socialLinks: {
            twitter: "https://twitter.com/starkswap",
            discord: "https://discord.gg/starkswap",
            telegram: "https://t.me/starkswap_community",
            website: "https://starkswap.fi"
        },
        milestones: [
            {
                title: "Core Protocol Development",
                description: "Complete development of core swap and liquidity provision contracts",
                targetDate: "2025-09-30"
            },
            {
                title: "Security Audit & Testing",
                description: "Complete comprehensive security audits and extensive testing",
                targetDate: "2025-11-15"
            },
            {
                title: "Testnet Launch",
                description: "Public testnet launch with incentivized testing program",
                targetDate: "2025-12-20"
            },
            {
                title: "Mainnet Launch",
                description: "Full production launch on Starknet mainnet",
                targetDate: "2026-02-15"
            }
        ],
        endsAt: "2025-09-15",
        createdAt: "2025-07-01",
        updatedAt: "2025-07-15"
    },
    {
        id: "4",
        creator: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
        title: "StarkID: Decentralized Identity Protocol",
        description: "A privacy-preserving, self-sovereign identity solution built natively on Starknet with zero-knowledge credential verification.",
        fullDescription: `# StarkID: Self-Sovereign Identity for Web3

## Vision
StarkID aims to become the standard for decentralized identity on Starknet and beyond, enabling users to control their personal data while providing verifiable credentials to services that require them.

## The Problem
Today's digital identity systems suffer from three major problems:
1. **Centralized control**: Identity providers have excessive power over user data
2. **Privacy leakage**: Services often collect more data than necessary
3. **Poor user experience**: Managing identities across services is cumbersome

## Our Solution
StarkID leverages Starknet's zero-knowledge capabilities to create a truly self-sovereign identity system where:

- Users fully own and control their identity data
- Credentials can be selectively disclosed (prove you're over 18 without revealing your birthdate)
- Verification happens on-chain with cryptographic guarantees
- No central authority can revoke or control your identity

## Technical Architecture

StarkID consists of three core components:

1. **Identity Registry**: A smart contract system for registering and managing identity attestations
2. **Credential Verifier**: ZK circuits for creating and verifying credential proofs
3. **Integration SDK**: Tools for dApps to easily integrate StarkID verification

Our implementation uses recursive SNARKs to enable complex credential verification with minimal on-chain footprint, making verification both private and gas-efficient.

## Use Cases

- **KYC/AML compliance** without revealing personal information
- **Sybil-resistant governance** for DAOs and protocols
- **Age verification** for age-restricted content
- **Credit scoring** without revealing financial history
- **Professional credentials** for decentralized labor markets

## Roadmap

- **Q3 2025**: Core protocol development and testnet deployment
- **Q4 2025**: Initial mainnet launch with basic credential types
- **Q1 2026**: SDK release and integration with major Starknet dApps
- **Q2 2026**: Cross-chain identity bridging to Ethereum L1 and other L2s`,
        category: "identity",
        image: "https://picsum.photos/seed/starkid/800/600",
        target: "90 ETH",
        duration: "45 days",
        token: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        },
        contractAddress: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
        network: "sepolia",
        cairoVersion: "2.1.0",
        isVerified: true,
        githubLink: "https://github.com/starkid/protocol",
        demoLink: "https://demo.starkid.xyz",
        liveLink: "",
        developmentStage: "alpha",
        techStack: ["Cairo", "TypeScript", "ZK-SNARKs", "React"],
        contributors: [
            {
                walletAddress: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
                role: "Founder & ZK Researcher",
                githubUsername: "zk-identity"
            },
            {
                walletAddress: "0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234",
                role: "Cairo Developer",
                githubUsername: "cairo-expert"
            },
            {
                walletAddress: "0x89abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567",
                role: "Cryptography Specialist",
                githubUsername: "crypto-math"
            }
        ],
        teamSize: 3,
        tags: ["identity", "privacy", "zk", "credentials", "ssi"],
        license: "MIT",
        socialLinks: {
            twitter: "https://twitter.com/starkid_xyz",
            discord: "https://discord.gg/starkid",
            telegram: "https://t.me/starkid_community",
            website: "https://starkid.xyz"
        },
        milestones: [
            {
                title: "Protocol Specification",
                description: "Complete technical specification and architecture documentation",
                targetDate: "2025-08-30"
            },
            {
                title: "Proof of Concept",
                description: "Develop working proof of concept with basic credential verification",
                targetDate: "2025-10-15"
            },
            {
                title: "Testnet Deployment",
                description: "Deploy initial version to Starknet testnet with developer documentation",
                targetDate: "2025-12-01"
            }
        ],
        endsAt: "2025-08-30",
        createdAt: "2025-07-05",
        updatedAt: "2025-07-12"
    },
    {
        id: "5",
        creator: "0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234",
        title: "StarkDAO: Governance Framework for Starknet Projects",
        description: "A comprehensive, modular DAO governance framework designed specifically for Starknet projects with advanced voting mechanisms and proposal execution.",
        fullDescription: `# StarkDAO: Next-Generation Governance for Starknet

## Overview
StarkDAO is a complete governance framework built natively for Starknet, designed to enable efficient, secure, and flexible decentralized governance for projects in the ecosystem.

## Key Features

### Modular Architecture
StarkDAO is built with a modular design that allows projects to mix and match governance components based on their specific needs:

- **Voting Modules**: From simple token voting to quadratic, conviction, and delegation systems
- **Proposal Engines**: Different formats for creating, discussing, and refining proposals
- **Execution Frameworks**: Various methods for executing approved proposals
- **Treasury Management**: Options for managing and allocating community funds

### Advanced Voting Mechanisms

- **Quadratic Voting**: Square root of tokens to balance whale influence
- **Conviction Voting**: Continuous voting with time-weighted support
- **Holographic Consensus**: Prediction markets to surface valuable proposals
- **Delegated Voting**: Liquid democracy with specialized delegates
- **Reputation-Based Systems**: Voting power based on contributions

### Optimized for Starknet

- **Gas-Efficient**: Designed specifically for Starknet's fee model
- **ZK-Privacy Options**: Private voting using zero-knowledge proofs
- **Account Abstraction**: Gasless voting and batch proposals
- **Cross-DAO Coordination**: Tools for DAOs to collaborate with each other

### User Experience

- **Intuitive Interface**: Simple governance dashboard for all user types
- **Mobile Support**: Responsive design works across all devices
- **Notification System**: Stay updated on proposals and voting
- **Analytics Dashboard**: Comprehensive governance metrics and insights

## Technical Implementation
StarkDAO is implemented in Cairo 2.0 with a focus on security, composability, and gas efficiency. The core contracts have been designed with upgradeability in mind, allowing DAOs to evolve their governance systems over time.

## Use Cases

- **Protocol Governance**: Manage parameters and upgrades for DeFi protocols
- **Grant Programs**: Distribute funding to ecosystem projects
- **Product DAOs**: Coordinate development of decentralized products
- **Investment DAOs**: Collectively manage investment portfolios
- **Social DAOs**: Coordinate communities around shared interests

## Roadmap

- **Q3 2025**: Core framework development and initial modules
- **Q4 2025**: Testnet deployment and security audits
- **Q1 2026**: Mainnet launch with initial partner DAOs
- **Q2 2026**: Advanced modules and cross-chain governance`,
        category: "dao",
        image: "https://picsum.photos/seed/starkdao/800/600",
        target: "80 ETH",
        duration: "30 days",
        token: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
            address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
        },
        contractAddress: "0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234",
        network: "mainnet",
        cairoVersion: "2.0.0",
        isVerified: true,
        githubLink: "https://github.com/starkdao/governance",
        demoLink: "https://demo.starkdao.org",
        liveLink: "",
        developmentStage: "beta",
        techStack: ["Cairo", "TypeScript", "React", "The Graph"],
        contributors: [
            {
                walletAddress: "0x56789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234",
                role: "Lead Developer",
                githubUsername: "dao-builder"
            },
            {
                walletAddress: "0x89abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567",
                role: "Governance Researcher",
                githubUsername: "governance-scientist"
            },
            {
                walletAddress: "0xbcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789a",
                role: "Frontend Developer",
                githubUsername: "dao-ui-dev"
            },
            {
                walletAddress: "0xef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd",
                role: "Community Manager",
                githubUsername: "dao-community"
            }
        ],
        teamSize: 4,
        tags: ["dao", "governance", "voting", "treasury"],
        license: "AGPL-3.0",
        socialLinks: {
            twitter: "https://twitter.com/starkdao",
            discord: "https://discord.gg/starkdao",
            telegram: "https://t.me/starkdao_community",
            website: "https://starkdao.org"
        },
        milestones: [
            {
                title: "Core Modules Development",
                description: "Complete development of core voting and proposal modules",
                targetDate: "2025-09-15"
            },
            {
                title: "UI Development & Testing",
                description: "Complete governance dashboard and testing framework",
                targetDate: "2025-10-30"
            },
            {
                title: "Security Audit",
                description: "Complete comprehensive security audit of all contracts",
                targetDate: "2025-11-30"
            },
            {
                title: "Mainnet Launch",
                description: "Launch on Starknet mainnet with initial partner DAOs",
                targetDate: "2025-12-15"
            }
        ],
        endsAt: "2025-08-15",
        createdAt: "2025-07-15",
        updatedAt: "2025-07-15"
    }
];

export default campaigns;