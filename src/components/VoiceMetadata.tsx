
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Voice } from '@/types/voice';

interface VoiceMetadataProps {
  voice: Voice;
}

const VoiceMetadata: React.FC<VoiceMetadataProps> = ({ voice }) => {
  return (
    <div className="flex space-x-1 ml-2">
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
        {voice.category}
      </Badge>
      <Badge variant="outline" className="text-xs">
        +4 more...
      </Badge>
    </div>
  );
};

export default VoiceMetadata;
