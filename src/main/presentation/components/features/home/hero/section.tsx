import { HeroCopy } from "@/main/presentation/components/features/home/hero/copy";

export function HeroSection() {
  return (
    <section className="relative px-6 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28" id="top">
      <div className="mx-auto max-w-3xl">
        <HeroCopy />
      </div>
    </section>
  );
}
