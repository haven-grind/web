import { Button } from '@/components/ui/button';

export default function GameContentPlay({ path }: { path: string }) {
    return (
        <>
            <div className="overflow-hidden rounded-lg border">
                <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <iframe src={path} className="h-full w-full" title="Game iframe" />
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-900">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Press ESC to exit fullscreen</span>
                    <Button size="sm" variant="outline">
                        Fullscreen
                    </Button>
                </div>
            </div>
        </>
    );
}
