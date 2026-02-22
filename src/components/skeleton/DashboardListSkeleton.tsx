import Skeleton from '@/components/ui/Skeleton'

export function DashboardListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      {/* list */}
      <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl overflow-hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border last:border-b-0 p-4"
          >
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-8 w-20 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
