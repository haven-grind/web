import { Footer } from '@/components/footer';
import GameContentAnalytics from '@/components/games/panel/game-content-analytics';
import GameContentComments from '@/components/games/panel/game-content-comments';
import GameContentDetails from '@/components/games/panel/game-content-details';
import GameContentMedia from '@/components/games/panel/game-content-media';
import GameContentSettings from '@/components/games/panel/game-content-settings';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { GameForm, Genre } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface GameProps {
    id: number;
    title: string;
    description: string;
    gameFile: {
        path: string;
        fileName: string;
    };
    thumbnail: string;
    genres: number[];
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

    const { data, setData, patch, reset } = useForm<Required<GameForm>>({
        title: game.title,
        description: game.description,
        game_path: null,
        thumbnail: null,
        screenshots: [],
        genres: game.genres,
    });

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof GameForm, value);

        console.log(`Current text for ${name}:`, data[name as keyof GameForm]);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (name === 'screenshots') {
            const filesArray = Array.from(files || []);
            setData(name as keyof GameForm, filesArray);

            console.log('Current screenshots:', data.screenshots);
        } else {
            setData(name as keyof GameForm, files ? files[0] : null);

            console.log(`Current file for ${name}:`, data[name as keyof GameForm]);
        }
    };

    const handleGenreCheckedChange = (genreId: number, checked: boolean) => {
        if (checked) {
            setData('genres', [...data.genres, genreId]);
        } else {
            setData(
                'genres',
                data.genres.filter((t) => t !== genreId),
            );
        }

        console.log('Updated genres:', data.genres);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('game.update', game.id), {
            forceFormData: true,
            onFinish: () => {
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    // async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
    //     const res = await fetch(url);
    //     const blob = await res.blob();
    //     return new File([blob], fileName, { type: mimeType });
    // }

    // useEffect(() => {
    //     async function fetchFiles() {
    //         // Game file
    //         let gameFile: File | null = null;
    //         if (game.gameFile?.path && game.gameFile?.fileName) {
    //             gameFile = await urlToFile(game.gameFile.path, game.gameFile.fileName, 'application/zip');
    //         }

    //         // Thumbnail
    //         let thumbnailFile: File | null = null;
    //         if (game.thumbnail) {
    //             // Guess the extension for mime type
    //             const ext = game.thumbnail.split('.').pop()?.toLowerCase();
    //             let mimeType = 'image/png';
    //             if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
    //             else if (ext === 'gif') mimeType = 'image/gif';
    //             thumbnailFile = await urlToFile(game.thumbnail, `thumbnail.${ext}`, mimeType);
    //         }

    //         // Screenshots
    //         const screenshots: File[] = await Promise.all(
    //             (game.screenshots as unknown[]).map(async (s: unknown, idx: number) => {
    //                 // If s is an object with path/fileName, adjust accordingly
    //                 const url = (s as { path?: string }).path ?? s;
    //                 const fileName = (s as { fileName?: string }).fileName ?? `screenshot${idx + 1}.png`;
    //                 // Guess mime type
    //                 const ext = fileName.split('.').pop()?.toLowerCase();
    //                 let mimeType = 'image/png';
    //                 if (ext === 'jpg' || ext === 'jpeg') mimeType = 'image/jpeg';
    //                 else if (ext === 'gif') mimeType = 'image/gif';
    //                 return urlToFile(url as string, fileName, mimeType);
    //             }),
    //         );

    //         setData((data) => ({
    //             ...data,
    //             game_path: gameFile,
    //             thumbnail: thumbnailFile,
    //             screenshots,
    //         }));
    //     }
    //     fetchFiles();
    // }, [game.gameFile, game.thumbnail, game.screenshots, setData, data]);

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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Button className="bg-pink-600 hover:bg-pink-700" disabled>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </form>
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
                        <GameContentDetails
                            game={game}
                            genres={genres}
                            data={data}
                            onTextChange={handleTextInputChange}
                            onFileChange={handleFileInputChange}
                            onGenreCheckedChange={handleGenreCheckedChange}
                        />
                    </TabsContent>

                    <TabsContent value="media" className="space-y-6">
                        <GameContentMedia screenshots={game.screenshots} gameFile={game.gameFile} data={data} onFileChange={handleFileInputChange} />
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
