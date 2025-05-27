import AppLayout from '@/layouts/app-layout';
import { Game } from '@/types';
import { Head } from '@inertiajs/react';

export default function Games({ games }: { games: Game[] }) {
    const breadcrumbs = [{ title: 'Games', href: '/games' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Games" />

            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold">Games</h1>
                <p className="mb-4">Explore our collection of games.</p>

                {games.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {games.map((game) => (
                            <div key={game.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">{game.title}</h2>
                                <p className="text-gray-600">{game.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No games found.</p>
                )}
            </main>
        </AppLayout>
    );
}
