import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { FooterNavItem, NavGroup, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Gamepad2, Globe, Home, LayoutDashboard, Upload } from 'lucide-react';
import AppLogo from './app-logo';

const sidebarNavItems: NavGroup[] = [
    {
        title: 'Platform',
        items: [
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
        ],
    },
];

const footerNavItems: FooterNavItem[] = [
    {
        title: 'Login',
        href: '/login',
        className: '',
    },
    {
        title: 'Register',
        href: '/register',
        className: 'bg-pink-600 hover:bg-pink-700',
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = auth.user !== null;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={sidebarNavItems} />
            </SidebarContent>

            <SidebarFooter>{!isLoggedIn ? <NavFooter items={footerNavItems} className="mt-auto" /> : <NavUser />}</SidebarFooter>
        </Sidebar>
    );
}
