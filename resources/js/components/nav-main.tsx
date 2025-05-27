import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, SharedData, SidebarNavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const {
        url,
        props: { auth },
    } = usePage<SharedData>();

    const isLoggedIn = auth.user !== null;

    const renderCollapsibleMenu = ({ item }: { item: SidebarNavItem }) => (
        <Collapsible key={item.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        {item.title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {item.items?.map((subItem) => {
                                const subIsActive = url === subItem.href;

                                if (subItem.requiresAuth && !isLoggedIn) {
                                    return null;
                                }

                                return renderMenuItem({
                                    item: {
                                        title: subItem.title,
                                        href: subItem.href,
                                        icon: subItem.icon || null,
                                        isActive: subIsActive,
                                    },
                                });
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );

    const renderMenuItem = ({
        item,
    }: {
        item: {
            title: string;
            href: string;
            icon?: LucideIcon | null;
            isActive?: boolean;
        };
    }) => (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
                asChild
                className={item.isActive ? 'text-pink-600 dark:text-pink-500' : ''}
                isActive={item.isActive}
                tooltip={{ children: item.title }}
            >
                <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );

    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.title} className="px-2 py-0">
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => {
                            const isActive = url === item.href;

                            if ((item.requiresAuth || item.items?.some((subItem) => subItem.requiresAuth)) && !isLoggedIn) {
                                return null;
                            }

                            if (item.items && item.items.length > 0) {
                                return renderCollapsibleMenu({ item });
                            }

                            return renderMenuItem({
                                item: {
                                    title: item.title,
                                    href: item.href,
                                    icon: item.icon || null,
                                    isActive: isActive,
                                },
                            });
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
