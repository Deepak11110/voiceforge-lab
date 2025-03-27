
import React from 'react';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  className,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  };

  return (
    <div className={cn('relative group rounded-md overflow-hidden', className)}>
      <pre className="bg-muted p-4 overflow-x-auto font-mono text-sm">
        <code className="text-foreground">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy to clipboard"
      >
        <ClipboardCopy className="h-4 w-4" />
        <span className="sr-only">Copy to clipboard</span>
      </button>
    </div>
  );
};
