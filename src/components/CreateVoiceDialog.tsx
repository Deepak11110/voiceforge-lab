
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Upload, Mic } from 'lucide-react';

interface CreateVoiceDialogProps {
  onVoiceCreated: () => void;
}

const CreateVoiceDialog: React.FC<CreateVoiceDialogProps> = ({ onVoiceCreated }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('instant');
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsCreating(false);
    setOpen(false);
    onVoiceCreated();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      tags: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-900">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add a new voice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create or clone a new voice</DialogTitle>
          <DialogDescription>
            Create a new voice by uploading audio samples or using our instant voice cloning technology.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="instant" className="mt-5" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="instant">Instant Voice Cloning</TabsTrigger>
            <TabsTrigger value="professional">Professional Voice Cloning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instant" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="professional" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Professional Voice Cloning</h3>
              <p className="text-muted-foreground mb-4">
                Upload multiple high-quality samples for professional-grade voice cloning. 
                This method requires more audio but produces superior results.
              </p>
              
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload multiple files
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isCreating || !formData.name || !formData.category || (activeTab === 'instant')}
          >
            {isCreating ? 'Creating...' : 'Create Voice'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVoiceDialog;
