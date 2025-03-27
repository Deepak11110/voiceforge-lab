
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';
import { mockVoices } from '@/data/mockVoices';
import { voiceApi, Speaker } from '@/services/voiceApi';
import { SpeakerGroup } from '@/components/dashboard/SpeakerGroups';
import { useQuery } from '@tanstack/react-query';

type DashboardContextType = {
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

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [speakerGroups, setSpeakerGroups] = useState<SpeakerGroup[]>([]);
  
  // Query for fetching speakers
  const { data: speakersData, isLoading: isLoadingSpeakers } = useQuery({
    queryKey: ['speakers'],
    queryFn: voiceApi.getSpeakers,
  });
  
  const speakers = speakersData || [];
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVoices(mockVoices);
      setFilteredVoices(mockVoices);
    }, 500);
  }, []);
  
  useEffect(() => {
    let result = [...voices];
    
    // Filter by search
    if (searchQuery) {
      result = result.filter(voice => 
        voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voice.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'personal') {
        result = result.filter(voice => !voice.isLegacy);
      } else if (activeTab === 'community') {
        // In a real app, this would filter based on community-contributed voices
        result = result.filter(voice => voice.tags.includes('Social'));
      } else if (activeTab === 'default') {
        result = result.filter(voice => voice.isLegacy);
      }
    }
    
    // Filter by category
    if (categoryFilter.length > 0) {
      result = result.filter(voice => categoryFilter.includes(voice.category));
    }
    
    // Filter by language
    if (languageFilter.length > 0) {
      result = result.filter(voice => languageFilter.includes(voice.language));
    }
    
    setFilteredVoices(result);
  }, [voices, searchQuery, activeTab, categoryFilter, languageFilter]);
  
  const handleSelectVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    setDetailsVisible(true);
  };
  
  const handlePlayVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    toast.success(`Now playing a sample of ${voice.name}`);
  };
  
  const handleViewVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    setDetailsVisible(true);
  };
  
  const closeDetails = () => {
    setDetailsVisible(false);
  };
  
  const handleVoiceCreated = () => {
    toast.success('New voice created successfully!');
    // In a real app, this would refetch the voices list
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setCategoryFilter([]);
    setLanguageFilter([]);
  };
  
  const createSpeakerGroup = (name: string, speakerIds: string[]) => {
    const newGroup: SpeakerGroup = {
      id: `group-${Date.now()}`,
      name,
      speakerIds
    };
    
    setSpeakerGroups(prev => [...prev, newGroup]);
  };
  
  const getSpeakerGroupById = (id: string) => {
    return speakerGroups.find(group => group.id === id);
  };
  
  const getSpeakersByGroupId = (groupId: string) => {
    const group = getSpeakerGroupById(groupId);
    if (!group) return [];
    
    return speakers.filter(speaker => group.speakerIds.includes(speaker.id));
  };

  const value = {
    voices,
    filteredVoices,
    selectedVoice,
    detailsVisible,
    searchQuery,
    activeTab,
    categoryFilter,
    languageFilter,
    speakers,
    speakerGroups,
    isLoadingSpeakers,
    setVoices,
    setFilteredVoices,
    setSelectedVoice,
    setDetailsVisible,
    setSearchQuery,
    setActiveTab,
    setCategoryFilter,
    setLanguageFilter,
    handleSelectVoice,
    handlePlayVoice,
    handleViewVoice,
    closeDetails,
    handleVoiceCreated,
    clearAllFilters,
    createSpeakerGroup,
    getSpeakerGroupById,
    getSpeakersByGroupId,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// For convenience, re-export the mock data
export { mockVoices };
