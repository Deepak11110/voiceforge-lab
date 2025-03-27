
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Voice } from '@/types/voice';
import { mockVoices } from '@/data/mockVoices';
import { voiceApi } from '@/services/voiceApi';
import { useQuery } from '@tanstack/react-query';
import { DashboardContextType } from '@/types/dashboard';
import { useVoiceFiltering } from '@/hooks/useVoiceFiltering';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';
import { useSpeakerGroups } from '@/hooks/useSpeakerGroups';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  
  // Query for fetching speakers
  const { data: speakersData, isLoading: isLoadingSpeakers } = useQuery({
    queryKey: ['speakers'],
    queryFn: voiceApi.getSpeakers,
  });
  
  const speakers = speakersData || [];
  
  // Use our custom hooks
  const { 
    filteredVoices, 
    searchQuery, 
    activeTab, 
    categoryFilter, 
    languageFilter,
    setFilteredVoices,
    setSearchQuery,
    setActiveTab,
    setCategoryFilter,
    setLanguageFilter,
    clearAllFilters
  } = useVoiceFiltering(voices);
  
  const {
    selectedVoice,
    detailsVisible,
    setSelectedVoice,
    setDetailsVisible,
    handleSelectVoice,
    handlePlayVoice,
    handleViewVoice,
    closeDetails,
    handleVoiceCreated
  } = useVoiceInteraction();
  
  const {
    speakerGroups,
    createSpeakerGroup,
    getSpeakerGroupById,
    getSpeakersByGroupId
  } = useSpeakerGroups(speakers);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVoices(mockVoices);
      setFilteredVoices(mockVoices);
    }, 500);
  }, []);

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
