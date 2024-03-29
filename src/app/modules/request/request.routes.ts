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


router.put(
    '/donation-request/:requestId',
    auth(),
    RequestController.updateStatusRequest
);

router.get(
    '/donor-list',
    // auth(),
    RequestController.getDonorList
);





export const RequestRoutes = router;