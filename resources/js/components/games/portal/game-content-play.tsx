import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function GameContentPlay({ path }: { path: string }) {
    const handlePlayClick = () => {
        const button = document.querySelector('#play-button');
        const iframe = document.querySelector('iframe');

        if (!iframe) return;

        if (button) button.classList.value = 'hidden';
        iframe.classList.remove('hidden');
    };

    return (
        <>
            {path ? (
                <div className="overflow-hidden rounded-lg border">
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <Button onClick={handlePlayClick} id="play-button" className="bg-pink-600 py-7 text-lg text-white hover:bg-pink-700">
                            <Play />
                            Play Game
                        </Button>
                        <iframe src={path} className="hidden h-full w-full" title="Game iframe" scrolling={'no'} />
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
