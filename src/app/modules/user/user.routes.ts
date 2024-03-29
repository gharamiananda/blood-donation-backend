import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

// router.post(
//     '/donation-request',
//     auth(),
//     UserController.createRequest
// );


router.get(
    '/my-profile',
    auth(),
    UserController.getMyProfile
);

router.put(
    '/my-profile',
    auth(),
    UserController.updateUserProfile
);




export const UserRoutes = router;