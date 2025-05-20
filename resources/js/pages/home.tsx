import { FeaturedGame } from '@/components/featured-game';
import { Footer } from '@/components/footer';
import { GameCard } from '@/components/game-card';
import { GameCategory } from '@/components/game-category';
import { Navbar } from '@/components/navbar';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 py-8">
                        <section className="mb-12">
                            <FeaturedGame
                                title="Pixel Adventure"
                                description="Embark on an epic journey through a pixel world filled with challenges and mysteries."
                                imageUrl="/images/games/hero-game-thumbnail.jpg"
                                tags={['Adventure', 'Pixel Art', 'Platformer']}
                            />
                        </section>

                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Popular Games</h2>
                                <Link href="/browse" className="text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400">
                                    View all
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {[...Array(5)].map((_, i) => (
                                    <GameCard
                                        key={i}
                                        id={`game-${i}`}
                                        title={`Game Title ${i + 1}`}
                                        imageUrl={`/images/games/hero-game-thumbnail.jpg?text=Game+${i + 1}`}
                                        developer="Game Studio"
                                        tags={['Action', 'Adventure']}
                                        free={i % 2 === 0}
                                        price={i % 2 !== 0 ? 4.99 : undefined}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Categories</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <GameCategory name="Action" count={120} />
                                <GameCategory name="Adventure" count={85} />
                                <GameCategory name="Puzzle" count={64} />
                                <GameCategory name="Strategy" count={42} />
                                <GameCategory name="RPG" count={78} />
                                <GameCategory name="Simulation" count={36} />
                                <GameCategory name="Sports" count={29} />
                                <GameCategory name="Racing" count={31} />
                            </div>
                        </section>

                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">New Releases</h2>
                                <Link
                                    href="/browse?sort=newest"
                                    className="text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {[...Array(5)].map((_, i) => (
                                    <GameCard
                                        key={i}
                                        id={`new-game-${i}`}
                                        title={`New Game ${i + 1}`}
                                        imageUrl={`/images/games/hero-game-thumbnail.jpg?text=New+Game+${i + 1}`}
                                        developer="Indie Developer"
                                        tags={['Indie', 'Casual']}
                                        free={i % 3 === 0}
                                        price={i % 3 !== 0 ? 2.99 : undefined}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
