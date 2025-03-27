
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';
import { SettingsTabs } from '@/components/settings/SettingsTabs';

const Settings = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <DashboardLayout withDashboardContext={false}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    toast.error('You must be logged in to view this page');
    return null;
  }

  return (
    <DashboardLayout withDashboardContext={false}>
      <div className="container mx-auto py-6 space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        
        <SettingsTabs />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
