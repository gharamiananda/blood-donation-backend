import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { authValidationSchemas } from './auth.validation';

const router = express.Router();

router.post(
    '/login',
    validateRequest(authValidationSchemas.loginUser),
    AuthController.loginUser
);

router.post(
    '/register',
    validateRequest(authValidationSchemas.registerUser),
    AuthController.registerUser
)


export const AuthRoutes = router;