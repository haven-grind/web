import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface CommentProps {
    id: number;
    user: {
        id: number;
        name: string;
    };
    game: {
        id: number;
        title: string;
    };
    content: string;
    createdAt: string;
}

export default function GameComments({ comments }: { comments: CommentProps[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>View and respond to comments on your games</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 rounded-lg border p-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium">{comment.user.name}</span>
                                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                            on{' '}
                                            <Link href={`/play/${comment.game.id}`} className="text-pink-600 hover:underline">
                                                {comment.game.title}
                                            </Link>
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</span>
                                </div>
                                <p className="mt-1 text-sm">{comment.content}</p>
                                <div className="mt-2">
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Reply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
