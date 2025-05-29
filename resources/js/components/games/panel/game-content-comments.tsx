import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function GameContentComments() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Comments & Reviews
                </CardTitle>
                <CardDescription>Manage and respond to player feedback</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4 rounded-lg border p-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium">Player {i + 1}</span>
                                        <div className="mt-1 flex items-center">
                                            {[...Array(5)].map((_, j) => (
                                                <span key={j} className={`text-xs ${j < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {i === 0 ? '2 hours ago' : i === 1 ? 'Yesterday' : `${i} days ago`}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm">
                                    {i === 0
                                        ? "This game is amazing! I've been playing for hours and can't get enough."
                                        : i === 1
                                          ? 'Great concept but there are some bugs that need to be fixed.'
                                          : "One of the best indie games I've played this year. Highly recommended!"}
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Reply
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-red-600">
                                        Hide
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
