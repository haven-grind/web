import { Footer } from '@/components/footer';
import GameContentAnalytics from '@/components/games/panel/game-content-analytics';
import GameContentComments from '@/components/games/panel/game-content-comments';
import GameContentDetails from '@/components/games/panel/game-content-details';
import GameContentMedia from '@/components/games/panel/game-content-media';
import GameContentSettings from '@/components/games/panel/game-content-settings';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Genre } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Save } from 'lucide-react';

interface GameProps {
    id: number;
    title: string;
    description: string;
    gameFile: {
        path: string;
        fileName: string;
    };
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
}

export default function GameShow({ game, genres }: { game: GameProps; genres: Genre[] }) {
    const breadcrumbs = [
        { title: 'My Games', href: '/dashboard' },
        { title: game.title, href: `/game/${game.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={game.title} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{game.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your game settings and content</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/play/${game.id}`}>
                            <Button variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                View Live
                            </Button>
                        </Link>
                        <Button className="bg-pink-600 hover:bg-pink-700">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="details" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-6">
                        <GameContentDetails game={game} genres={genres} />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-6">
                        <GameContentMedia screenshots={game.screenshots} gameFile={game.gameFile} />
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-6">
                        <GameContentAnalytics />
                    </TabsContent>

                    <TabsContent value="comments" className="space-y-6">
                        <GameContentComments comments={game.comments} />
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <GameContentSettings game={game} />
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </AppLayout>
    );
}
