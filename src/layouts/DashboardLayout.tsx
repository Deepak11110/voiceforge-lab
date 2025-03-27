
import React from 'react';
import AppHeader from '@/components/dashboard/AppHeader';
import VoiceDetails from '@/components/VoiceDetails';
import { useDashboard } from '@/contexts/DashboardContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  withDashboardContext?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  withDashboardContext = false 
}) => {
  // Only try to use the dashboard context if we're in a dashboard context page
  const dashboardContext = withDashboardContext ? useDashboard() : null;
  
  const renderContent = () => (
    <main className="flex-1">
      {children}
    </main>
  );
  
  const renderVoiceDetails = () => {
    if (withDashboardContext && dashboardContext?.detailsVisible) {
      return (
        <VoiceDetails 
          voice={dashboardContext.selectedVoice} 
          onClose={dashboardContext.closeDetails} 
        />
      );
    }
    return null;
  };

  // The content we'll render within the SidebarInset
  const content = (
    <SidebarInset className="bg-background flex flex-col">
      <AppHeader />
      {renderContent()}
      {renderVoiceDetails()}
    </SidebarInset>
  );

  // If we're already within a SidebarProvider (from Dashboard.tsx), just return the content
  if (withDashboardContext) {
    return content;
  }
  
  // Otherwise, wrap the content with SidebarProvider
  return (
    <SidebarProvider>
      {content}
    </SidebarProvider>
  );
};

export default DashboardLayout;
