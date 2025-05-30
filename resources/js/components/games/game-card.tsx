import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface GameCardProps {
    id: string | number;
    title: string;
    thumbnail: string;
    developer: string;
    genre: string[];
    href?: string;
}

export function GameCard({ id, href, developer, title, thumbnail, genre }: GameCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href || `/game/${id}`}>
            <Card
                className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={thumbnail || '/placeholder.svg'}
                        alt={title}
                        className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{title}</h3>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{developer}</p>
                    <div className="flex flex-wrap gap-1">
                        {genre.map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
