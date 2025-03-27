import React, { createContext, useContext, useState } from 'react';
import { Voice, Creator, Team } from '@/types/voice';
import { voiceApi } from '@/services/voiceApi';
import { DashboardContextType } from '@/types/dashboard';
import { useVoiceFiltering } from '@/hooks/useVoiceFiltering';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';
import { useSpeakerGroups } from '@/hooks/useSpeakerGroups';
import { useVoiceData } from '@/hooks/useVoiceData';
import { useTeamManagement } from '@/hooks/useTeamManagement';
import { useAuth } from '@/contexts/AuthContext';
import { mockVoices } from '@/data/mockVoices';  // Added the missing import

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Sample admin creator (represents the current logged-in user)
const currentCreator: Creator = {
  id: 'current',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Initialize voice data
  const {
    voices,
    setVoices,
    speakers,
    isLoadingSpeakers,
    refetchSpeakers
  } = useVoiceData(currentCreator);
  
  // Initialize team management
  const {
    creators,
    teams,
    addCreator,
    createTeam,
    assignVoiceToCreator: createAssignVoiceToCreator,
    getCurrentCreator,
    getVoicesByCreator: createGetVoicesByCreator,
    getVoicesByTeam: createGetVoicesByTeam
  } = useTeamManagement([currentCreator]);
  
  // Use our filtering hook
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
  
  // Initialize voice interaction
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

  // Initialize speaker groups hook
  const {
    speakerGroups,
    createSpeakerGroup,
    getSpeakerGroupById,
    getSpeakersByGroupId,
    findVoicesBySpeakerId
  } = useSpeakerGroups(speakers);
  
  // Create final versions of functions that need access to state
  const assignVoiceToCreator = createAssignVoiceToCreator(voices, setVoices, setFilteredVoices);
  const getVoicesByCreator = createGetVoicesByCreator(voices);
  const getVoicesByTeam = createGetVoicesByTeam(voices);
  
  // Handle newly created voices with creator assignment
  const handleVoiceCreated = async (creatorId?: string) => {
    const newVoice = await interactionHandleVoiceCreated();
    
    // Refresh the speakers list
    refetchSpeakers();
    
    // If a new voice was created, add it to the voices list and assign to the specified creator
    if (newVoice) {
      const creator = creators.find(c => c.id === (creatorId || 'current'));
      
      const voiceWithCreator = {
        ...newVoice,
        creatorId: creator?.id || 'current',
        creatorName: creator?.name || currentCreator.name
      };
      
      setVoices(prev => voiceApi.addVoiceToList(prev, voiceWithCreator));
      setFilteredVoices(prev => voiceApi.addVoiceToList(prev, voiceWithCreator));
      
      return voiceWithCreator;
    }
    
    return null;
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
    creators,
    teams,
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
    addCreator,
    createTeam,
    assignVoiceToCreator,
    getCurrentCreator,
    getVoicesByCreator,
    getVoicesByTeam
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
