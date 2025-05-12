import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type GameForm = {
    name: string;
    description: string;
    game_path: File | null;
};

export default function UploadGame() {
    const { data, setData, post, reset, processing, progress } = useForm<Required<GameForm>>({
        name: '',
        description: '',
        game_path: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            setData(name as keyof GameForm, files ? files[0] : null);
        } else {
            setData(name as keyof GameForm, value);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('game.store'), {
            forceFormData: true,
            onFinish: () => {
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div>
            <h1>Upload Game</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="name">Game Name</label>
                <input type="text" id="name" name="name" required value={data.name} onChange={handleChange} />

                <label htmlFor="description">Game Description</label>
                <textarea id="description" name="description" required value={data.description} onChange={handleChange}></textarea>

                <label htmlFor="game_path">Game File</label>
                <input type="file" id="game_path" name="game_path" accept=".zip" required onChange={handleChange} />

                {progress && (
                    <div>
                        <progress value={progress.percentage} max="100" />
                        <span>{progress.percentage}%</span>
                    </div>
                )}

                <button type="submit" disabled={processing}>
                    Upload Game
                </button>
            </form>
        </div>
    );
}
