import { GameCard } from '@/components/games/game-card';

interface GameProps {
    id: number;
    developer: string;
    title: string;
    thumbnail: string;
    genres: string[];
}

export default function GameList({ games }: { games: GameProps[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    thumbnail={game.thumbnail || '/images/games/hero-game-thumbnail.jpg'}
                    developer={game.developer}
                    genre={game.genres}
                />
            ))}
        </div>
    );
}
