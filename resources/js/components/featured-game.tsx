import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface FeaturedGameProps {
    title: string;
    description: string;
    href: string;
    thumbnail: string;
    genres: string[];
}

export function FeaturedGame({ title, description, href, thumbnail, genres }: FeaturedGameProps) {
    return (
        <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0">
                <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 flex h-[400px] flex-col items-start justify-end p-8 md:p-12">
                <div className="mb-3 flex flex-wrap gap-2">
                    {genres?.map((genre) => (
                        <Badge key={genre} className="bg-pink-600 hover:bg-pink-700">
                            {genre}
                        </Badge>
                    ))}
                </div>
                <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">{title}</h1>
                <p className="mb-6 max-w-2xl text-gray-200">{description}</p>
                <div className="flex flex-wrap gap-4">
                    <Button className="bg-pink-600 text-white hover:bg-pink-700">
                        <Link href={href}>Play Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
