
import React, { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import AssetLibrary from '@/components/dashboard/AssetLibrary';
import CreatorManagement from '@/components/dashboard/CreatorManagement';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarSeparator } from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Home, Mic, Users, FolderOpen, Settings, FileVideo, UserPlus, LayoutTemplate, User2, BrainCircuit, PaintBucket, Upload, PuzzleIcon, Flask, BadgeDollarSign, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'voices' | 'creators' | 'assets'>('voices');
  const { theme, toggleTheme } = useTheme();
  
  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path;
  
  // Component to render based on active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'voices':
        return <DashboardHome />;
      case 'creators':
        return <CreatorManagement />;
      case 'assets':
        return <AssetLibrary />;
      default:
        return null;
    }
  };
  
  return (
    <DashboardProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="flex flex-col items-center gap-2 py-6">
              <div className="text-2xl font-bold">HeyGen</div>
              
              <div className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Amrev</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>1</span>
                    <Badge variant="outline" className="h-5 px-1 py-0 bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                      Team
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                <FileVideo className="mr-2 h-4 w-4" />
                Create Video
              </Button>
              
              <Button variant="ghost" className="w-full justify-start mt-1">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite People
              </Button>
            </SidebarHeader>
            
            <SidebarSeparator />
            
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'voices'}
                    onClick={() => setActiveSection('voices')}
                    tooltip="Home"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Projects"
                  >
                    <FolderOpen className="h-5 w-5" />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Templates"
                  >
                    <LayoutTemplate className="h-5 w-5" />
                    <span>Templates</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              
              <div className="px-3 py-2">
                <h3 className="text-xs font-medium text-sidebar-foreground/70">Assets</h3>
              </div>
              
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Avatars">
                    <User2 className="h-5 w-5" />
                    <span>Avatars</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={isActive('/settings')}
                    tooltip="AI Voice"
                  >
                    <Mic className="h-5 w-5" />
                    <span>AI Voice</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Brand">
                    <PaintBucket className="h-5 w-5" />
                    <span>Brand</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Uploads">
                    <Upload className="h-5 w-5" />
                    <span>Uploads</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              
              <SidebarSeparator />
              
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Integrations">
                    <PuzzleIcon className="h-5 w-5" />
                    <span>Integrations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Labs">
                    <Flask className="h-5 w-5" />
                    <span>Labs</span>
                    <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-100">New</Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter className="px-3 py-2">
              <Button variant="outline" className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50 mb-2">
                <BadgeDollarSign className="mr-2 h-4 w-4" />
                Pricing
              </Button>
              
              <div className="text-center text-xs text-muted-foreground">
                Unlimited creation
              </div>
              
              {/* Dark mode toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-4"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </SidebarFooter>
          </Sidebar>
          
          <DashboardLayout withDashboardContext={true}>
            <div className="container py-6">
              {renderActiveSection()}
            </div>
          </DashboardLayout>
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
};

// New DashboardHome component with stats cards and voice profiles
const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your voice profiles and generations</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Mic className="h-6 w-6 text-blue-500" />} value="5" label="Voice Profiles" />
        <StatCard icon={<Users className="h-6 w-6 text-blue-500" />} value="12" label="Generations" />
        <StatCard icon={<FileVideo className="h-6 w-6 text-blue-500" />} value="24:15" label="Audio Duration" />
        <StatCard icon={<User2 className="h-6 w-6 text-blue-500" />} value="3" label="Saved Favorites" />
      </div>
      
      {/* Tabs */}
      <div className="bg-muted/50 p-1 rounded-lg flex">
        <Button variant="default" className="flex-1 rounded-md">Voice Profiles</Button>
        <Button variant="ghost" className="flex-1 rounded-md">Generate</Button>
        <Button variant="ghost" className="flex-1 rounded-md">History</Button>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Voice Profiles</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">+</span> Add Profile
        </Button>
      </div>
      
      {/* Voice cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VoiceCard 
          title="Professional Male Voice" 
          date="June 15, 2023"
        />
        <VoiceCard 
          title="Casual Female Voice" 
          date="August 22, 2023" 
        />
      </div>
    </div>
  );
};

// Stat card component
const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => {
  return (
    <div className="bg-card border p-4 rounded-lg flex items-center gap-4">
      <div className="rounded-full p-2 bg-background">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
};

// Voice card component
const VoiceCard = ({ title, date }: { title: string, date: string }) => {
  return (
    <div className="border bg-card rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between">
        <h3 className="font-bold">{title}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 bg-background border-t">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{date}</div>
        
        <div className="mt-4 flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
            <Mic className="h-4 w-4" />
          </Button>
          
          <div className="flex-grow h-2 bg-muted rounded-full">
            <div className="bg-blue-500 h-full w-0 rounded-full"></div>
          </div>
          
          <div className="text-xs text-muted-foreground">0:00 / 0:16</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
