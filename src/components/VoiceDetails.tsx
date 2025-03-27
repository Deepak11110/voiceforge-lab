
import React from 'react';
import { X, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Voice } from '@/types/voice';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VoiceDetailsProps {
  voice: Voice | null;
  onClose: () => void;
}

const VoiceDetails: React.FC<VoiceDetailsProps> = ({ voice, onClose }) => {
  if (!voice) return null;
  
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
    <div className="fixed top-0 right-0 h-full w-96 bg-background border-l shadow-lg z-50 animate-slide-in overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <Avatar className={`h-10 w-10 mr-3 ${getRandomColor(voice.name)}`}>
            <span className="text-white font-medium text-sm">{getInitials(voice.name)}</span>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{voice.name}</h3>
              {voice.isLegacy && (
                <Badge variant="outline" className="ml-2 text-xs">Legacy</Badge>
              )}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Attributes</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Speaker ID</p>
                <p className="text-sm font-medium">{voice.speakerId}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Audio ID</p>
                <p className="text-sm font-medium">{voice.audioId}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Voice Type</p>
                <p className="text-sm font-medium">{voice.category}</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium">{voice.createdAt}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Labels</h4>
            <div className="flex flex-wrap gap-2">
              {voice.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent generations</h4>
            {voice.recentGenerations.map((gen, index) => (
              <div key={index} className="mb-4 border rounded-lg p-3 hover:border-deep-300 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium truncate max-w-[250px]">{gen.text}</p>
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{gen.date}</p>
              </div>
            ))}
            
            <Button variant="outline" size="sm" className="w-full mt-2">
              <span>View history</span>
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default VoiceDetails;
