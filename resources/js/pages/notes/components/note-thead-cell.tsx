export default function NoteTheadCell({ content, colSpan }: { content: string; colSpan?: number }) {
    return (
        <th className="border border-gray-700 px-8 py-4 text-center text-sm font-semibold" colSpan={colSpan}>
            {content}
        </th>
    );
}
