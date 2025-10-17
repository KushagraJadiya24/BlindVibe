type ProgressProps = {
  value: number; // 0-100
};

export default function Progress({ value }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-fuchsia-500 to-emerald-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

