import { memo } from 'react';
import GameCard from '../GameCard';
import type { Game } from '../../utils/layoutGenerator';

interface PatternTwoProps {
  games: Game[];
}

export default memo(function PatternTwo({ games }: PatternTwoProps) {
  if (games.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="grid grid-rows-2 gap-3">
        {games[0] && (
          <GameCard
            key={games[0].id}
            imageSrc={games[0].image}
            title={games[0].title}
            size="small"
          />
        )}
        {games[1] && (
          <GameCard
            key={games[1].id}
            imageSrc={games[1].image}
            title={games[1].title}
            size="small"
          />
        )}
      </div>
      {games[2] && (
        <GameCard
          key={games[2].id}
          imageSrc={games[2].image}
          title={games[2].title}
          size="big"
        />
      )}
    </div>
  );
});
