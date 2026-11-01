import * as React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = "", size = "lg", children, ...props }, ref) => {
    const sizes = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-5xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    return (
      <div ref={ref} className={`mx-auto px-6 ${sizes[size]} ${className}`} {...props}>
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export { Container };
