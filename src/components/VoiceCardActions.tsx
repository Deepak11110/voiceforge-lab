
import React from 'react';
import { Play, Info, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Voice } from '@/types/voice';

interface VoiceCardActionsProps {
  voice: Voice;
  onPlay: (voice: Voice) => void;
  onView: (voice: Voice) => void;
}

const VoiceCardActions: React.FC<VoiceCardActionsProps> = ({ voice, onPlay, onView }) => {
  return (
    <div className="flex items-center ml-4 space-x-1">
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          onView(voice);
        }}
      >
        <Info className="h-4 w-4" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          onPlay(voice);
        }}
      >
        <Play className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default VoiceCardActions;
