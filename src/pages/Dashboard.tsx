
import React from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import { toast } from 'sonner';

// We don't need to make toast available globally since we're using it properly
// through the import in components that need it

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VoiceManagement />
          </div>
          
          <div>
            <TextToSpeechSection />
          </div>
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
