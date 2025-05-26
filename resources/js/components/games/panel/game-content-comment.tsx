export default function GameContentComment() {
    return (
        <>
            <div className="space-y-4">
                <h3 className="text-xl font-bold">Comments</h3>
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">User {i + 1}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {i === 0 ? '2 hours ago' : i === 1 ? 'Yesterday' : 'Last week'}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm">
                                    {i === 0
                                        ? "This game is amazing! I've been playing for hours and can't get enough."
                                        : i === 1
                                          ? 'Great concept but there are some bugs that need to be fixed.'
                                          : "One of the best indie games I've played this year. Highly recommended!"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
