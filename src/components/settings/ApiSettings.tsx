
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Key } from 'lucide-react';

const apiFormSchema = z.object({
  apiKey: z.string(),
});

type ApiFormValues = z.infer<typeof apiFormSchema>;

export const ApiSettings = () => {
  const apiForm = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiKey: 'sk-xxxx-xxxx-xxxx-xxxx-xxxx',
    },
  });

  const handleApiSubmit = (data: ApiFormValues) => {
    toast.success('API key generated');
    console.log('API settings:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Manage your API keys and access tokens.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...apiForm}>
          <form id="api-form" onSubmit={apiForm.handleSubmit(handleApiSubmit)} className="space-y-6">
            <FormField
              control={apiForm.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" {...field} readOnly />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your API key is secret. Never share it with anyone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">API Documentation</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Use this API key to authenticate requests to our API endpoints.
              </p>
              <div className="text-sm bg-background p-2 rounded border font-mono">
                curl -X GET https://api.example.com/v1/voices \<br />
                -H "Authorization: Bearer YOUR_API_KEY"
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="api-form">
          Generate New Key
        </Button>
      </CardFooter>
    </Card>
  );
};
