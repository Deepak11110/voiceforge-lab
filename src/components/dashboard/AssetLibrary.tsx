
import React, { useState } from 'react';
import { Folder, File, MoreHorizontal, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface AssetFile {
  id: string;
  name: string;
  type: 'audio';
  path: string;
  date: string;
}

interface AssetFolder {
  id: string;
  name: string;
  files: AssetFile[];
}

const AssetLibrary: React.FC = () => {
  const [folders, setFolders] = useState<AssetFolder[]>([
    { 
      id: 'default', 
      name: 'Default', 
      files: [
        { 
          id: '1', 
          name: 'Welcome message', 
          type: 'audio', 
          path: 'https://api.msganesh.com/itts/some-audio.wav',
          date: '2023-08-15' 
        }
      ] 
    },
    { 
      id: 'marketing', 
      name: 'Marketing', 
      files: [
        { 
          id: '2', 
          name: 'Product announcement', 
          type: 'audio', 
          path: 'https://api.msganesh.com/itts/some-audio.wav',
          date: '2023-08-16' 
        }
      ] 
    },
  ]);
  
  const [newFolderName, setNewFolderName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState('default');
  
  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') {
      toast.error('Please enter a folder name');
      return;
    }
    
    const newFolder: AssetFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      files: []
    };
    
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsDialogOpen(false);
    toast.success(`Created folder "${newFolderName}"`);
  };
  
  const handleDeleteFolder = (folderId: string) => {
    if (folderId === 'default') {
      toast.error('Cannot delete the default folder');
      return;
    }
    
    setFolders(folders.filter(folder => folder.id !== folderId));
    setActiveFolder('default');
    toast.success('Folder deleted');
  };
  
  const handleDeleteFile = (fileId: string) => {
    setFolders(folders.map(folder => {
      if (folder.id === activeFolder) {
        return {
          ...folder,
          files: folder.files.filter(file => file.id !== fileId)
        };
      }
      return folder;
    }));
    toast.success('File deleted');
  };
  
  const handlePlayAudio = (file: AssetFile) => {
    const audio = new Audio(file.path);
    audio.play();
    toast.success(`Playing "${file.name}"`);
  };
  
  const activeFiles = folders.find(folder => folder.id === activeFolder)?.files || [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Asset Library</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Enter a name for your new folder
              </DialogDescription>
            </DialogHeader>
            <Input 
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="mt-4"
              autoFocus
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateFolder}>Create Folder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Folder sidebar */}
        <div className="col-span-4 border rounded-lg p-4 bg-white shadow-sm h-fit">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">Folders</h3>
          <ul className="space-y-1">
            {folders.map(folder => (
              <li key={folder.id}>
                <div 
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 cursor-pointer ${activeFolder === folder.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  onClick={() => setActiveFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <Folder className="h-4 w-4 mr-2 opacity-70" />
                    <span className="text-sm">{folder.name}</span>
                    <span className="ml-2 text-xs opacity-70">({folder.files.length})</span>
                  </div>
                  
                  {folder.id !== 'default' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteFolder(folder.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Files area */}
        <div className="col-span-8 border rounded-lg p-4 bg-white shadow-sm min-h-[300px]">
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Files in {folders.find(f => f.id === activeFolder)?.name || 'Default'}
          </h3>
          
          {activeFiles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <File className="h-12 w-12 mx-auto opacity-20 mb-2" />
              <p>No files in this folder</p>
            </div>
          ) : (
            <ul className="divide-y">
              {activeFiles.map(file => (
                <li key={file.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-3 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-8"
                        onClick={() => handlePlayAudio(file)}
                      >
                        Play
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDeleteFile(file.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;
