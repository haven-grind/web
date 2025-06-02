import { Footer } from '@/components/footer';
import { GameCard } from '@/components/games/game-card';
import GameContentAbout from '@/components/games/portal/game-content-about';
import GameContentComment from '@/components/games/portal/game-content-comment';
import GameContentPlay from '@/components/games/portal/game-content-play';
import GameDetail from '@/components/games/portal/game-detail';
import GameInformation from '@/components/games/portal/game-information';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface GameProps {
    id: number;
    developer: string;
    title: string;
    description: string;
    game_path: string;
    thumbnail: string;
    genres: string[];
    screenshots: string[];
    comments: {
        id: number;
        user: {
            id: number;
            name: string;
        };
        content: string;
        createdAt: string;
    }[];
    createdAt: string;
}

interface SimilarGameProps {
    id: number;
    developer: string;
    title: string;
    thumbnail: string;
    genres: string[];
}

export default function PlayGame({ game, similarGames }: { game: GameProps; similarGames: SimilarGameProps[] }) {
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
                        {game.thumbnail ? (
                            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
                                <img src={game.thumbnail} alt={game.title} className="h-full w-full object-cover" />
                            </div>
                        ) : (
                            <div className="mb-6 flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                <span className="text-gray-500 dark:text-gray-400">No Cover Image Available</span>
                            </div>
                        )}

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
                                    <GameContentAbout descriptions={game.description.split('\n\n')} />
                                </TabsContent>
                                <TabsContent value="comments" className="mt-4">
                                    <GameContentComment comments={game.comments} />
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div>
                            <h2 className="mb-4 text-2xl font-bold">More Games Like This</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {similarGames.length > 0 ? (
                                    similarGames.map((game) => (
                                        <GameCard
                                            key={game.id}
                                            id={game.id}
                                            href={`/play/${game.id}`}
                                            title={game.title}
                                            thumbnail={game.thumbnail}
                                            developer={game.developer}
                                            genre={game.genres}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-2 text-gray-500 dark:text-gray-400">No Similar Games Available</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <GameDetail game={game} />
                        <GameInformation developer={game.developer} releaseDate={game.createdAt} />

                        <div className="rounded-lg border p-6">
                            <h3 className="mb-4 font-semibold">Screenshots</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {game.screenshots?.length ? (
                                    game.screenshots.map((screenshot, i) => (
                                        <div key={i} className="relative aspect-video overflow-hidden rounded-md">
                                            <img src={screenshot} alt={`Screenshot ${i + 1}`} className="object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center text-gray-500 dark:text-gray-400">No Screenshots Available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </AppLayout>
    );
}
