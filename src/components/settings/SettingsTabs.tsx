
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Key, Lock } from 'lucide-react';
import { AccountSettings } from './AccountSettings';
import { NotificationSettings } from './NotificationSettings';
import { ApiSettings } from './ApiSettings';
import { SecuritySettings } from './SecuritySettings';

export const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-4 gap-4 w-full md:w-auto">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Account</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          <span className="hidden md:inline">API</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="hidden md:inline">Security</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="api">
        <ApiSettings />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  );
};
