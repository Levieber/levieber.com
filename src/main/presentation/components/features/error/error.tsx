import { Button } from "@/main/presentation/components/ui";
import { m } from "@/main/presentation/common/i18n";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="font-heading text-2xl font-semibold">{m.errorTitle()}</h1>
      <p className="font-mono text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="outline">
        {m.errorRetryAction()}
      </Button>
    </div>
  );
}
