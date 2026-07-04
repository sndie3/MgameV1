import React, { memo } from 'react';

interface GameCardProps {
  imageSrc: string;
  title: string;
  size?: 'big' | 'small';
}

const GameCard: React.FC<GameCardProps> = ({ imageSrc, title, size = 'small' }) => {
  const height = size === 'big' ? '280px' : '140px';
  
  return (
    <div 
      className="relative rounded-[16px] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer border border-gray-700/50"
      style={{ height }}
    >
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30">
          <span className="text-white/70 text-xl font-bold tracking-wider">{title}</span>
        </div>
      )}
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default memo(GameCard);
