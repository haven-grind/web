import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GameAnalytics() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Game Performance</CardTitle>
                <CardDescription>View your game performance over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">Analytics chart will be displayed here</p>
                </div>
            </CardContent>
        </Card>
    );
}
