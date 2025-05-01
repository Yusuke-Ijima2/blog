import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export function Loading({ text = "読み込み中..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
