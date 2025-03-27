
import React from 'react';
import VoiceCard from '@/components/VoiceCard';
import EmptyVoiceList from '@/components/dashboard/EmptyVoiceList';
import { Voice } from '@/types/voice';

interface VoiceListProps {
  voices: Voice[];
  onSelectVoice: (voice: Voice) => void;
  onPlayVoice: (voice: Voice) => void;
  onViewVoice: (voice: Voice) => void;
  onClearFilters: () => void;
}

const VoiceList: React.FC<VoiceListProps> = ({ 
  voices, 
  onSelectVoice, 
  onPlayVoice, 
  onViewVoice, 
  onClearFilters 
}) => {
  if (voices.length === 0) {
    return <EmptyVoiceList onClearFilters={onClearFilters} />;
  }
  
  return (
    <div className="space-y-3">
      {voices.map(voice => (
        <VoiceCard 
          key={voice.id}
          voice={voice}
          onSelect={onSelectVoice}
          onPlay={onPlayVoice}
          onView={onViewVoice}
        />
      ))}
    </div>
  );
};

export default VoiceList;
