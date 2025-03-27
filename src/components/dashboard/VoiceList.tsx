
import React from 'react';
import VoiceCard from '@/components/VoiceCard';
import { Button } from '@/components/ui/button';
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
  return (
    <div className="space-y-3">
      {voices.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/40">
          <p className="text-muted-foreground mb-4">No voices match your current filters.</p>
          <Button variant="outline" onClick={onClearFilters}>
            Clear all filters
          </Button>
        </div>
      ) : (
        voices.map(voice => (
          <VoiceCard 
            key={voice.id}
            voice={voice}
            onSelect={onSelectVoice}
            onPlay={onPlayVoice}
            onView={onViewVoice}
          />
        ))
      )}
    </div>
  );
};

export default VoiceList;
