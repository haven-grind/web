import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { clickInputFile } from '@/lib/utils';
import { GameForm } from '@/types';
import { ImageIcon, Trash2, Upload } from 'lucide-react';

interface GameFileProps {
    path: string;
    fileName: string;
}

export default function GameContentMedia({
    screenshots,
    gameFile,
    data,
    onFileChange,
}: {
    screenshots: string[];
    gameFile: GameFileProps;
    data: Required<GameForm>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <ImageIcon className="mr-2 h-5 w-5" />
                        Screenshots & Media
                    </CardTitle>
                    <CardDescription>Manage your game's screenshots and promotional images</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {screenshots?.length ? (
                            screenshots.map((screenshot, i) => (
                                <div key={i} className="group relative">
                                    <div className="relative aspect-video overflow-hidden rounded-lg">
                                        <img src={screenshot} alt={`Screenshot ${i + 1}`} className="object-cover" />
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-gray-500 md:col-span-4 dark:text-gray-400">No screenshots uploaded yet.</div>
                        )}
                    </div>
                    <Input
                        id="screenshots"
                        name="screenshots"
                        className="mb-4"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={onFileChange}
                    />
                    <Button variant="outline" className="w-full" onClick={() => clickInputFile('screenshots')}>
                        <Upload className="mr-2 h-4 w-4" />
                        Add Screenshots
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Game Files</CardTitle>
                    <CardDescription>Upload and manage your game files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <AlertDescription>
                            {data.game_path || gameFile.fileName
                                ? `Current game file: ${data.game_path?.name || gameFile.fileName}`
                                : 'No game file uploaded yet.'}
                        </AlertDescription>
                    </Alert>
                    <Input id="game_path" name="game_path" className="mb-4" type="file" accept=".zip" hidden onChange={onFileChange} />
                    <Button variant="outline" className="w-full" onClick={() => clickInputFile('game_path')}>
                        <Upload className="mr-2 h-4 w-4" />
                        {data.game_path || gameFile.fileName ? 'Upload New Version' : 'Upload Game File'}
                    </Button>

                    {/* {data.game_path || gameFile.fileName ? (
                        <>
                            <Alert>
                                <AlertDescription>Current game file: {data.game_path?.name || gameFile.fileName}</AlertDescription>
                            </Alert>
                            <Button variant="outline" className="w-full">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload New Version
                            </Button>
                        </>
                    ) : (
                        <>
                            <Alert>
                                <AlertDescription>No game file uploaded yet.</AlertDescription>
                            </Alert>
                            <Input id="game_path" name="game_path" className="mb-4" type="file" accept=".zip" hidden onChange={onFileChange} />
                            <Button variant="outline" className="w-full" onClick={() => clickInputFile('game_path')}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Game File
                            </Button>
                        </>
                    )} */}
                </CardContent>
            </Card>
        </>
    );
}
