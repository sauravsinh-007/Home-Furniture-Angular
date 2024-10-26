import { menuItem } from "./menu.model";

export const MENU: menuItem[] = [

    // {
    //     id: 1,
    //     name: 'dashboard',
    //     label: 'Dashboard',
    //     icon: 'bi bi-speedometer2',
    //     link: '/admin/dashboard'
    // },

    {
        id: 2,
        name: 'User',
        label: 'user',
        icon: 'bi bi-person-fill ',
        link: '/admin/user'

    },
    {
        id: 3,
        name: 'menu',
        label: 'Menu',
        icon: 'bi bi-list-ul ',
        link: '/admin/menu'

    },
    {
        id: 4,
        name: 'role',
        label: 'Role',
        icon: 'bi bi-person-check-fill ',
        link: '/admin/role'

    },
    {
        id: 5,
        name: 'content',
        label: 'Content',
        icon: 'bi bi-file-earmark-text ',
        link: '/admin/content'

    },
    {
        id: 6,
        name: 'category',
        label: 'Category',
        icon: 'bi bi-tags',
        link: '/admin/category'

    },

    {
        id: 7,
        name: 'carousel',
        label: 'Carousel',
        icon: 'bi bi-sliders',
        link: '/admin/carousel'
    },
    {
        id: 8,
        name: 'testimonials',
        label: 'Testimonials',
        icon: 'bi bi-pencil-fill ',
        link: '/admin/testimonials'

    },



]