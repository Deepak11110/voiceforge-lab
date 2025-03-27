
import React from 'react';
import AppHeader from '@/components/dashboard/AppHeader';
import VoiceDetails from '@/components/VoiceDetails';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { selectedVoice, detailsVisible, closeDetails } = useDashboard();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container py-6">
        {children}
      </main>
      
      {detailsVisible && <VoiceDetails voice={selectedVoice} onClose={closeDetails} />}
    </div>
  );
};

export default DashboardLayout;
