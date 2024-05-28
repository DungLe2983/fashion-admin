import {
    LayoutDashboard,
    Palette,
    Shapes,
    ShoppingBag,
    Shrink,
    Tag,
    UsersRound,
} from 'lucide-react';

export const navLinks = [
    {
        url: '/',
        icon: <LayoutDashboard />,
        label: 'Dashboard',
    },
    {
        url: '/products',
        icon: <Tag />,
        label: 'Products',
    },
    {
        url: '/collections',
        icon: <Shapes />,
        label: 'Categories',
    },
    {
        url: '/sizes',
        icon: <Shrink />,
        label: 'Sizes',
    },
    {
        url: '/colors',
        icon: <Palette />,
        label: 'Colors',
    },
    {
        url: '/orders',
        icon: <ShoppingBag />,
        label: 'Orders',
    },
    {
        url: '/customers',
        icon: <UsersRound />,
        label: 'Customers',
    },
];
