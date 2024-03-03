import { ArrowUpRightIcon } from "lucide-react";
import { ExternalLink } from "@/main/presentation/components/ui";
import { m } from "@/main/presentation/common/i18n";

export function SocialActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <ExternalLink
        asButton
        href="https://github.com/Levieber"
        rel="noopener noreferrer"
        target="_blank"
        variant="outline"
      >
        {m.socialGithubLabel()}
        <ArrowUpRightIcon />
      </ExternalLink>

      <ExternalLink
        asButton
        href="https://www.linkedin.com/in/levi-eber"
        rel="noopener noreferrer"
        target="_blank"
        variant="outline"
      >
        {m.socialLinkedinLabel()}
        <ArrowUpRightIcon />
      </ExternalLink>
    </div>
  );
}
