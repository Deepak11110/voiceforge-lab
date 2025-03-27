import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Download, Upload } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <DashboardLayout withDashboardContext={false}>
        <div className="container py-8">
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p>Please sign in to view your profile</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout withDashboardContext={false}>
      <div className="container py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Card className="w-full md:w-80">
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">Jan 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscription</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Pro Plan
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Usage</span>
                  <span className="font-medium">78%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                  View your account activity and manage your settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="activity">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Recent Activity</h3>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Voice "{i === 1 ? 'Business Narrator' : i === 2 ? 'Friendly Assistant' : 'News Anchor'}" created</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarDays className="mr-1 h-3 w-3" />
                              <span>{i === 1 ? '2 hours ago' : i === 2 ? 'Yesterday' : '3 days ago'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="usage" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Usage</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Characters processed</span>
                          <span className="text-sm font-medium">78,432 / 100,000</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: '78%' }} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Audio generated</span>
                          <span className="text-sm font-medium">4.2 / 10 hours</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: '42%' }} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Voice clones</span>
                          <span className="text-sm font-medium">3 / 5</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: '60%' }} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="billing" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Subscription Details</h3>
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Pro Plan</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your subscription renews on April 21, 2023
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Manage</Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium">Payment History</h3>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Pro Plan - Monthly</p>
                              <p className="text-xs text-muted-foreground">
                                {i === 1 ? 'Mar 21, 2023' : i === 2 ? 'Feb 21, 2023' : 'Jan 21, 2023'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">$29.00</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Voices</CardTitle>
                <CardDescription>
                  Manage your created voices and voice models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm font-medium text-primary">
                            {String.fromCharCode(64 + i)}
                          </span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">
                            {i === 1 ? 'Business Narrator' : i === 2 ? 'Friendly Assistant' : i === 3 ? 'News Anchor' : 'Podcast Host'}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{i === 1 ? 'English (US)' : i === 2 ? 'English (UK)' : i === 3 ? 'Spanish' : 'French'}</span>
                            <span className="mx-1">•</span>
                            <span>{i === 1 || i === 3 ? 'Male' : 'Female'}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Create New Voice
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
