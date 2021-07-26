import Index from "@/pages/index";
import Categories from "@/pages/categories";

export const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
    },
];