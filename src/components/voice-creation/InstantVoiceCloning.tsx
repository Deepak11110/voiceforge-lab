
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Mic, Users } from 'lucide-react';
import { useVoiceCreation } from './VoiceCreationContext';
import { useDashboard } from '@/contexts/DashboardContext';

const InstantVoiceCloning: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSelectChange,
    selectedGroupId,
    setSelectedGroupId,
    selectedSpeakerId,
    setSelectedSpeakerId,
    groupSpeakers,
    setGroupSpeakers
  } = useVoiceCreation();
  
  const { speakerGroups, getSpeakersByGroupId } = useDashboard();
  
  useEffect(() => {
    if (selectedGroupId) {
      setGroupSpeakers(getSpeakersByGroupId(selectedGroupId));
    } else {
      setGroupSpeakers([]);
    }
  }, [selectedGroupId, getSpeakersByGroupId, setGroupSpeakers]);
  
  const handleGroupChange = (groupId: string) => {
    setSelectedGroupId(groupId);
    setSelectedSpeakerId(null); // Reset selected speaker when group changes
  };
  
  const handleSpeakerSelect = (speakerId: string) => {
    setSelectedSpeakerId(speakerId);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="voice-name">Voice Name</Label>
          <Input 
            id="voice-name" 
            name="name"
            placeholder="Enter a name for your voice" 
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice-category">Voice Category</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('category', value)}
            value={formData.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="narration">Narration</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="characters">Characters</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="voice-description">Description</Label>
        <Textarea 
          id="voice-description" 
          name="description"
          placeholder="Describe this voice (optional)" 
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="voice-tags">Tags (comma separated)</Label>
        <Input 
          id="voice-tags" 
          name="tags"
          placeholder="e.g., female, young, american, calm" 
          value={formData.tags}
          onChange={handleChange}
        />
      </div>
      
      {/* Speaker Group Selection */}
      {speakerGroups.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="speaker-group">Speaker Group (optional)</Label>
          <Select 
            onValueChange={handleGroupChange}
            value={selectedGroupId || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a speaker group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {speakerGroups.map(group => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name} ({group.speakerIds.length} speakers)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Show speakers from selected group */}
      {selectedGroupId && groupSpeakers.length > 0 && (
        <div className="space-y-2 border rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <Label>Select a speaker from this group</Label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {groupSpeakers.map(speaker => (
              <div 
                key={speaker.id}
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedSpeakerId === speaker.id ? 'bg-primary/20 border-primary' : ''
                }`}
                onClick={() => handleSpeakerSelect(speaker.id)}
              >
                <div className="font-medium">{speaker.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {speaker.reference_text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="border rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-medium">Voice Sample</h3>
        <p className="text-sm text-muted-foreground">
          Upload an audio sample or record directly from your microphone.
        </p>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Upload className="mr-2 h-4 w-4" />
            Upload file
          </Button>
          <Button variant="outline" className="flex-1">
            <Mic className="mr-2 h-4 w-4" />
            Record voice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstantVoiceCloning;
