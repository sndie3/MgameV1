import GameCardSkeleton from '../GameCardSkeleton';

export default function SkeletonLayout() {
  return (
    <div className="space-y-4 opacity-70">
      <div className="grid grid-cols-2 gap-3">
        <GameCardSkeleton size="big" />
        <div className="grid grid-rows-2 gap-3">
          <GameCardSkeleton size="small" />
          <GameCardSkeleton size="small" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <GameCardSkeleton size="small" />
        <GameCardSkeleton size="small" />
        <GameCardSkeleton size="small" />
      </div>
    </div>
  );
}