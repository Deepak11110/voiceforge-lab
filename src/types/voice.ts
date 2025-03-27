
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
