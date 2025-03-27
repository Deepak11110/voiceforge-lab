
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusCircle, Users } from 'lucide-react';
import { Creator, Team } from '@/types/voice';
import { useDashboard } from '@/contexts/DashboardContext';
import { toast } from 'sonner';

const CreatorManagement: React.FC = () => {
  const { creators, teams, addCreator, createTeam, assignVoiceToCreator } = useDashboard();
  const [creatorName, setCreatorName] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('creators');

  const handleAddCreator = () => {
    if (!creatorName.trim() || !creatorEmail.trim()) {
      toast.error('Name and email are required');
      return;
    }
    
    addCreator({
      name: creatorName,
      email: creatorEmail
    });
    
    setCreatorName('');
    setCreatorEmail('');
    toast.success('Creator added successfully');
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error('Team name is required');
      return;
    }
    
    if (selectedCreators.length === 0) {
      toast.error('Please select at least one team member');
      return;
    }
    
    createTeam({
      name: teamName,
      description: teamDescription,
      members: selectedCreators
    });
    
    setTeamName('');
    setTeamDescription('');
    setSelectedCreators([]);
    toast.success('Team created successfully');
  };

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId)
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Creator Management</h2>
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Creator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Creator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="creator-name">Creator Name</Label>
                  <Input 
                    id="creator-name" 
                    value={creatorName} 
                    onChange={(e) => setCreatorName(e.target.value)} 
                    placeholder="Enter creator name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creator-email">Creator Email</Label>
                  <Input 
                    id="creator-email" 
                    type="email"
                    value={creatorEmail} 
                    onChange={(e) => setCreatorEmail(e.target.value)} 
                    placeholder="Enter creator email"
                  />
                </div>
                <Button onClick={handleAddCreator} className="w-full">Add Creator</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input 
                    id="team-name" 
                    value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)} 
                    placeholder="Enter team name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description (Optional)</Label>
                  <Input 
                    id="team-description" 
                    value={teamDescription} 
                    onChange={(e) => setTeamDescription(e.target.value)} 
                    placeholder="Enter team description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select Team Members</Label>
                  <div className="max-h-60 overflow-y-auto p-2 border rounded-md grid grid-cols-2 gap-2">
                    {creators && creators.length > 0 ? (
                      creators.map(creator => (
                        <div 
                          key={creator.id}
                          className={`p-2 border rounded-md cursor-pointer ${
                            selectedCreators.includes(creator.id) 
                              ? 'bg-primary/20 border-primary' 
                              : ''
                          }`}
                          onClick={() => toggleCreatorSelection(creator.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-sm">{creator.name}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center p-4 text-muted-foreground">
                        No creators available yet
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={handleCreateTeam} className="w-full">Create Team</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="creators">Creators</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creators" className="mt-6">
          {creators && creators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creators.map(creator => (
                <Card key={creator.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                          <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{creator.name}</CardTitle>
                      </div>
                      <div className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {creator.role}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{creator.email}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Voices:</span> {
                          creator.id === 'current' ? 'All' : '0'
                        }
                      </div>
                      <Button variant="outline" size="sm">Manage Voices</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 border rounded-md text-muted-foreground">
              No creators added yet. Click "Add Creator" to get started.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="teams" className="mt-6">
          {teams && teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map(team => (
                <Card key={team.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      {team.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {team.description && (
                      <p className="text-sm text-muted-foreground mb-4">{team.description}</p>
                    )}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Members</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map(memberId => {
                          const member = creators?.find(c => c.id === memberId);
                          return member ? (
                            <div key={member.id} className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-[8px]">{getInitials(member.name)}</AvatarFallback>
                              </Avatar>
                              <span>{member.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Shared Voices:</span> 0
                      </div>
                      <Button variant="outline" size="sm">Manage Team</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 border rounded-md text-muted-foreground">
              No teams created yet. Click "Create Team" to get started.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorManagement;
