export default function GameInformation({ developer, releaseDate }: { developer: string; releaseDate: string }) {
    return (
        <div className="rounded-lg border p-6">
            <h3 className="mb-4 font-semibold">Game Information</h3>
            <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Developer</dt>
                    <dd>{developer}</dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Release Date</dt>
                    <dd>{releaseDate}</dd>
                </div>
            </dl>
        </div>
    );
}
