import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface GameCategoryProps {
    name: string;
    count: number;
}

export function GameCategory({ name, count }: GameCategoryProps) {
    return (
        <Link href={`/browse?category=${name.toLowerCase()}`}>
            <Card className="transition-all hover:border-pink-600/50 hover:shadow-md">
                <CardContent className="flex items-center justify-between p-6">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{count} games</span>
                </CardContent>
            </Card>
        </Link>
    );
}
