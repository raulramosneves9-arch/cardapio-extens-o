import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('@/views/HomeView.vue');
const MenuView = () => import('@/views/MenuView.vue');
const CartView = () => import('@/views/CartView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const LoginView = () => import('@/views/LoginView.vue');

import store from '@/store';

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/menu', name: 'menu', component: MenuView },
    { path: '/cart', name: 'cart', component: CartView, meta: { requiresAuth: true } },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/:catchAll(.*)', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
