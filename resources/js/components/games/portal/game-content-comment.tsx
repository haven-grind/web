interface Comment {
    id: number;
    user: {
        id: number;
        name: string;
    };
    content: string;
    createdAt: string;
}

export default function GameContentComment({ comments }: { comments?: Comment[] }) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Comments</h3>
            <div className="space-y-6">
                {comments?.length ? (
                    comments?.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{comment.user.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{comment.createdAt}</span>
                                </div>
                                <p className="mt-1 text-sm">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 text-gray-500 dark:text-gray-400">No Comments Available</div>
                )}
            </div>
        </div>
    );
}
