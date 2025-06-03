import { Button } from '@/components/ui/button';

export default function GameContentPlay({ path }: { path: string }) {
    return (
        <>
            {path ? (
                <div className="overflow-hidden rounded-lg border">
                    <div className="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <iframe src={path} className={`h-[${720}px] w-[${1280}px]`} title="Game iframe" scrolling={'no'} />
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-900">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Press ESC to exit fullscreen</span>
                        <Button size="sm" variant="outline">
                            Fullscreen
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border">
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <span className="text-gray-500 dark:text-gray-400">No game content available</span>
                    </div>
                </div>
            )}
        </>
    );
}
