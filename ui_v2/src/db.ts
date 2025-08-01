// db.ts - StarkRaise Campaign Database
import Dexie, { type Table } from 'dexie';
import { IStarknetCampaign } from './types';
import { useLiveQuery } from 'dexie-react-hooks';

// Campaign draft interface for database storage
// export interface CampaignDraft {
//   id?: number; // Auto-incremented primary key for Dexie
//   creator: string;
//   title: string;
//   description: string;
//   fullDescription: string;
//   category: string;
//   image: string | null;
//   target: string;
//   duration: string;
//   contractAddress?: string;
//   network: 'mainnet' | 'testnet' | 'custom';
//   cairoVersion?: string;
//   isVerified: boolean;
//   githubLink?: string;
//   demoLink?: string;
//   liveLink?: string;
//   developmentStage: 'ideation' | 'prototype' | 'alpha' | 'beta' | 'mainnet' | 'completed';
//   techStack: string[];
//   contributors: Array<{
//     walletAddress: string;
//     role: string;
//     githubUsername?: string;
//   }>;
//   teamSize: number;
//   tags: string[];
//   license?: string;
//   socialLinks: {
//     twitter?: string;
//     discord?: string;
//     telegram?: string;
//     website?: string;
//   };
//   milestones: Array<{
//     title: string;
//     description: string;
//     targetDate: string;
//   }>;
//   endsAt: string | null;
//   lastUpdated: string; // ISO timestamp of last update
//   draftStatus: 'in-progress' | 'completed';
// }

export type CampaignDraft = Omit<IStarknetCampaign, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: number;
  lastUpdated: string;
  draftStatus: 'in-progress' | 'completed';
};

// Define the database
class StarkRaiseDB extends Dexie {
  campaignDrafts!: Table<CampaignDraft, number>;

  constructor() {
    super('StarkRaiseDB');
    this.version(1).stores({
      campaignDrafts: '++id, creator, title, category, developmentStage, draftStatus, lastUpdated'
    });
  }

  // Helper method to get the most recent draft
  async getLatestDraft(): Promise<CampaignDraft | undefined> {
    return await this.campaignDrafts.orderBy('lastUpdated').last();
  }

  // Helper method to save or update a draft
  async saveDraft(draft: CampaignDraft): Promise<number> {
    draft.lastUpdated = new Date().toISOString();
    
    if (draft.id) {
      await this.campaignDrafts.update(draft.id, draft);
      return draft.id;
    } else {
      return await this.campaignDrafts.add(draft);
    }
  }

  // Helper method to auto-save partial draft data
  async autoSaveDraft(draftData: Partial<CampaignDraft>, draftId?: number): Promise<number> {
    const now = new Date().toISOString();
    
    if (draftId) {
      // Update existing draft
      await this.campaignDrafts.update(draftId, {
        ...draftData,
        lastUpdated: now
      });
      return draftId;
    } else {
      // Create new draft with partial data
      const newDraft = {
        ...draftData,
        draftStatus: 'in-progress',
        lastUpdated: now
      } as CampaignDraft;
      
      return await this.campaignDrafts.add(newDraft);
    }
  }
}

// Create and export database instance
export const db = new StarkRaiseDB();

// Custom hook to get the latest draft
export function useLatestDraft() {
  return useLiveQuery(
    () => db.getLatestDraft(),
    []
  );
}

// Custom hook to get a specific draft by ID
export function useDraftById(id?: number) {
  return useLiveQuery(
    () => id ? db.campaignDrafts.get(id) : undefined,
    [id]
  );
}