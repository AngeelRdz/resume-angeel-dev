import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";

import { cn } from "@/shared/utils/cn";
import type { ExternalHref } from "@/shared/types/links";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
};

type ButtonElementProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: undefined;
    download?: never;
  };

type InternalLinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children"> & {
    href: Route;
    download?: never;
  };

type ExternalLinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> & {
    href: ExternalHref;
    download?: boolean;
  };

type ButtonProps = ButtonElementProps | InternalLinkProps | ExternalLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary dark:bg-[#2d4a3a] dark:text-white dark:hover:bg-[#2d4a3a]/90",
  secondary:
    "border border-primary/30 bg-transparent text-primary hover:bg-primary/10 focus-visible:outline-primary/40 dark:border-[#2d4a3a]/50 dark:text-white dark:hover:bg-[#2d4a3a]/20",
  ghost:
    "text-foreground/70 hover:text-foreground hover:bg-foreground/10 focus-visible:outline-foreground/40",
};

function isExternalHref(
  href: ButtonProps["href"],
): href is ExternalLinkProps["href"] {
  if (!href) {
    return false;
  }

  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const {
      children,
      className,
      variant = "primary",
      icon,
      href,
      download,
      ...anchorRest
    } = props;

    const classes = cn(
      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      variantClasses[variant],
      className,
    );

    const linkContent = (
      <>
        {icon}
        <span>{children}</span>
      </>
    );

    if (isExternalHref(href)) {
      const { target, rel, ...externalRest } = anchorRest;
      const resolvedTarget =
        target ?? (href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank");
      const resolvedRel =
        rel ?? (resolvedTarget === "_blank" ? "noreferrer" : undefined);

      return (
        <a
          className={classes}
          href={href}
          target={resolvedTarget}
          rel={resolvedRel}
          download={download}
          {...externalRest}
        >
          {linkContent}
        </a>
      );
    }

    return <Link className={classes} href={href} {...anchorRest} />;
  }

  const {
    children,
    className,
    variant = "primary",
    icon,
    type,
    ...buttonRest
  } = props;

  const classes = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    className,
  );

  return (
    <button
      className={classes}
      type={type ?? "button"}
      {...buttonRest}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}


