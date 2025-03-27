
import React, { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import VoiceManagement from '@/components/dashboard/VoiceManagement';
import TextToSpeechSection from '@/components/dashboard/TextToSpeechSection';
import AssetLibrary from '@/components/dashboard/AssetLibrary';
import CreatorManagement from '@/components/dashboard/CreatorManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('voices');
  
  return (
    <DashboardProvider>
      <DashboardLayout withDashboardContext={true}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="voices">Voice Management</TabsTrigger>
            <TabsTrigger value="creators">Creators & Teams</TabsTrigger>
            <TabsTrigger value="assets">Asset Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="voices" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VoiceManagement />
              </div>
              
              <div>
                <TextToSpeechSection />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="creators" className="mt-6">
            <CreatorManagement />
          </TabsContent>
          
          <TabsContent value="assets" className="mt-6">
            <AssetLibrary />
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
