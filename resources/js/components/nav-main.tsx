import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const {
        url,
        props: { auth },
    } = usePage<SharedData>();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = url === item.href;
                    const isLoggedIn = auth.user !== null;

                    if (item.requiresAuth && !isLoggedIn) {
                        return null;
                    }

                    return (
                        <SidebarMenuItem key={item.title} className={item.className}>
                            <SidebarMenuButton
                                asChild
                                className={isActive ? 'text-pink-600 dark:text-pink-500' : ''}
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
