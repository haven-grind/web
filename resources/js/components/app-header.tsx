import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { FooterNavItem, SidebarNavItem, type BreadcrumbItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Gamepad2, Globe, Home, LayoutDashboard, LogIn, Menu, Search, Upload, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from './ui/sidebar';

const mainNavItems: SidebarNavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Games',
        href: '/games',
        icon: Globe,
    },
    {
        title: 'My Games',
        href: '#',
        icon: Gamepad2,
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutDashboard,
                requiresAuth: true,
            },
            {
                title: 'Upload Game',
                href: '/game/create',
                icon: Upload,
                requiresAuth: true,
            },
        ],
    },
];

const rightNavItems: FooterNavItem[] = [
    {
        title: 'Login',
        href: '/login',
        icon: LogIn,
    },
    {
        title: 'Register',
        href: '/register',
        icon: UserPlus,
    },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const isLoggedIn = auth.user !== null;

    const renderNavGroup = (item: SidebarNavItem) => {
        const isActive = item.items?.some((subItem) => page.url === subItem.href);

        return (
            <NavigationMenuItem key={item.title} className="relative flex h-full items-center">
                <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), isActive && activeItemStyles, 'h-9 cursor-pointer px-3')}>
                    {item.title}
                </NavigationMenuTrigger>

                {isActive && <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>}

                <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                        <li>
                            {item.items?.map((subItem) => {
                                if (subItem.requiresAuth && !isLoggedIn) return null;

                                return (
                                    <NavigationMenuLink asChild key={subItem.title}>
                                        <Link
                                            href={subItem.href}
                                            className={cn(page.url === subItem.href && activeItemStyles, 'flex-row items-center gap-2 px-3')}
                                        >
                                            {subItem.icon && <Icon iconNode={subItem.icon} />}
                                            {subItem.title}
                                        </Link>
                                    </NavigationMenuLink>
                                );
                            })}
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    };

    const renderNavItem = (item: SidebarNavItem) => (
        <NavigationMenuItem key={item.title} className="relative flex h-full items-center">
            <Link
                href={item.href}
                className={cn(navigationMenuTriggerStyle(), page.url === item.href && activeItemStyles, 'h-9 cursor-pointer px-3')}
            >
                {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                {item.title}
            </Link>
            {page.url === item.href && <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>}
        </NavigationMenuItem>
    );

    const renderMobileNavGroup = (item: SidebarNavItem) => {
        const isActive = item.items?.some((subItem) => page.url === subItem.href);

        return (
            <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                                if (subItem.requiresAuth && !isLoggedIn) return null;

                                return (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild className={cn(page.url === subItem.href && activeItemStyles)}>
                                            <Link href={subItem.href}>
                                                {subItem.icon && <Icon iconNode={subItem.icon} className="h-4 w-4" />}
                                                {subItem.title}
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                );
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    };

    const renderMobileNavItem = (item: SidebarNavItem) => (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild className={cn(page.url === item.href && activeItemStyles)} tooltip={{ children: item.title }}>
                <a href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );

    return (
        <>
            <div className="border-sidebar-border/80 border-b">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetDescription className="sr-only">Use the navigation menu to explore the app.</SheetDescription>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogo />
                                </SheetHeader>
                                <SidebarProvider>
                                    <SidebarContent>
                                        <SidebarGroup>
                                            <SidebarMenu>
                                                {mainNavItems.map((item) => {
                                                    if ((item.requiresAuth || item.items?.every((subItem) => subItem.requiresAuth)) && !isLoggedIn)
                                                        return null;

                                                    if (item.items && item.items.length > 0) return renderMobileNavGroup(item);
                                                    return renderMobileNavItem(item);
                                                })}
                                            </SidebarMenu>
                                        </SidebarGroup>
                                    </SidebarContent>
                                </SidebarProvider>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="z-50 ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu viewport={false} className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item) => {
                                    if ((item.requiresAuth || item.items?.every((subItem) => subItem.requiresAuth)) && !isLoggedIn) return null;

                                    if (item.items && item.items.length > 0) return renderNavGroup(item);
                                    return renderNavItem(item);
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>

                            {!isLoggedIn && (
                                <div className="flex">
                                    {rightNavItems.map((item) => (
                                        <TooltipProvider key={item.title} delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <a
                                                        href={item.href}
                                                        className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                    >
                                                        <span className="sr-only">{item.title}</span>
                                                        {item.icon && (
                                                            <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />
                                                        )}
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{item.title}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            )}
                        </div>

                        {isLoggedIn && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
