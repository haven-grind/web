import { Note } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type NoteForm = {
    title: string;
    content: string;
};

export default function EditNote({ note }: { note: Note }) {
    const { data, setData, patch, reset } = useForm<Required<NoteForm>>({
        title: note.title,
        content: note.content,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name as keyof NoteForm, e.target.value);
    };

    const onSubmit =
        (note: Note): FormEventHandler =>
        (e) => {
            e.preventDefault();

            patch(route('update-note', { id: note.id }), {
                onFinish: () => reset(),
            });
        };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-black p-4 text-white">
            <h1 className="mb-8 text-4xl font-bold">Edit Note</h1>
            <form onSubmit={onSubmit(note)} className="flex w-full max-w-md flex-col gap-6 rounded-lg bg-gray-900 p-8 shadow-lg">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-semibold text-gray-300">
                        Note Title:
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        autoFocus
                        value={data.title}
                        placeholder="Enter note title"
                        className="rounded-md border border-gray-600 bg-gray-800 p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="text-sm font-semibold text-gray-300">
                        Note Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={data.content}
                        placeholder="Enter note content"
                        className="h-32 resize-none rounded-md border border-gray-600 bg-gray-800 p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="mt-4 rounded-md bg-blue-600 py-3 font-bold text-white transition-colors duration-300 hover:bg-blue-700"
                >
                    Edit
                </button>
            </form>
        </div>
    );
}
