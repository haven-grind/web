import { Game } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function GameDetail({ game }: { game: Game }) {
    const { delete: destroy, reset } = useForm();

    const onSubmit =
        (game: Game): FormEventHandler =>
        (e) => {
            e.preventDefault();

            destroy(route('game.destroy', { id: game.id }), {
                onFinish: () => reset(),
            });
        };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-800">
            <iframe className="h-full w-full" title="game" src={game.game_path} allowFullScreen />
            <h1 className="mb-4 text-3xl font-bold text-gray-100">{game.name}</h1>
            <p className="mb-4 text-lg text-gray-100">{game.description}</p>
            {/* <a
                href={route('game.download', { id: game.id })}
                className="rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
                download
            >
                Download Game
            </a> */}
            <form onSubmit={onSubmit(game)}>
                <button className="rounded bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700">Delete Game</button>
            </form>
        </div>
    );
}
