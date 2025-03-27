
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AppHeader: React.FC = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Deep Labs</h1>
        
        <nav className="flex items-center gap-6">
          <Tabs defaultValue="voices" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="voices">Voices</TabsTrigger>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            Documentation
          </Button>
          <Button variant="outline">
            Feedback
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
