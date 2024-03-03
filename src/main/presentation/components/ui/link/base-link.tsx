import {
  type ButtonVariantProps,
  buttonVariants,
} from "@/main/presentation/components/ui/button/button-variants";
import { cn } from "@/main/presentation/common/styles/class-name.helper";

export type BaseLinkProps = React.ComponentPropsWithRef<"a"> &
  (
    | {
        asButton?: false;
        variant?: never;
        size?: never;
      }
    | ({
        asButton: true;
      } & ButtonVariantProps)
  );

export function BaseLink({ asButton, className, variant, size, ref, ...props }: BaseLinkProps) {
  return (
    // oxlint-disable-next-line jsx-a11y/anchor-has-content The anchor will have content because of the children prop, but the linter doesn't know that.
    <a
      ref={ref}
      {...props}
      className={
        asButton
          ? cn(
              buttonVariants({
                className,
                size,
                variant,
              }),
            )
          : className
      }
    />
  );
}
