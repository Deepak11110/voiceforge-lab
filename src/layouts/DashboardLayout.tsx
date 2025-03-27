
import React from 'react';
import AppHeader from '@/components/dashboard/AppHeader';
import VoiceDetails from '@/components/VoiceDetails';
import { useDashboard } from '@/contexts/DashboardContext';

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
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container py-6">
        {children}
      </main>
      
      {withDashboardContext && dashboardContext?.detailsVisible && (
        <VoiceDetails 
          voice={dashboardContext.selectedVoice} 
          onClose={dashboardContext.closeDetails} 
        />
      )}
    </div>
  );
};

export default DashboardLayout;
