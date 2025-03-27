
export interface Voice {
  id: string;
  name: string;
  description: string;
  category: string;
  speakerId: string;
  audioId: string;
  isLegacy: boolean;
  tags: string[];
  language: string;
  createdAt: string;
  creatorId?: string; // ID of the creator who owns this voice
  creatorName?: string; // Name of the creator
  teamId?: string; // Optional team ID if this voice belongs to a team
  recentGenerations: {
    id: string;
    text: string;
    date: string;
  }[];
}

// New interface to represent a voice created from uploaded audio
export interface CreatedVoice extends Voice {
  referenceAudioId: string;
  referenceText?: string;
}

// New interface for creators/users
export interface Creator {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'creator' | 'member';
  teams?: string[]; // IDs of teams the creator belongs to
}

// New interface for teams
export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string; // Creator ID of the team owner
  members: string[]; // Array of creator IDs
}
