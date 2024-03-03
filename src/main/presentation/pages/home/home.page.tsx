import { ContactSection } from "@/main/presentation/components/features/home/contact/section";
import { HeroSection } from "@/main/presentation/components/features/home/hero/section";
import { WorkSection } from "@/main/presentation/components/features/home/work/section";

export function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
