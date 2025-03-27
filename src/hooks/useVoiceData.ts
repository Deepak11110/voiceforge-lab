
import { useState, useEffect } from 'react';
import { Voice, Creator } from '@/types/voice';
import { mockVoices } from '@/data/mockVoices';
import { voiceApi } from '@/services/voiceApi';
import { useQuery } from '@tanstack/react-query';

export function useVoiceData(currentCreator: Creator) {
  const [voices, setVoices] = useState<Voice[]>([]);

  // Query for fetching speakers
  const { data: speakersData, isLoading: isLoadingSpeakers, refetch: refetchSpeakers } = useQuery({
    queryKey: ['speakers'],
    queryFn: voiceApi.getSpeakers,
  });
  
  const speakers = speakersData || [];

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
        }
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };
    
    fetchSpeakersAndCreateVoices();
  }, [currentCreator.name]);

  return {
    voices,
    setVoices,
    speakers,
    isLoadingSpeakers,
    refetchSpeakers
  };
}
