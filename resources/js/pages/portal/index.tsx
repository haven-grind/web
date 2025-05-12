import { Game } from '@/types';

export default function GamePortal({ games }: { games: Game[] }) {
    return (
        // <div className="absolute inset-0 bg-gray-300">
        //     <iframe
        //         className="absolute inset-0 m-auto h-1/2 w-1/2 rounded-lg shadow-lg"
        //         title="map"
        //         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.839636741096!2d112.79291427836522!3d-7.277287418812123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa10d63d1b6d%3A0x616fe227b7cb9d1e!2sPascasarjana%20Terapan%20Politeknik%20Elektronika%20Negeri%20Surabaya!5e0!3m2!1sid!2sid!4v1746517160031!5m2!1sid!2sid"
        //     />
        // </div>
        <div>
            <h1 className="text-center text-3xl font-bold">Game Portal</h1>
            <p className="mt-4 text-center text-lg">Welcome to the Game Portal! Here you can upload and manage your games.</p>

            <div>
                <h2 className="mt-8 text-2xl font-semibold">Your Games</h2>
                <p className="text-gray-600">List of games you have uploaded:</p>
                {games.length === 0 ? (
                    <p className="mt-4 text-gray-500">No games uploaded yet.</p>
                ) : (
                    <ul className="mt-4">
                        {games.map((game) => (
                            <li key={game.id} className="border-b py-2 text-gray-300 transition-colors hover:bg-gray-600">
                                <a href={route('game.show', { id: game.id })}>{game.name}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <a href={route('game.create')} className="text-blue-600 hover:underline">
                Upload New Game
            </a>
        </div>
    );
}
