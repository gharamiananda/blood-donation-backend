import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
const router = express.Router();

const moduleRoutes = [
    // {
    //     path: '/donation-request',
    //     route: userRoutes
    // },
    // {
    //     path: '/my-profile',
    //     route: AdminRoutes
    // },
    {
        path: '/',
        route: AuthRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;