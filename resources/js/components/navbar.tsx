import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { GamepadIcon as GameController, Menu, Search, Upload, User } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <GameController className="h-6 w-6 text-pink-600" />
                        <span className="text-xl font-bold">GamePortal</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Browse Games</NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {['Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG', 'Simulation', 'Sports', 'Racing'].map((category) => (
                                            <li key={category}>
                                                <Link href={`/browse?category=${category.toLowerCase()}`}>
                                                    <NavigationMenuLink
                                                        className={cn(
                                                            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                                                        )}
                                                    >
                                                        <div className="text-sm leading-none font-medium">{category}</div>
                                                    </NavigationMenuLink>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="mr-2 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link href="/" className="flex items-center space-x-2">
                            <GameController className="h-6 w-6 text-pink-600" />
                            <span className="text-xl font-bold">GamePortal</span>
                        </Link>
                        <div className="mt-6 flex flex-col space-y-3">
                            <Link href="/browse" className="text-lg font-medium">
                                Browse Games
                            </Link>
                            <Link href="/upload" className="text-lg font-medium">
                                Upload Game
                            </Link>
                            <div className="pt-4">
                                <p className="mb-2 text-sm font-medium">Categories</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Action', 'Adventure', 'Puzzle', 'Strategy', 'RPG', 'Simulation', 'Sports', 'Racing'].map((category) => (
                                        <Link key={category} href={`/browse?category=${category.toLowerCase()}`} className="text-sm">
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
                    <GameController className="h-6 w-6 text-pink-600" />
                    <span className="text-xl font-bold">GamePortal</span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className={`${isSearchOpen ? 'flex' : 'hidden'} max-w-sm items-center space-x-2 md:flex lg:max-w-md`}>
                        <Input type="search" placeholder="Search games..." className="h-9 md:w-[300px] lg:w-[400px]" />
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Link href="/upload">
                        <Button variant="ghost" size="icon" className="hidden md:flex">
                            <Upload className="h-5 w-5" />
                            <span className="sr-only">Upload</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Dashboard</span>
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" className="hidden md:inline-flex">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="hidden bg-pink-600 hover:bg-pink-700 md:inline-flex">Register</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
