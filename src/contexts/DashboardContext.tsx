
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Voice, Creator, Team } from '@/types/voice';
import { mockVoices } from '@/data/mockVoices';
import { voiceApi } from '@/services/voiceApi';
import { useQuery } from '@tanstack/react-query';
import { DashboardContextType } from '@/types/dashboard';
import { useVoiceFiltering } from '@/hooks/useVoiceFiltering';
import { useVoiceInteraction } from '@/hooks/useVoiceInteraction';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Sample admin creator (represents the current logged-in user)
const currentCreator: Creator = {
  id: 'current',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [creators, setCreators] = useState<Creator[]>([currentCreator]);
  const [teams, setTeams] = useState<Team[]>([]);
  const { user } = useAuth();
  
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
  
  useEffect(() => {
    // Simulate API fetch for mock voices
    setTimeout(() => {
      // If we have a logged in user, assign voices to the current creator
      const voicesWithCreator = mockVoices.map(voice => ({
        ...voice,
        creatorId: 'current', // Assign to current creator
        creatorName: currentCreator.name
      }));
      
      setVoices(voicesWithCreator);
      setFilteredVoices(voicesWithCreator);
    }, 500);
    
    // Also fetch real speakers and convert them to voices
    const fetchSpeakersAndCreateVoices = async () => {
      try {
        const fetchedSpeakers = await voiceApi.getSpeakers();
        if (fetchedSpeakers && fetchedSpeakers.length > 0) {
          const speakerVoices = fetchedSpeakers.map(speaker => {
            const voice = voiceApi.createVoiceFromSpeaker(speaker);
            // Assign to current creator
            return {
              ...voice,
              creatorId: 'current',
              creatorName: currentCreator.name
            };
          });
          
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

  // Creator management functions
  const addCreator = (creatorData: { name: string; email: string }) => {
    const newCreator: Creator = {
      id: `creator-${Date.now()}`,
      name: creatorData.name,
      email: creatorData.email,
      role: 'creator'
    };
    setCreators(prev => [...prev, newCreator]);
    return newCreator;
  };

  const createTeam = (teamData: { name: string; description?: string; members: string[] }) => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      description: teamData.description,
      ownerId: 'current', // Current logged in user is the owner
      members: teamData.members
    };
    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  };

  const assignVoiceToCreator = (voiceId: string, creatorId: string) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) {
      toast.error('Creator not found');
      return;
    }

    setVoices(prev => prev.map(voice => {
      if (voice.id === voiceId) {
        return {
          ...voice,
          creatorId,
          creatorName: creator.name
        };
      }
      return voice;
    }));
    
    // Also update filtered voices
    setFilteredVoices(prev => prev.map(voice => {
      if (voice.id === voiceId) {
        return {
          ...voice,
          creatorId,
          creatorName: creator.name
        };
      }
      return voice;
    }));

    toast.success(`Voice assigned to ${creator.name}`);
  };

  const getCurrentCreator = () => {
    return creators.find(c => c.id === 'current');
  };

  const getVoicesByCreator = (creatorId: string) => {
    return voices.filter(voice => voice.creatorId === creatorId);
  };

  const getVoicesByTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return [];
    
    // Get voices that are assigned to any creator in the team
    return voices.filter(voice => {
      if (voice.teamId === teamId) return true;
      if (voice.creatorId && team.members.includes(voice.creatorId)) return true;
      return false;
    });
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
