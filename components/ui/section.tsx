import * as React from "react";

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "section" | "div";
};

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className = "", as = "section", children, ...props }, ref) => {
    const Component = as;
    return (
      <Component ref={ref} className={`py-20 space-y-10 ${className}`} {...props}>
        {children}
      </Component>
    );
  },
);

Section.displayName = "Section";

export { Section };
