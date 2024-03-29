import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { RequestRoutes } from '../modules/request/request.routes';
import { UserRoutes } from '../modules/user/user.routes';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: UserRoutes
    },
    {
        path: '/',
        route: RequestRoutes
    },
    {
        path: '/',
        route: AuthRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;