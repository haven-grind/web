import { Note } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Notes({ notes }: { notes: Note[] }) {
    const { delete: destroy, reset } = useForm();

    const onSubmit =
        (note: Note): FormEventHandler =>
        (e) => {
            e.preventDefault();

            destroy(route('delete-note', { id: note.id }), {
                onFinish: () => reset(),
            });
        };

    return (
        <div className="flex h-screen flex-col items-center bg-black p-4 text-white">
            <h1 className="my-8 text-4xl font-bold">NOTES</h1>

            <div className="w-full max-w-5xl overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border-collapse bg-gray-900">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <th className="border border-gray-700 px-6 py-4 text-center text-sm font-semibold">No</th>
                            <th className="border border-gray-700 px-8 py-4 text-center text-sm font-semibold">Title</th>
                            <th className="border border-gray-700 px-8 py-4 text-center text-sm font-semibold">Content</th>
                            <th className="border border-gray-700 px-8 py-4 text-center text-sm font-semibold" colSpan={2}>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={index} className="transition-colors hover:bg-gray-700">
                                <td className="border border-gray-700 px-4 py-3 text-center">{index + 1}</td>
                                <td className="border border-gray-700 px-6 py-3 text-center">{note.title}</td>
                                <td className="border border-gray-700 px-6 py-3 text-center">{note.content}</td>
                                <td className="border border-gray-700 px-4 py-3 text-center">
                                    <a
                                        href={route('edit-note', note.id)}
                                        className="inline-block rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-500"
                                    >
                                        Edit
                                    </a>
                                </td>
                                <td className="border border-gray-700 px-4 py-3 text-center">
                                    <form onSubmit={onSubmit(note)}>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-red-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <a href={route('create-note')} className="mt-8 rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700">
                Create a Note
            </a>
        </div>
    );
}
