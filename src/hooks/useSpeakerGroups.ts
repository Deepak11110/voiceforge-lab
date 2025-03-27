
import { useState } from 'react';
import { Speaker } from '@/services/voiceApi';
import { SpeakerGroup } from '@/components/dashboard/SpeakerGroups';

export function useSpeakerGroups(speakers: Speaker[]) {
  const [speakerGroups, setSpeakerGroups] = useState<SpeakerGroup[]>([]);
  
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

  return {
    speakerGroups,
    createSpeakerGroup,
    getSpeakerGroupById,
    getSpeakersByGroupId
  };
}
