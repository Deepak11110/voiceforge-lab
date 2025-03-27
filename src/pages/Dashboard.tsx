
import React from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import { toast } from 'sonner';

// Make toast available to the DashboardContext
(global as any).toast = toast;

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
