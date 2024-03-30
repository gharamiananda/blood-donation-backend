"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// router.post(
//     '/donation-request',
//     auth(),
//     UserController.createRequest
// );
router.get('/my-profile', (0, auth_1.default)(), user_controller_1.UserController.getMyProfile);
router.put('/my-profile', (0, auth_1.default)(), user_controller_1.UserController.updateUserProfile);
exports.UserRoutes = router;
