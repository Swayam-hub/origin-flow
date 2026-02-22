import Skeleton from '@/components/ui/Skeleton'

export function TableSkeleton({ cols = 5, rows = 8 }: { cols?: number; rows?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl overflow-hidden">
      {/* header */}
      <div
        className="grid gap-3 p-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4" />
        ))}
      </div>

      <div className="h-px bg-border" />

      {/* rows */}
      <div className="space-y-0">
        {Array.from({ length: rows }).map((_, r) => (
          <div
            key={r}
            className="grid gap-3 p-4 border-b border-border last:border-b-0"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
