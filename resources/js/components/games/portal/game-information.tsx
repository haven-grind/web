export default function GameInformation() {
    return (
        <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Game Information</h3>
            <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Developer</dt>
                    <dd>Game Studio</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Publisher</dt>
                    <dd>Game Publisher</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Release Date</dt>
                    <dd>Jan 15, 2023</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Platform</dt>
                    <dd>Web, Windows, Mac</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Languages</dt>
                    <dd>English, Spanish, French</dd>
                </div>
            </dl>
        </div>
    );
}
