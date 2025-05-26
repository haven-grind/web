import { GameCard } from '@/components/game-card';
import { Game } from '@/types';

export default function GameList({ games }: { games: Game[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game, i) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    imageUrl={`/images/games/hero-game-thumbnail.jpg?text=My+Game+${i + 1}`}
                    developer="Your Studio"
                    tags={['Action', i % 2 === 0 ? 'Adventure' : 'Puzzle']}
                    free={i % 3 === 0}
                    price={i % 3 !== 0 ? (i % 2 === 0 ? 4.99 : 2.99) : undefined}
                />
            ))}
        </div>
    );
}
