import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface GameCardProps {
    id: string | number;
    title: string;
    imageUrl: string;
    developer: string;
    tags: string[];
    free?: boolean;
    price?: number;
}

export function GameCard({ id, title, imageUrl, developer, tags, free, price }: GameCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/game/${id}`}>
            <Card
                className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={imageUrl || '/placeholder.svg'}
                        alt={title}
                        className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{title}</h3>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{developer}</p>
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    {free ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Free</Badge>
                    ) : (
                        <span className="font-bold text-pink-600 dark:text-pink-500">${price?.toFixed(2)}</span>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}
