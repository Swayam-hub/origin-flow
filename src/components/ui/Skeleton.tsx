import clsx from 'clsx'

export default function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse rounded-lg bg-muted/50', className)} />
}
