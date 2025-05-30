import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Share2, Star } from 'lucide-react';

interface GameProps {
    id: number;
    developer: string;
    title: string;
    genres: string[];
    createdAt: string;
}

export default function GameDetail({ game }: { game: GameProps }) {
    return (
        <div className="rounded-lg border p-6">
            <div className="flex items-center justify-between">
                <h1 className="mb-2 text-3xl font-bold">{game.title}</h1>
                <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" /> Share
                </Button>
            </div>
            <div className="mb-4 flex items-center gap-2">
                <Link href="/developer/game-studio" className="text-sm text-pink-600 hover:underline">
                    By {game.developer}
                </Link>
                <span className="text-xs text-gray-500 dark:text-gray-400">Released: {game.createdAt}</span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">{game.genres?.map((genre) => <Badge key={genre}>{genre}</Badge>)}</div>

            <div className="mb-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
                <span className="ml-2 text-sm font-medium">4.2 (128 reviews)</span>
            </div>
        </div>
    );
}
