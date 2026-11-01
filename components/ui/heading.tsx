import * as React from "react";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = "", level = 2, children, ...props }, ref) => {
    const sizes = {
      1: "text-5xl md:text-7xl font-bold tracking-tight",
      2: "text-3xl md:text-5xl font-bold tracking-tight",
      3: "text-2xl md:text-3xl font-semibold tracking-tight",
      4: "text-xl md:text-2xl font-semibold tracking-tight",
      5: "text-lg md:text-xl font-semibold tracking-tight",
      6: "text-base md:text-lg font-medium tracking-tight",
    };

    const headingClasses = `${sizes[level]} ${className}`;

    if (level === 1) {
      return (
        <h1 ref={ref} className={headingClasses} {...props}>
          {children}
        </h1>
      );
    }
    if (level === 2) {
      return (
        <h2 ref={ref} className={headingClasses} {...props}>
          {children}
        </h2>
      );
    }
    if (level === 3) {
      return (
        <h3 ref={ref} className={headingClasses} {...props}>
          {children}
        </h3>
      );
    }
    if (level === 4) {
      return (
        <h4 ref={ref} className={headingClasses} {...props}>
          {children}
        </h4>
      );
    }
    if (level === 5) {
      return (
        <h5 ref={ref} className={headingClasses} {...props}>
          {children}
        </h5>
      );
    }
    return (
      <h6 ref={ref} className={headingClasses} {...props}>
        {children}
      </h6>
    );
  },
);

Heading.displayName = "Heading";

export { Heading };
