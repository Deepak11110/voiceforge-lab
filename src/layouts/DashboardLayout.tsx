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
  
  const content = (
    <SidebarInset className="bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1">
        {children}
      </main>
      
      {withDashboardContext && dashboardContext?.detailsVisible && (
        <VoiceDetails 
          voice={dashboardContext.selectedVoice} 
          onClose={dashboardContext.closeDetails} 
        />
      )}
    </SidebarInset>
  );

  // If we're using the dashboard context, we're already within a SidebarProvider from Dashboard.tsx
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
