
import React from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import AssetLibrary from '@/components/dashboard/AssetLibrary';
import CreatorManagement from '@/components/dashboard/CreatorManagement';
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Mic, Users, FolderOpen, Settings } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="flex flex-col items-center justify-center py-6 gap-2">
              <h1 className="text-2xl font-bold">Deep Labs</h1>
              <p className="text-sm text-muted-foreground">AI Voice Platform</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeSection === 'voices'}
                    onClick={() => setActiveSection('voices')}
                    tooltip="Voices"
                  >
                    <Mic className="h-5 w-5" />
                    <span>Voices</span>
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
