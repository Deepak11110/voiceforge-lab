
import { useState } from 'react';
import { Team, Creator, Voice } from '@/types/voice';
import { toast } from 'sonner';

export function useTeamManagement(initialCreators: Creator[] = [], initialTeams: Team[] = []) {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [teams, setTeams] = useState<Team[]>(initialTeams);

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

  const assignVoiceToCreator = (voices: Voice[], setVoices: Function, setFilteredVoices: Function) => {
    return (voiceId: string, creatorId: string) => {
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
  };

  const getCurrentCreator = () => {
    return creators.find(c => c.id === 'current');
  };

  const getVoicesByCreator = (voices: Voice[]) => {
    return (creatorId: string) => {
      return voices.filter(voice => voice.creatorId === creatorId);
    };
  };

  const getVoicesByTeam = (voices: Voice[]) => {
    return (teamId: string) => {
      const team = teams.find(t => t.id === teamId);
      if (!team) return [];
      
      // Get voices that are assigned to any creator in the team
      return voices.filter(voice => {
        if (voice.teamId === teamId) return true;
        if (voice.creatorId && team.members.includes(voice.creatorId)) return true;
        return false;
      });
    };
  };

  return {
    creators,
    teams,
    setCreators,
    setTeams,
    addCreator,
    createTeam,
    assignVoiceToCreator,
    getCurrentCreator,
    getVoicesByCreator,
    getVoicesByTeam
  };
}
