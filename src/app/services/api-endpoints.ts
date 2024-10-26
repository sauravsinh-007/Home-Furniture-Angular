export const API_ENDPOINTS = {

    LOGIN: '/user/login',
    USERS: '/user/getusers',
    CREATE_USER: '/user/createUser',
    UPDATE_USER: (id: string) => `/user/updateUser/${id}`,
    DELETE_USER: (id: string) => `/user/deleteUser/${id}`,


    MENU: '/menu/getMenus',
    CREATE_MENU: '/menu/createMenu',
    UPDATE_MENU: (id: string) => `/menu/updateMenu/${id}`,
    DELETE_MENU: (id: string) => `/menu/deleteMenu/${id}`,


    ROLE: '/role/getRoles',
    CREATE_ROLE: '/role/createRole',
    UPDATE_ROLE: (id: string) => `/role/updateRole/${id}`,
    DELETE_ROLE: (id: string) => `/role/deleteRole/${id}`,


    CONTENT: '/content/getContent',
    CREATE_CONTENT: '/content/createContent',
    UPDATE_CONTENT: (id: string) => `/content/updateContent/${id}`,
    DELETE_CONTENT: (id: string) => `/content/deleteContent/${id}`,

    CAROUSEL: '/carousel/getCarousel',
    CREATE_CAROUSEL: '/carousel/createCarousel',
    UPDATE_CAROUSEL: (id: string) => `/carousel/updateCarousel/${id}`,
    DELETE_CAROUSEL: (id: string) => `/carousel/deleteCarousel/${id}`,

    CATEGORY: '/category/getCategory',
    CREATE_CATEGORY: '/category/createCategory',
    UPDATE_CATEGORY: (id: string) => `/category/updateCategory/${id}`,
    DELETE_CATEGORY: (id: string) => `/category/deleteCategory/${id}`,


};
