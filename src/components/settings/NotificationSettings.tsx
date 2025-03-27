
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

export const NotificationSettings = () => {
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
    },
  });

  const handleNotificationsSubmit = (data: NotificationsFormValues) => {
    toast.success('Notification preferences updated');
    console.log('Notification settings:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...notificationsForm}>
          <form id="notifications-form" onSubmit={notificationsForm.handleSubmit(handleNotificationsSubmit)} className="space-y-6">
            <FormField
              control={notificationsForm.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications about your account via email.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={notificationsForm.control}
              name="marketingEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Marketing Emails</FormLabel>
                    <FormDescription>
                      Receive marketing emails about new features and offers.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="notifications-form">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};
