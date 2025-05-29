import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Game } from '@/types';
import { DollarSign, FileText, Upload } from 'lucide-react';
import { useState } from 'react';

export default function GameContentDetails({ game }: { game: Game }) {
    const [isPublished, setIsPublished] = useState(true);
    const [isFree, setIsFree] = useState(false);
    const [price, setPrice] = useState('9.99');

    // Mock data - in real app, fetch based on params.id
    const gameData = {
        tags: ['Action', 'Adventure', 'Indie'],
        imageUrl: '/placeholder.svg?height=400&width=600&text=Game+Cover',
        stats: {
            totalPlays: 1234,
            totalComments: 56,
            rating: 4.2,
            reviews: 128,
            downloads: 890,
        },
    };

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
                            <Input id="title" defaultValue={game.title} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" defaultValue={game.description} rows={4} />
                        </div>
                        <div>
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input id="tags" defaultValue={gameData.tags.join(', ')} />
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select defaultValue="action">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="action">Action</SelectItem>
                                    <SelectItem value="adventure">Adventure</SelectItem>
                                    <SelectItem value="puzzle">Puzzle</SelectItem>
                                    <SelectItem value="strategy">Strategy</SelectItem>
                                    <SelectItem value="rpg">RPG</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <DollarSign className="mr-2 h-5 w-5" />
                            Pricing & Availability
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                            <Label htmlFor="published">Published (visible to public)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="free" checked={isFree} onCheckedChange={setIsFree} />
                            <Label htmlFor="free">Free to play</Label>
                        </div>
                        {!isFree && (
                            <div>
                                <Label htmlFor="price">Price ($)</Label>
                                <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Game Cover</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg">
                            <img src={gameData.imageUrl || '/placeholder.svg'} alt="Game Cover" className="object-cover" />
                        </div>
                        <Button variant="outline" className="w-full">
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
                            <span className="text-sm text-gray-500">Total Plays</span>
                            <span className="font-medium">{gameData.stats.totalPlays.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Downloads</span>
                            <span className="font-medium">{gameData.stats.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Comments</span>
                            <span className="font-medium">{gameData.stats.totalComments}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Rating</span>
                            <span className="font-medium">
                                {gameData.stats.rating}/5 ({gameData.stats.reviews} reviews)
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
