"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchemas = void 0;
const zod_1 = require("zod");
const updateProfile = zod_1.z.object({
    body: zod_1.z.object({
        "age": zod_1.z.number({
            required_error: "age field is required."
        }).optional(),
        "bio": zod_1.z.string({
            required_error: "bio field is required."
        }).optional(),
        "lastDonationDate": zod_1.z.string({
            required_error: "lastDonationDate field is required."
        }).optional()
    })
});
exports.userValidationSchemas = {
    updateProfile
};
