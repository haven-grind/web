import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { clickInputFile, previewImage } from '@/lib/utils';
import { GameForm, Genre } from '@/types';
import { FileText, Upload } from 'lucide-react';

interface GameProps {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    genres: number[];
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

export default function GameContentDetails({
    game,
    genres,
    data,
    onTextChange,
    onFileChange,
    onGenreCheckedChange,
}: {
    game: GameProps;
    genres: Genre[];
    data: Required<GameForm>;
    onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onGenreCheckedChange: (genreId: number, checked: boolean) => void;
}) {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Game Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Game Title</Label>
                            <Input id="title" defaultValue={data.title || game.title} onChange={onTextChange} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" defaultValue={data.description || game.description} onChange={onTextChange} rows={10} />
                        </div>
                        <div>
                            <Label htmlFor="tags">Genres (comma separated)</Label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {genres.map((genre) => (
                                    <div key={genre.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={genre.name}
                                            checked={game.genres?.includes(genre.id)}
                                            onCheckedChange={(checked) => onGenreCheckedChange(genre.id, checked as boolean)}
                                        />
                                        <Label htmlFor={genre.name}>{genre.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Game Cover</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-4 w-full overflow-hidden rounded-lg">
                            {data.thumbnail || game.thumbnail ? (
                                <img src={data.thumbnail?.name || game.thumbnail} alt="Game Cover" id="game-cover" className="object-cover" />
                            ) : (
                                <div className="flex h-48 items-center justify-center bg-gray-100 dark:bg-gray-800">
                                    <span className="text-gray-500 dark:text-gray-400">No cover image uploaded</span>
                                </div>
                            )}
                        </div>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            className="mb-4"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                onFileChange(e);
                                previewImage(e.target.files?.[0], 'game-cover');
                            }}
                        />
                        <Button variant="outline" className="w-full" onClick={() => clickInputFile('thumbnail')}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New Cover
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Comments</span>
                            <span className="font-medium">{game.comments.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Rating</span>
                            <span className="font-medium">4.2/5 (128 reviews)</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
