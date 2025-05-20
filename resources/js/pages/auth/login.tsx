import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import { GamepadIcon as GameController } from 'lucide-react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {
                reset('password');
            },
        });
    };

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
            <div className="mx-auto w-full max-w-md">
                <div className="mb-6 flex flex-col items-center space-y-2 text-center">
                    <GameController className="h-12 w-12 text-pink-600" />
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            // href={route('password.request')}
                                            href="#"
                                            tabIndex={5}
                                            className="text-sm text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-pink-600 dark:bg-red-500 dark:text-white"
                                />
                                <Label htmlFor="remember" className="text-sm">
                                    Remember me
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" tabIndex={4} disabled={processing}>
                                {processing ? 'Signing in...' : 'Sign in'}
                            </Button>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href={route('register')}
                                    tabIndex={5}
                                    className="text-pink-600 hover:text-pink-700 dark:text-pink-500 dark:hover:text-pink-400"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </form>

                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                </Card>
            </div>
        </div>
    );
}
