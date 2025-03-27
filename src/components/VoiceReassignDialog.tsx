
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useDashboard } from '@/contexts/DashboardContext';
import { Voice } from '@/types/voice';
import { UserPlus } from 'lucide-react';

interface VoiceReassignDialogProps {
  voice: Voice;
}

const VoiceReassignDialog: React.FC<VoiceReassignDialogProps> = ({ voice }) => {
  const { creators, assignVoiceToCreator } = useDashboard();
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(voice.creatorId || 'current');
  const [open, setOpen] = useState(false);

  const handleReassign = () => {
    if (selectedCreatorId && voice.id) {
      assignVoiceToCreator(voice.id, selectedCreatorId);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Reassign voice">
          <UserPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reassign Voice</DialogTitle>
          <DialogDescription>
            Select a creator to assign this voice to.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice-name">Voice</Label>
              <div className="font-medium">{voice.name}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-creator">Current Creator</Label>
              <div className="text-muted-foreground">{voice.creatorName || 'None'}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-creator">New Creator</Label>
              <Select value={selectedCreatorId} onValueChange={setSelectedCreatorId}>
                <SelectTrigger id="new-creator">
                  <SelectValue placeholder="Select a creator" />
                </SelectTrigger>
                <SelectContent>
                  {creators.map((creator) => (
                    <SelectItem key={creator.id} value={creator.id}>
                      {creator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleReassign}>
            Reassign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceReassignDialog;
