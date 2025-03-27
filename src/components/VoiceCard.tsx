
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Voice } from '@/types/voice';
import VoiceMetadata from '@/components/VoiceMetadata';
import VoiceCardActions from '@/components/VoiceCardActions';

interface VoiceCardProps {
  voice: Voice;
  onSelect: (voice: Voice) => void;
  onPlay: (voice: Voice) => void;
  onView: (voice: Voice) => void;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, onSelect, onPlay, onView }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-green-500',
      'bg-deep-500',
      'bg-indigo-500',
    ];
    
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div 
      className="voice-card flex items-center p-4 border rounded-lg animate-fade-in hover:border-deep-300"
      onClick={() => onSelect(voice)}
    >
      <Avatar className={`h-10 w-10 mr-4 ${getRandomColor(voice.name)}`}>
        <span className="text-white font-medium text-sm">{getInitials(voice.name)}</span>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h3 className="text-base font-medium truncate">{voice.name}</h3>
          {voice.isLegacy && (
            <Badge variant="outline" className="ml-2 text-xs">Legacy</Badge>
          )}
          {voice.creatorName && voice.creatorId !== 'current' && (
            <Badge variant="secondary" className="ml-2 text-xs">{voice.creatorName}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{voice.description}</p>
      </div>
      
      <VoiceMetadata voice={voice} />
      
      <VoiceCardActions 
        voice={voice}
        onPlay={onPlay}
        onView={onView}
      />
    </div>
  );
};

export default VoiceCard;
