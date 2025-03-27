
import React from 'react';
import { Play, Info, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Voice } from '@/types/voice';

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
        </div>
        <p className="text-sm text-muted-foreground truncate">{voice.description}</p>
      </div>
      
      <div className="flex space-x-1 ml-2">
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          {voice.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          +4 more...
        </Badge>
      </div>
      
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
    </div>
  );
};

export default VoiceCard;
