import { memo } from 'react';
import GameCard from '../GameCard';
import type { Game } from '../../utils/layoutGenerator';

interface PatternThreeProps {
  games: Game[];
}

export default memo(function PatternThree({ games }: PatternThreeProps) {
  if (games.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3">
      {games.map((game) => (
        <GameCard
          key={game.id}
          imageSrc={game.image}
          title={game.title}
          size="small"
        />
      ))}
    </div>
  );
});
