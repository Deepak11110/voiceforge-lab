
export interface Voice {
  id: string;
  name: string;
  description: string;
  category: string;
  speakerId: string;
  audioId: string;
  isLegacy: boolean;
  tags: string[];
  createdAt: string;
  recentGenerations: {
    id: string;
    text: string;
    date: string;
  }[];
}
