
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { VoiceCreationProvider, useVoiceCreation } from './voice-creation/VoiceCreationContext';
import InstantVoiceCloning from './voice-creation/InstantVoiceCloning';
import ProfessionalVoiceCloning from './voice-creation/ProfessionalVoiceCloning';

interface CreateVoiceDialogProps {
  onVoiceCreated: () => void;
}

// Inner component to use the context
const CreateVoiceDialogContent: React.FC<CreateVoiceDialogProps> = ({ onVoiceCreated }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('instant');
  const [isCreating, setIsCreating] = useState(false);
  const { formData, setFormData, setSelectedSpeakerId, setSelectedGroupId } = useVoiceCreation();

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
    setSelectedSpeakerId(null);
    setSelectedGroupId(null);
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
            <InstantVoiceCloning />
          </TabsContent>
          
          <TabsContent value="professional" className="space-y-4">
            <ProfessionalVoiceCloning />
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

// Main component that provides the context
const CreateVoiceDialog: React.FC<CreateVoiceDialogProps> = (props) => {
  return (
    <VoiceCreationProvider>
      <CreateVoiceDialogContent {...props} />
    </VoiceCreationProvider>
  );
};

export default CreateVoiceDialog;
