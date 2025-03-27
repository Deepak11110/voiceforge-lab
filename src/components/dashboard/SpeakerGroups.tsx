
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FolderPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Speaker } from '@/services/voiceApi';

interface SpeakerGroupsProps {
  speakers: Speaker[];
  onCreateGroup: (name: string, speakerIds: string[]) => void;
  groups: SpeakerGroup[];
}

export interface SpeakerGroup {
  id: string;
  name: string;
  speakerIds: string[];
}

const SpeakerGroups: React.FC<SpeakerGroupsProps> = ({ 
  speakers, 
  onCreateGroup,
  groups
}) => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }
    
    if (selectedSpeakers.length === 0) {
      toast.error('Please select at least one speaker');
      return;
    }
    
    onCreateGroup(groupName, selectedSpeakers);
    setOpen(false);
    setGroupName('');
    setSelectedSpeakers([]);
    toast.success(`Speaker group "${groupName}" created successfully`);
  };
  
  const toggleSpeakerSelection = (speakerId: string) => {
    if (selectedSpeakers.includes(speakerId)) {
      setSelectedSpeakers(selectedSpeakers.filter(id => id !== speakerId));
    } else {
      setSelectedSpeakers([...selectedSpeakers, speakerId]);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Speaker Groups</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Speaker Group</DialogTitle>
              <DialogDescription>
                Group speakers together for easier management
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name</Label>
                <Input 
                  id="group-name" 
                  value={groupName} 
                  onChange={(e) => setGroupName(e.target.value)} 
                  placeholder="Enter group name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Speakers</Label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                  {speakers.length > 0 ? (
                    speakers.map(speaker => (
                      <div 
                        key={speaker.id}
                        className={`p-2 border rounded-md cursor-pointer ${
                          selectedSpeakers.includes(speaker.id) 
                            ? 'bg-primary/20 border-primary' 
                            : ''
                        }`}
                        onClick={() => toggleSpeakerSelection(speaker.id)}
                      >
                        <div className="font-medium">{speaker.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {speaker.reference_text}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center p-4 text-muted-foreground">
                      No speakers available yet
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-2">
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {groups.map(group => (
              <div key={group.id} className="p-3 border rounded-md">
                <h4 className="font-medium">{group.name}</h4>
                <div className="text-sm text-muted-foreground mt-1">
                  {group.speakerIds.length} speaker{group.speakerIds.length !== 1 ? 's' : ''}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {group.speakerIds.map(speakerId => {
                    const speaker = speakers.find(s => s.id === speakerId);
                    return speaker ? (
                      <span key={speakerId} className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {speaker.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 border rounded-md text-muted-foreground">
            No speaker groups created yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerGroups;
