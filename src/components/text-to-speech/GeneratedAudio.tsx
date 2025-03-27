
import React from 'react';

interface GeneratedAudioProps {
  audioUrl: string | null;
}

const GeneratedAudio: React.FC<GeneratedAudioProps> = ({ audioUrl }) => {
  if (!audioUrl) return null;
  
  return (
    <div className="mt-6 border rounded-lg p-4 bg-secondary/30">
      <h3 className="text-sm font-medium mb-2">Generated Audio</h3>
      <audio 
        controls 
        className="w-full" 
        src={audioUrl}
      />
    </div>
  );
};

export default GeneratedAudio;
