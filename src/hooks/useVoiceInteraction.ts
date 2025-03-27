
import { useState } from 'react';
import { Voice } from '@/types/voice';
import { toast } from 'sonner';
import { voiceApi, Speaker } from '@/services/voiceApi';

export function useVoiceInteraction() {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
  
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
  
  const handleVoiceCreated = async () => {
    try {
      // Fetch the latest speakers after voice creation
      const speakers = await voiceApi.getSpeakers();
      if (speakers && speakers.length > 0) {
        // Find the most recently added speaker (likely the one just created)
        const latestSpeaker = speakers[speakers.length - 1];
        
        // Create a voice object from the speaker
        const newVoice = voiceApi.createVoiceFromSpeaker(latestSpeaker);
        
        toast.success(`New voice "${newVoice.name}" created successfully!`);
        
        // In a real app with state management, you'd add this voice to your voices list
        // For example: setVoices(prev => [...prev, newVoice]);
        return newVoice;
      }
    } catch (error) {
      console.error('Error handling voice creation:', error);
    }
    
    toast.success('New voice created successfully!');
    return null;
  };

  return {
    selectedVoice,
    detailsVisible,
    setSelectedVoice,
    setDetailsVisible,
    handleSelectVoice,
    handlePlayVoice,
    handleViewVoice,
    closeDetails,
    handleVoiceCreated
  };
}
