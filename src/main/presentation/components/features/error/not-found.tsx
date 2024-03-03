import { Link } from "@/main/presentation/components/ui";
import { m } from "@/main/presentation/common/i18n";

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="font-heading text-2xl font-semibold">{m.notFoundTitle()}</h1>
      <p className="font-mono text-sm text-muted-foreground">{m.notFoundDescription()}</p>
      <Link asButton to="/" variant="outline">
        {m.notFoundAction()}
      </Link>
    </div>
  );
}
