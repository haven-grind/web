import { Footer } from '@/components/footer';
import { GameCard } from '@/components/games/game-card';
import GameContentAbout from '@/components/games/panel/game-content-about';
import GameContentComment from '@/components/games/panel/game-content-comment';
import GameContentPlay from '@/components/games/panel/game-content-play';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Game } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Share2, Star } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function GameShow({ game }: { game: Game }) {
    const breadcrumbs = [
        { title: 'Game', href: '/game' },
        { title: 'Detail', href: '/game' },
    ];

    const { delete: destroy, reset } = useForm();

    const onSubmit =
        (game: Game): FormEventHandler =>
        (e) => {
            e.preventDefault();

            destroy(route('game.destroy', { id: game.id }), {
                onFinish: () => reset(),
            });
        };

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
                                {[...Array(3)].map((_, i) => (
                                    <GameCard
                                        key={i}
                                        id={`similar-game-${i}`}
                                        title={`Similar Game ${i + 1}`}
                                        imageUrl={`/images/games/hero-game-thumbnail.jpg?text=Similar+Game+${i + 1}`}
                                        developer="Game Studio"
                                        tags={['Action', 'Adventure']}
                                        free={i === 0}
                                        price={i !== 0 ? 4.99 : undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg border p-6">
                            <h1 className="mb-2 text-3xl font-bold">{game.title}</h1>
                            <div className="mb-4 flex items-center gap-2">
                                <Link href="/developer/game-studio" className="text-sm text-pink-600 hover:underline">
                                    By Game Studio
                                </Link>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Released: Jan 15, 2023</span>
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                                <Badge>Action</Badge>
                                <Badge>Adventure</Badge>
                                <Badge>Indie</Badge>
                            </div>

                            <div className="mb-6 flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                ))}
                                <span className="ml-2 text-sm font-medium">4.2 (128 reviews)</span>
                            </div>

                            <div className="flex justify-between">
                                <div className="text-3xl font-bold">$9.99</div>
                                <Button variant="ghost" size="sm">
                                    <Share2 className="mr-1 h-4 w-4" /> Share
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-lg border p-6">
                            <h3 className="mb-4 font-semibold">Game Information</h3>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-gray-400">Developer</dt>
                                    <dd>Game Studio</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-gray-400">Publisher</dt>
                                    <dd>Game Publisher</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-gray-400">Release Date</dt>
                                    <dd>Jan 15, 2023</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-gray-400">Platform</dt>
                                    <dd>Web, Windows, Mac</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-gray-400">Languages</dt>
                                    <dd>English, Spanish, French</dd>
                                </div>
                            </dl>
                        </div>

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
                <form onSubmit={onSubmit(game)}>
                    <button>Delete Game</button>
                </form>
            </main>

            <Footer />
        </AppLayout>
    );
}
