import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { EyeOff, Settings, Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface GameProps {
    id: number;
}

export default function GameContentSettings({ game }: { game: GameProps }) {
    const { delete: destroy, reset } = useForm();

    const onSubmit =
        (game: GameProps): FormEventHandler =>
        (e) => {
            e.preventDefault();

            destroy(route('game.destroy', { id: game.id }), {
                onFinish: () => reset(),
            });
        };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Game Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="mb-4 text-lg font-medium">Visibility</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Switch id="public" defaultChecked />
                            <Label htmlFor="public">Public (visible in browse page)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="searchable" defaultChecked />
                            <Label htmlFor="searchable">Searchable</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="comments" defaultChecked />
                            <Label htmlFor="comments">Allow comments</Label>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="mb-4 text-lg font-medium">Advanced Settings</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Switch id="analytics" defaultChecked />
                            <Label htmlFor="analytics">Enable analytics tracking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="downloads" defaultChecked />
                            <Label htmlFor="downloads">Allow downloads</Label>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="mb-4 text-lg font-medium text-red-600">Danger Zone</h3>
                    <div className="flex space-y-3 space-x-2">
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                            <EyeOff className="mr-2 h-4 w-4" />
                            Unpublish Game
                        </Button>
                        <form onSubmit={onSubmit(game)}>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Game
                            </Button>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
