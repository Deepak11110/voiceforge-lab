
import { Voice } from '@/types/voice';
import { Speaker } from '@/services/voiceApi';
import { SpeakerGroup } from '@/components/dashboard/SpeakerGroups';

export type DashboardContextType = {
  voices: Voice[];
  filteredVoices: Voice[];
  selectedVoice: Voice | null;
  detailsVisible: boolean;
  searchQuery: string;
  activeTab: string;
  categoryFilter: string[];
  languageFilter: string[];
  speakers: Speaker[];
  speakerGroups: SpeakerGroup[];
  isLoadingSpeakers: boolean;
  setVoices: (voices: Voice[]) => void;
  setFilteredVoices: (voices: Voice[]) => void;
  setSelectedVoice: (voice: Voice | null) => void;
  setDetailsVisible: (visible: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
  setCategoryFilter: (categories: string[]) => void;
  setLanguageFilter: (languages: string[]) => void;
  handleSelectVoice: (voice: Voice) => void;
  handlePlayVoice: (voice: Voice) => void;
  handleViewVoice: (voice: Voice) => void;
  closeDetails: () => void;
  handleVoiceCreated: () => void;
  clearAllFilters: () => void;
  createSpeakerGroup: (name: string, speakerIds: string[]) => void;
  getSpeakerGroupById: (id: string) => SpeakerGroup | undefined;
  getSpeakersByGroupId: (groupId: string) => Speaker[];
};
