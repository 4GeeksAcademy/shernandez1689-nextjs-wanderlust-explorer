interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
      <span className="text-4xl" aria-hidden="true">
        🧭
      </span>
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="max-w-md text-muted">{description}</p>
      {action}
    </div>
  );
}
