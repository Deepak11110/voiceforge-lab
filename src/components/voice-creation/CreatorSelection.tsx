
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceCreation } from './VoiceCreationContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const CreatorSelection: React.FC = () => {
  const { selectedCreatorId, setSelectedCreatorId } = useVoiceCreation();
  const { creators, getCurrentCreator } = useDashboard();
  
  const currentCreator = getCurrentCreator();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="creator-select">Assign to Creator</Label>
      <Select
        value={selectedCreatorId}
        onValueChange={(value) => setSelectedCreatorId(value)}
      >
        <SelectTrigger id="creator-select" className="w-full">
          <SelectValue placeholder="Select a creator" />
        </SelectTrigger>
        <SelectContent>
          {currentCreator && (
            <SelectItem value={currentCreator.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {getInitials(currentCreator.name)}
                  </AvatarFallback>
                </Avatar>
                <span>Me ({currentCreator.name})</span>
              </div>
            </SelectItem>
          )}
          
          {creators
            .filter(creator => creator.id !== 'current')
            .map(creator => (
              <SelectItem key={creator.id} value={creator.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-secondary/20">
                      {getInitials(creator.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{creator.name}</span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        Choose which creator this voice will be assigned to
      </p>
    </div>
  );
};

export default CreatorSelection;
