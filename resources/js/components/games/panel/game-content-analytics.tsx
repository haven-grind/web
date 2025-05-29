import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function GameContentAnalytics() {
    // Mock data - in real app, fetch based on params.id
    const gameData = {
        stats: {
            totalPlays: 1234,
            totalComments: 56,
            rating: 4.2,
            reviews: 128,
            downloads: 890,
        },
    };

    return (
        <>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Plays</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gameData.stats.totalPlays.toLocaleString()}</div>
                        <p className="text-xs text-green-600">+12% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Downloads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gameData.stats.downloads.toLocaleString()}</div>
                        <p className="text-xs text-green-600">+8% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gameData.stats.rating}/5</div>
                        <p className="text-xs text-gray-500">{gameData.stats.reviews} reviews</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234</div>
                        <p className="text-xs text-green-600">+15% from last week</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        Performance Over Time
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400">Analytics chart will be displayed here</p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
