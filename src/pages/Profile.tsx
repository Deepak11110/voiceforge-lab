
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/layouts/DashboardLayout';

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);

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
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
                  {isEditMode ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  This information is displayed publicly so be careful what you share.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Name
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                    {user.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                    {user.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
