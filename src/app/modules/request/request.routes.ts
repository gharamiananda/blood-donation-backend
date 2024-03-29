import express from 'express';
import auth from '../../middlewares/auth';
import { RequestController } from './request.controller';

const router = express.Router();

router.post(
    '/donation-request',
    auth(),
    RequestController.createRequest
);


router.get(
    '/donation-request',
    auth(),
    RequestController.getMyDonorRequests
);


router.get(
    '/donation-request/:requestId',
    auth(),
    RequestController.updateStatusRequest
);




export const RequestRoutes = router;