import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AlertCircle, FileUp, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

type GameForm = {
    title: string;
    description: string;
    game_path: File | null;
    thumbnail: File | null;
    screenshots: File[] | null;
};

export default function UploadGame() {
    const { data, setData, post, reset, processing } = useForm<Required<GameForm>>({
        title: '',
        description: '',
        game_path: null,
        thumbnail: null,
        screenshots: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            if (name === 'screenshots') {
                const filesArray = Array.from(files || []);
                setData(name as keyof GameForm, filesArray);
            } else if (name === 'game_path' || name === 'thumbnail') {
                setData(name as keyof GameForm, files ? files[0] : null);
            }
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
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Upload Your Game</h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Share your game with the GamePortal community</p>
                    </div>

                    <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                            Only signed-in users can upload games. Make sure your game files are properly packaged and tested before uploading.
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Tabs defaultValue="details" className="mb-8">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="details">Game Details</TabsTrigger>
                                <TabsTrigger value="files">Game Files</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Basic Information</CardTitle>
                                        <CardDescription>Provide details about your game to help players discover it</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Game Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="Enter your game title"
                                                required
                                                onChange={handleChange}
                                                value={data.title}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="description">Game Description</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Describe your game in detail"
                                                className="min-h-[120px]"
                                                required
                                                onChange={handleChange}
                                                value={data.description}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Select>
                                                    <SelectTrigger id="category">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="action">Action</SelectItem>
                                                        <SelectItem value="adventure">Adventure</SelectItem>
                                                        <SelectItem value="puzzle">Puzzle</SelectItem>
                                                        <SelectItem value="strategy">Strategy</SelectItem>
                                                        <SelectItem value="rpg">RPG</SelectItem>
                                                        <SelectItem value="simulation">Simulation</SelectItem>
                                                        <SelectItem value="sports">Sports</SelectItem>
                                                        <SelectItem value="racing">Racing</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="price">Price</Label>
                                                <div className="flex items-center gap-4">
                                                    <Select defaultValue="free">
                                                        <SelectTrigger id="price-type" className="w-[120px]">
                                                            <SelectValue placeholder="Price type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="free">Free</SelectItem>
                                                            <SelectItem value="paid">Paid</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" className="flex-1" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Tags</Label>
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                                {[
                                                    'Multiplayer',
                                                    'Single Player',
                                                    '2D',
                                                    '3D',
                                                    'Pixel Art',
                                                    'Casual',
                                                    'Indie',
                                                    'Action',
                                                    'Adventure',
                                                ].map((tag) => (
                                                    <div key={tag} className="flex items-center space-x-2">
                                                        <Checkbox id={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`} />
                                                        <Label htmlFor={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>{tag}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="files" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Game Files</CardTitle>
                                        <CardDescription>Upload your game files, thumbnail, and screenshots</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="game_path">Game File (ZIP or HTML5)</Label>
                                            <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                                {data.game_path ? (
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">{data.game_path.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {(data.game_path.size / (1024 * 1024)).toFixed(2)} MB
                                                        </p>
                                                        <Button type="button" variant="outline" size="sm" onClick={() => setData('game_path', null)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-center">
                                                            <FileUp className="h-12 w-12 text-gray-400" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium">Drag and drop your game file here</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                Supports ZIP, HTML, or folder with index.html (max 100MB)
                                                            </p>
                                                        </div>
                                                        <Button type="button" variant="outline" size="sm" asChild>
                                                            <Label htmlFor="game_path" className="cursor-pointer">
                                                                Browse Files
                                                                <Input
                                                                    id="game_path"
                                                                    name="game_path"
                                                                    type="file"
                                                                    accept=".zip"
                                                                    className="sr-only"
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </Label>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="thumbnail">Thumbnail Image</Label>
                                            <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                                {data.thumbnail ? (
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-medium">{data.thumbnail.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {(data.thumbnail.size / (1024 * 1024)).toFixed(2)} MB
                                                        </p>
                                                        <Button type="button" variant="outline" size="sm" onClick={() => setData('thumbnail', null)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-center">
                                                            <FileUp className="h-12 w-12 text-gray-400" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium">Upload a thumbnail image</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                PNG, JPG or GIF (recommended 640x360px)
                                                            </p>
                                                        </div>
                                                        <Button type="button" variant="outline" size="sm" asChild>
                                                            <Label htmlFor="thumbnail" className="cursor-pointer">
                                                                Browse Files
                                                                <Input
                                                                    id="thumbnail"
                                                                    name="thumbnail"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="sr-only"
                                                                    onChange={handleChange}
                                                                />
                                                            </Label>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="screenshots">Screenshots (up to 5)</Label>
                                            <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                                {data.screenshots != null && data.screenshots.length > 0 ? (
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                                            {data.screenshots.map((file, index) => (
                                                                <div key={index} className="space-y-1 text-center">
                                                                    <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                                                        <p className="truncate px-2 text-xs">{file.name}</p>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <Button type="button" variant="outline" size="sm" onClick={() => setData('screenshots', [])}>
                                                            Remove All
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-center">
                                                            <FileUp className="h-12 w-12 text-gray-400" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-medium">Upload game screenshots</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                PNG, JPG or GIF (recommended 1280x720px)
                                                            </p>
                                                        </div>
                                                        <Button type="button" variant="outline" size="sm" asChild>
                                                            <Label htmlFor="screenshots" className="cursor-pointer">
                                                                Browse Files
                                                                <Input
                                                                    id="screenshots"
                                                                    name="screenshots"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    multiple
                                                                    className="sr-only"
                                                                    onChange={handleChange}
                                                                />
                                                            </Label>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="settings" className="mt-6 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Game Settings</CardTitle>
                                        <CardDescription>Configure additional settings for your game</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="min-width">Game Dimensions</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="min-width" className="text-xs">
                                                        Width (px)
                                                    </Label>
                                                    <Input id="min-width" type="number" placeholder="800" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="min-height" className="text-xs">
                                                        Height (px)
                                                    </Label>
                                                    <Input id="min-height" type="number" placeholder="600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Game Features</Label>
                                            <div className="space-y-2">
                                                {['Fullscreen Support', 'Mobile Compatible', 'Controller Support', 'Multiplayer', 'Achievements'].map(
                                                    (feature) => (
                                                        <div key={feature} className="flex items-center space-x-2">
                                                            <Checkbox id={`feature-${feature.toLowerCase().replace(/\s+/g, '-')}`} />
                                                            <Label htmlFor={`feature-${feature.toLowerCase().replace(/\s+/g, '-')}`}>{feature}</Label>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="min-requirements">Minimum System Requirements</Label>
                                            <Textarea
                                                id="min-requirements"
                                                placeholder="Describe the minimum system requirements for your game"
                                                className="min-h-[100px]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Visibility</Label>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="visibility-public" defaultChecked />
                                                    <Label htmlFor="visibility-public">Public (visible to everyone)</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="visibility-unlisted" />
                                                    <Label htmlFor="visibility-unlisted">Unlisted (only accessible via direct link)</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="visibility-draft" />
                                                    <Label htmlFor="visibility-draft">Draft (only visible to you)</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline">
                                Save as Draft
                            </Button>
                            <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={processing}>
                                {processing ? (
                                    <>Uploading...</>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" /> Publish Game
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
