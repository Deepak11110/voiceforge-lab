
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceCreation } from './VoiceCreationContext';
import { useDashboard } from '@/contexts/DashboardContext';

const CreatorSelection: React.FC = () => {
  const { selectedCreatorId, setSelectedCreatorId } = useVoiceCreation();
  const { creators, getCurrentCreator } = useDashboard();
  
  const currentCreator = getCurrentCreator();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="creator-select">Assign to Creator</Label>
      <Select
        value={selectedCreatorId}
        onValueChange={(value) => setSelectedCreatorId(value)}
      >
        <SelectTrigger id="creator-select">
          <SelectValue placeholder="Select a creator" />
        </SelectTrigger>
        <SelectContent>
          {currentCreator && (
            <SelectItem value={currentCreator.id}>
              Me ({currentCreator.name})
            </SelectItem>
          )}
          
          {creators
            .filter(creator => creator.id !== 'current')
            .map(creator => (
              <SelectItem key={creator.id} value={creator.id}>
                {creator.name}
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
