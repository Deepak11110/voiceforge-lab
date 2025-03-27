
import React from 'react';
import { Speaker } from '@/services/voiceApi';

interface SpeakersDisplayProps {
  speakers: Speaker[];
  selectedSpeaker: Speaker | null;
  isLoadingSpeakers: boolean;
  onSelectSpeaker: (speaker: Speaker) => void;
}

const SpeakersDisplay: React.FC<SpeakersDisplayProps> = ({
  speakers,
  selectedSpeaker,
  isLoadingSpeakers,
  onSelectSpeaker
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-md font-medium mb-2">Available Speakers</h3>
      {isLoadingSpeakers ? (
        <div className="text-center p-4">Loading speakers...</div>
      ) : speakers.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {speakers.map(speaker => (
            <div 
              key={speaker.id} 
              className={`p-2 border rounded-md cursor-pointer ${
                selectedSpeaker?.id === speaker.id ? 'bg-primary/20 border-primary' : ''
              }`}
              onClick={() => onSelectSpeaker(speaker)}
            >
              <div className="font-medium">{speaker.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {speaker.reference_text}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-muted-foreground">
          No speakers available. Upload a reference audio to get started.
        </div>
      )}
    </div>
  );
};

export default SpeakersDisplay;
