
import React from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import AssetLibrary from '@/components/dashboard/AssetLibrary';
import CreatorManagement from '@/components/dashboard/CreatorManagement';
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { 
  Home, 
  Mic, 
  Users, 
  FolderOpen, 
  Settings,
  LayoutDashboard,
  FileAudio,
  BookOpen,
  Code,
  LogOut
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState<'voices' | 'creators' | 'assets'>('voices');
  
  // Helper to check if a path is active
  const isActive = (path: string) => location.pathname === path;
  
  // Component to render based on active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'voices':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VoiceManagement />
            </div>
            <div>
              <TextToSpeechSection />
            </div>
          </div>
        );
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
          {/* Enhanced Sidebar */}
          <Sidebar>
            <SidebarHeader className="flex flex-col items-center justify-center py-6 gap-2 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">D</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Deep Labs</h1>
              </div>
              <p className="text-sm text-muted-foreground">AI Voice Platform</p>
            </SidebarHeader>
            
            <SidebarContent className="py-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'voices'}
                    onClick={() => setActiveSection('voices')}
                    tooltip="Voice Management"
                  >
                    <Mic className="h-5 w-5" />
                    <span>Voice Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'creators'}
                    onClick={() => setActiveSection('creators')}
                    tooltip="Creators & Teams"
                  >
                    <Users className="h-5 w-5" />
                    <span>Creators & Teams</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'assets'}
                    onClick={() => setActiveSection('assets')}
                    tooltip="Asset Library"
                  >
                    <FolderOpen className="h-5 w-5" />
                    <span>Asset Library</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarSeparator className="my-2" />
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive('/api-docs')}
                    tooltip="API Documentation"
                  >
                    <Link to="/api-docs">
                      <Code className="h-5 w-5" />
                      <span>API Docs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive('/settings')}
                    tooltip="Settings"
                  >
                    <Link to="/settings">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter className="mt-auto border-t border-sidebar-border py-3">
              <div className="flex items-center px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-3 space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@deeplabs.ai</p>
                </div>
              </div>
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

export default Dashboard;
