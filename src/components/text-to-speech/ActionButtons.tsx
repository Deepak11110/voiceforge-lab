
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Download, FolderPlus, Folder } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActionButtonsProps {
  audioUrl: string | null;
  isGenerating: boolean;
  audioId: string | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  audioUrl, 
  isGenerating,
  audioId
}) => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [fileName, setFileName] = useState(`generated-audio-${audioId || 'file'}`);
  const [selectedFolder, setSelectedFolder] = useState("default");
  const [newFolderMode, setNewFolderMode] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  
  // Mock folders for the asset library
  const [folders, setFolders] = useState([
    { id: "default", name: "Default" },
    { id: "marketing", name: "Marketing" },
    { id: "podcasts", name: "Podcasts" }
  ]);

  const handleDownload = () => {
    if (!audioUrl) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${fileName}.wav`;
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    toast.success('Audio downloaded successfully');
  };

  const handleSave = () => {
    if (!audioUrl) return;
    
    // Show dialog to name the file
    setIsSaveDialogOpen(true);
  };

  const confirmSave = () => {
    if (newFolderMode && newFolderName.trim()) {
      // Create new folder and use it
      const newFolder = {
        id: newFolderName.toLowerCase().replace(/\s+/g, '-'),
        name: newFolderName
      };
      setFolders([...folders, newFolder]);
      setSelectedFolder(newFolder.id);
      toast.success(`New folder "${newFolderName}" created`);
    }
    
    const folderName = folders.find(f => f.id === selectedFolder)?.name || "Default";
    toast.success(`Audio saved to "${folderName}" folder as "${fileName}"`);
    setIsSaveDialogOpen(false);
    setNewFolderMode(false);
    setNewFolderName("");
  };

  const handleCreateNewFolder = () => {
    setNewFolderMode(true);
  };
  
  return (
    <div className="flex gap-3 w-full mt-3">
      <Button 
        variant="outline" 
        className="flex-1 h-11"
        disabled={!audioUrl || isGenerating}
        onClick={handleSave}
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      
      <Button 
        variant="outline" 
        className="flex-1 h-11"
        disabled={!audioUrl || isGenerating}
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>

      <AlertDialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Audio File</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a name for this audio file and select a folder
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 space-y-4">
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
            
            {!newFolderMode ? (
              <div className="flex gap-2">
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map(folder => (
                      <SelectItem key={folder.id} value={folder.id}>
                        <div className="flex items-center">
                          <Folder className="h-4 w-4 mr-2 opacity-70" />
                          {folder.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={handleCreateNewFolder}
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center">
                  <FolderPlus className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Create New Folder</span>
                </div>
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New folder name"
                  className="mt-1"
                  autoFocus
                />
              </div>
            )}
          </div>
          <AlertDialogFooter>
            {newFolderMode && (
              <Button 
                variant="outline" 
                onClick={() => setNewFolderMode(false)}
                className="mr-auto"
              >
                Cancel New Folder
              </Button>
            )}
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
