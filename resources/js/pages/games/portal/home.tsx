import { FeaturedGame } from '@/components/featured-game';
import { Footer } from '@/components/footer';
import { GameCard } from '@/components/games/game-card';
import { GameCategory } from '@/components/games/game-category';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface GenreProps {
    id: number;
    name: string;
    gameCount: number;
}

interface FeaturedGameProps {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    genres: string[];
}

interface GameProps {
    id: number;
    developer: string;
    title: string;
    thumbnail: string;
    genres: string[];
}

export default function Home({
    genres,
    featuredGame,
    popularGames,
    newReleasedGames,
}: {
    genres: GenreProps[];
    featuredGame: FeaturedGameProps | null;
    popularGames: GameProps[];
    newReleasedGames: GameProps[];
}) {
    const breadcrumbs = [{ title: 'Home', href: '/' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />

            <main className="container mx-auto px-4 py-8">
                {featuredGame ? (
                    <section className="mb-12">
                        <FeaturedGame
                            title={featuredGame.title}
                            description={featuredGame.description}
                            href={`/play/${featuredGame.id}`}
                            thumbnail={featuredGame.thumbnail}
                            genres={featuredGame.genres}
                        />
                    </section>
                ) : null}

                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Popular Games</h2>
                        <Link href="/games" className="text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400">
                            View all
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {popularGames.map((game) => (
                            <GameCard
                                key={game.id}
                                id={game.id}
                                href={`/play/${game.id}`}
                                developer={game.developer}
                                title={game.title}
                                thumbnail={game.thumbnail}
                                genre={game.genres}
                            />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Genres</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {genres.map((genre) => (
                            <GameCategory key={genre.id} name={genre.name} count={genre.gameCount} />
                        ))}
                        <Link href={'/games'}>
                            <Card className="transition-all hover:border-pink-600/50 hover:shadow-md">
                                <CardContent className="flex items-center justify-between p-6">
                                    <h3 className="text-lg font-semibold">See All Genres</h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        <ArrowRight />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">New Releases</h2>
                        <Link href="/games" className="text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400">
                            View all
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {newReleasedGames.map((game) => (
                            <GameCard
                                key={game.id}
                                id={game.id}
                                href={`/play/${game.id}`}
                                developer={game.developer}
                                title={game.title}
                                thumbnail={game.thumbnail}
                                genre={game.genres}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </AppLayout>
    );
}
