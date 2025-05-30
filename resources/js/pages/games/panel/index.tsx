import { Footer } from '@/components/footer';
import GameAnalytics from '@/components/games/panel/game-analytics';
import GameComments from '@/components/games/panel/game-comments';
import GameList from '@/components/games/panel/game-list';
import GameStatistics from '@/components/games/panel/game-statistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface GameProps {
    id: number;
    developer: string;
    title: string;
    thumbnail: string;
    genres: string[];
}

interface CommentProps {
    id: number;
    user: {
        id: number;
        name: string;
    };
    game: {
        id: number;
        title: string;
    };
    content: string;
    createdAt: string;
}

export default function Dashboard({ totalPlays, games, comments }: { totalPlays: number; games: GameProps[]; comments: CommentProps[] }) {
    const breadcrumbs = [
        { title: 'My Games', href: '/dashboard' },
        { title: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <main className="container mx-auto space-y-8 px-4 py-8">
                <GameStatistics gameCount={games.length} totalPlays={totalPlays} commentCount={comments.length} />

                <Tabs defaultValue="games">
                    <TabsList>
                        <TabsTrigger value="games">My Games</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="games" className="mt-6">
                        <GameList games={games} />
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-6">
                        <GameAnalytics />
                    </TabsContent>
                    <TabsContent value="comments" className="mt-6">
                        <GameComments comments={comments} />
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </AppLayout>
    );
}
