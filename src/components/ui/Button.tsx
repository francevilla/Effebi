import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-medium tracking-[0.01em] transition-[background-color,color] duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-55";

/* Plat: un colore di riempimento, angoli quadri, un solo raggio su tutta la pagina. */
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-ink hover:text-accent-ink",
  secondary: "bg-surface2 text-ink hover:bg-accent hover:text-accent-ink",
  quiet: "text-accent hover:text-ink underline decoration-1 underline-offset-4",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[17px]",
  lg: "min-h-14 px-7 text-[19px]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

function Inner({ children }: { children: ReactNode }) {
  return <span className="relative">{children}</span>;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">>(
  function ButtonLink({ variant = "primary", size = "md", children, className, ...rest }, ref) {
    return (
      <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
        <Inner>{children}</Inner>
      </a>
    );
  }
);

export const Button = forwardRef<HTMLButtonElement, Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">>(
  function Button({ variant = "primary", size = "md", children, className, type = "button", ...rest }, ref) {
    return (
      <button ref={ref} type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
        <Inner>{children}</Inner>
      </button>
    );
  }
);
