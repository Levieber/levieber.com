import {
  type ButtonVariantProps,
  buttonVariants,
} from "@/main/presentation/components/ui/button/button-variants";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@/main/presentation/common/styles/class-name.helper";

type ButtonProps = ButtonPrimitive.Props & ButtonVariantProps;

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
}
