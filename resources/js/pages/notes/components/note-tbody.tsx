import { Note } from '@/types';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import NoteTbodyCell from './note-tbody-cell';

export default function NoteTbody({ notes }: { notes: Note[] }) {
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
        <tbody>
            {notes.length === 0 && (
                <tr className="text-center text-gray-500">
                    <td colSpan={5} className="border border-gray-700 px-6 py-4 text-sm font-semibold">
                        No notes available
                    </td>
                </tr>
            )}
            {notes.map((note, index) => (
                <tr key={index} className="transition-colors hover:bg-gray-700">
                    <NoteTbodyCell content={`${index + 1}`} />
                    <NoteTbodyCell content={note.title} />
                    <NoteTbodyCell content={note.content} />
                    <NoteTbodyCell
                        content={
                            <a
                                href={route('edit-note', note.id)}
                                className="inline-block rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-500"
                            >
                                Edit
                            </a>
                        }
                    />
                    <NoteTbodyCell
                        content={
                            <form onSubmit={onSubmit(note)}>
                                <button
                                    type="submit"
                                    className="rounded-md bg-red-400 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </form>
                        }
                    />
                </tr>
            ))}
        </tbody>
    );
}
