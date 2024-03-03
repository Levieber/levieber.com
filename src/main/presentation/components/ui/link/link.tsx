import { type LinkComponent, createLink } from "@tanstack/react-router";
import { BaseLink } from "@/main/presentation/components/ui/link/base-link";

const InternalLinkComponent = createLink(BaseLink);

// oxlint-disable-next-line func-style  react/function-component-definition-- We want to use a function declaration here because of the LinkComponent type.
export const Link: LinkComponent<typeof InternalLinkComponent> = (props) => (
  <InternalLinkComponent preload="intent" {...props} />
);
