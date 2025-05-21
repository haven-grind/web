import { Footer } from '@/components/footer';
import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Game } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    gameCount,
    totalPlays,
    commentCount,
    games,
}: {
    gameCount: number;
    totalPlays: number;
    commentCount: number;
    games: Game[];
}) {
    const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <main className="container mx-auto space-y-8 px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Games</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{gameCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Plays</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalPlays}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Comments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{commentCount}</div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="games">
                    <TabsList>
                        <TabsTrigger value="games">My Games</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="games" className="mt-6">
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
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Game Performance</CardTitle>
                                <CardDescription>View your game performance over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <p className="text-gray-500 dark:text-gray-400">Analytics chart will be displayed here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="comments" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Comments</CardTitle>
                                <CardDescription>View and respond to comments on your games</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex gap-4 rounded-lg border p-4">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-medium">User {i + 1}</span>
                                                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                                            on{' '}
                                                            <Link href="#" className="text-pink-600 hover:underline">
                                                                My Game {(i % 3) + 1}
                                                            </Link>
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {i === 0 ? '2 hours ago' : i === 1 ? 'Yesterday' : `${i} days ago`}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm">
                                                    {i === 0
                                                        ? "This game is amazing! I've been playing for hours and can't get enough."
                                                        : i === 1
                                                          ? 'Great concept but there are some bugs that need to be fixed.'
                                                          : "One of the best indie games I've played this year. Highly recommended!"}
                                                </p>
                                                <div className="mt-2">
                                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                        Reply
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </AppLayout>
    );
}
