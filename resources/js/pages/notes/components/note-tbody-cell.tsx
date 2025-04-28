import { ReactNode } from 'react';

export default function NoteTbodyCell({ content }: { content: ReactNode }) {
    return <td className="border border-gray-700 px-4 py-3 text-center">{content}</td>;
}
