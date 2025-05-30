import { Footer } from '@/components/footer';
import { GameCard } from '@/components/games/game-card';
import GameContentAbout from '@/components/games/portal/game-content-about';
import GameContentComment from '@/components/games/portal/game-content-comment';
import GameContentPlay from '@/components/games/portal/game-content-play';
import GameDetail from '@/components/games/portal/game-detail';
import GameInformation from '@/components/games/portal/game-information';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Game } from '@/types';
import { Head } from '@inertiajs/react';

export default function PlayGame({ game, similarGames }: { game: Game; similarGames: Game[] }) {
    const breadcrumbs = [
        { title: 'Games', href: '/games' },
        { title: game.title, href: `/play/${game.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={game.title} />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                            <img src="/images/games/hero-game-thumbnail.jpg?text=Game+Screenshot" alt="Game Screenshot" className="object-cover" />
                        </div>

                        <div className="mb-8">
                            <Tabs defaultValue="play">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="play">Play Game</TabsTrigger>
                                    <TabsTrigger value="about">About</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                </TabsList>
                                <TabsContent value="play" className="mt-4">
                                    <GameContentPlay path={game.game_path} />
                                </TabsContent>
                                <TabsContent value="about" className="mt-4 space-y-4">
                                    <GameContentAbout />
                                </TabsContent>
                                <TabsContent value="comments" className="mt-4">
                                    <GameContentComment />
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-bold">More Games Like This</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {similarGames.map((game, i) => (
                                    <GameCard
                                        key={game.id}
                                        id={game.id}
                                        href={`/play/${game.id}`}
                                        title={game.title}
                                        imageUrl={`/images/games/hero-game-thumbnail.jpg?text=Similar+Game+${i + 1}`}
                                        developer="Game Studio"
                                        genre={['Action', 'Adventure']}
                                        free={i === 0}
                                        price={i !== 0 ? 4.99 : undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <GameDetail game={game} />
                        <GameInformation />

                        <div className="rounded-lg border p-6">
                            <h3 className="mb-4 font-semibold">Screenshots</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="relative aspect-video overflow-hidden rounded-md">
                                        <img
                                            src={`/images/games/hero-game-thumbnail.jpg?text=Screenshot+${i + 1}`}
                                            alt={`Screenshot ${i + 1}`}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </AppLayout>
    );
}
