import { Note } from '@/types';
import NoteTbody from './components/note-tbody';
import NoteTheadCell from './components/note-thead-cell';

export default function Notes({ notes }: { notes: Note[] }) {
    return (
        <div className="flex h-screen flex-col items-center bg-black p-4 text-white">
            <h1 className="my-8 text-4xl font-bold">NOTES</h1>

            <div className="w-full max-w-5xl overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full border-collapse bg-gray-900">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <NoteTheadCell content="No" />
                            <NoteTheadCell content="Title" />
                            <NoteTheadCell content="Content" />
                            <NoteTheadCell content="Actions" colSpan={2} />
                        </tr>
                    </thead>

                    <NoteTbody notes={notes} />
                </table>
            </div>

            <a href={route('create-note')} className="mt-8 rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700">
                Create a Note
            </a>
        </div>
    );
}
