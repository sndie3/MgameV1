export default function GameCardSkeleton({ size = 'small' }: { size?: 'big' | 'small' }) {
  const height = size === 'big' ? '280px' : '140px';
  
  return (
    <div 
      className="relative rounded-[16px] overflow-hidden bg-[#1a1a1a] animate-pulse border border-gray-700/50"
      style={{ height }}
    >
      <div className="w-full h-full bg-gradient-to-br from-gray-800/30 via-gray-700/30 to-gray-800/30"></div>
    </div>
  );
}