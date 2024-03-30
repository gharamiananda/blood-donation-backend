"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusValidationSchemas = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createRequest = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string({
            required_error: "donorId field is required."
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber field is required."
        }),
        dateOfDonation: zod_1.z.string({
            required_error: "dateOfDonation field is required."
        }), hospitalName: zod_1.z.string({
            required_error: "hospitalName field is required."
        }), hospitalAddress: zod_1.z.string({
            required_error: "hospitalAddress field is required."
        }), reason: zod_1.z.string({
            required_error: "reason field is required."
        }),
    })
});
const updateStatusRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...Object.values(client_1.RequestStatus)]),
    })
});
exports.statusValidationSchemas = {
    createRequest,
    updateStatusRequest
};
