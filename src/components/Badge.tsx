type BadgeProps = {
  children: React.ReactNode;
  color?: "default" | "green" | "blue" | "amber";
  className?: string;
};

export default function Badge({ children, color = "default", className }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const palette: Record<string, string> = {
    default: "bg-black/5 dark:bg-white/10 text-foreground/70",
    green: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    blue: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
    amber: "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-300",
  };
  const classes = [base, palette[color], className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}

