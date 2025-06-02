import { GameCard } from '@/components/games/game-card';
import { GameFilter } from '@/components/games/portal/game-filter';
import { Pagination } from '@/components/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { Genre } from '@/types';
import { Head } from '@inertiajs/react';
import { Suspense } from 'react';

interface GameProps {
    id: number;
    developer: string;
    title: string;
    thumbnail: string;
    genres: string[];
}

export default function Games({ games, genres }: { games: GameProps[]; genres: Genre[] }) {
    const breadcrumbs = [{ title: 'Games', href: '/games' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
                    <aside>
                        <GameFilter genres={genres} />
                    </aside>

                    <div>
                        <Suspense fallback={<GameGridSkeleton />}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {games.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        id={game.id}
                                        title={game.title}
                                        href={`/play/${game.id}`}
                                        thumbnail={game.thumbnail}
                                        developer={game.developer}
                                        genre={game.genres}
                                    />
                                ))}
                            </div>

                            <div className="mt-12">
                                <Pagination totalPages={10} currentPage={1} />
                            </div>
                        </Suspense>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}

function GameGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
