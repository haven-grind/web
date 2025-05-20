import { Link } from '@inertiajs/react';
import { GamepadIcon as GameController } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-background flex flex-col items-center border-t">
            <div className="container px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center space-x-2">
                            <GameController className="h-6 w-6 text-pink-600" />
                            <span className="text-xl font-bold">GamePortal</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Discover, play, and share indie games online. Join our community of gamers and developers.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Explore</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/browse" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Browse Games
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse?sort=newest"
                                    className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
                                >
                                    New Releases
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse?sort=popular"
                                    className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
                                >
                                    Popular Games
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse?price=free"
                                    className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
                                >
                                    Free Games
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Developers</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/upload" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Upload Game
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Developer Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/terms" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} GamePortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
