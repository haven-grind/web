import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Game } from '@/types';
import { Link } from '@inertiajs/react';
import { Share2, Star } from 'lucide-react';

export default function GameDetail({ game }: { game: Game }) {
    return (
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
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} />
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
    );
}
