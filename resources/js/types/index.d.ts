import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: SidebarNavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
}

export interface AuthNavItem extends NavItem {
    requiresAuth?: boolean;
}

export interface SidebarNavItem extends NavItem, AuthNavItem {
    items?: AuthNavItem[];
}

export interface FooterNavItem extends NavItem {
    className?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Game {
    id: number;
    title: string;
    description: string;
    game_path: string;
    created_at: string;
    updated_at: string;
}

export interface Genre {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Tag {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
