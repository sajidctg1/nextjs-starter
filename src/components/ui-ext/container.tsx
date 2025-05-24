import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const containerVariants = cva("max-w-8xl mx-auto py-4 lg:py-6 lg:px-6", {
  variants: {
    variant: {
      narrowConstrainedPadded: "max-w-4xl px-4",
      constrainedPadded: "px-4",
      fullMobileConstrainedPadded: "",
      breakpointPadded: "container px-4",
      fullMobileBreakpointPadded: "container",
    },
  },
  defaultVariants: {
    variant: "constrainedPadded",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = ({
  asChild,
  className,
  children,
  variant,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? React.Fragment : "div";
  const containerClasses = cn(containerVariants({ variant }), className);

  return (
    <Comp className={containerClasses} {...props}>
      {variant === "narrowConstrainedPadded" ? (
        <div className="mx-auto max-w-3xl">{children}</div>
      ) : (
        children
      )}
    </Comp>
  );
};

export { Container, containerVariants };
