
import React from 'react';
import { Filter, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterBarProps {
  categoryFilter: string[];
  setCategoryFilter: (categories: string[]) => void;
  languageFilter: string[];
  setLanguageFilter: (languages: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  languageFilter,
  setLanguageFilter,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Categories</span>
            {categoryFilter.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center"
              >
                {categoryFilter.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {['Narration', 'Conversational', 'News', 'Characters', 'Social Media'].map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={categoryFilter.includes(category)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setCategoryFilter([...categoryFilter, category]);
                } else {
                  setCategoryFilter(categoryFilter.filter(item => item !== category));
                }
              }}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">Languages</span>
            {languageFilter.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-1 rounded-full h-5 w-5 p-0 flex items-center justify-center"
              >
                {languageFilter.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {['Hindi', 'English (Indian)', 'Tamil', 'Marathi', 'Bengali', 'Punjabi', 'Telugu', 'Malayalam', 'Kannada', 'Gujarati'].map((language) => (
            <DropdownMenuCheckboxItem
              key={language}
              checked={languageFilter.includes(language)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setLanguageFilter([...languageFilter, language]);
                } else {
                  setLanguageFilter(languageFilter.filter(item => item !== language));
                }
              }}
            >
              {language}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="outline">
        Recent
      </Button>
    </div>
  );
};

export default FilterBar;
