
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
  const { data: speakersData, isLoading: isLoadingSpeakers, refetch: refetchSpeakers } = useQuery({
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
    handleVoiceCreated: interactionHandleVoiceCreated
  } = useVoiceInteraction();
  
  const {
    speakerGroups,
    createSpeakerGroup,
    getSpeakerGroupById,
    getSpeakersByGroupId
  } = useSpeakerGroups(speakers);
  
  useEffect(() => {
    // Simulate API fetch for mock voices
    setTimeout(() => {
      setVoices(mockVoices);
      setFilteredVoices(mockVoices);
    }, 500);
    
    // Also fetch real speakers and convert them to voices
    const fetchSpeakersAndCreateVoices = async () => {
      try {
        const fetchedSpeakers = await voiceApi.getSpeakers();
        if (fetchedSpeakers && fetchedSpeakers.length > 0) {
          const speakerVoices = fetchedSpeakers.map(speaker => 
            voiceApi.createVoiceFromSpeaker(speaker)
          );
          
          // Combine mock voices with speaker voices
          setVoices(prev => {
            const combinedVoices = [...prev];
            speakerVoices.forEach(voice => {
              if (!combinedVoices.some(v => v.id === voice.id)) {
                combinedVoices.push(voice);
              }
            });
            return combinedVoices;
          });
          
          setFilteredVoices(prev => {
            const combinedVoices = [...prev];
            speakerVoices.forEach(voice => {
              if (!combinedVoices.some(v => v.id === voice.id)) {
                combinedVoices.push(voice);
              }
            });
            return combinedVoices;
          });
        }
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };
    
    fetchSpeakersAndCreateVoices();
  }, []);
  
  // Handle newly created voices
  const handleVoiceCreated = async () => {
    const newVoice = await interactionHandleVoiceCreated();
    
    // Refresh the speakers list
    refetchSpeakers();
    
    // If a new voice was created, add it to the voices list
    if (newVoice) {
      setVoices(prev => voiceApi.addVoiceToList(prev, newVoice));
      setFilteredVoices(prev => voiceApi.addVoiceToList(prev, newVoice));
    }
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
