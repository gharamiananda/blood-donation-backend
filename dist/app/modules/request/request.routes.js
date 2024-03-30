"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const request_controller_1 = require("./request.controller");
const router = express_1.default.Router();
router.post('/donation-request', (0, auth_1.default)(), request_controller_1.RequestController.createRequest);
router.get('/donation-request', (0, auth_1.default)(), request_controller_1.RequestController.getMyDonorRequests);
router.put('/donation-request/:requestId', (0, auth_1.default)(), request_controller_1.RequestController.updateStatusRequest);
router.get('/donor-list', 
// auth(),
request_controller_1.RequestController.getDonorList);
exports.RequestRoutes = router;
