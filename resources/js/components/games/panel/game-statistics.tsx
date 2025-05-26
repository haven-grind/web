import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function GameStatistics({ gameCount, totalPlays, commentCount }: { gameCount: number; totalPlays: number; commentCount: number }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Games</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{gameCount}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Plays</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{totalPlays}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{commentCount}</div>
                </CardContent>
            </Card>
        </div>
    );
}
