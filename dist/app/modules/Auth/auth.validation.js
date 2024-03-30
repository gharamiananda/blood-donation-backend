"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationSchemas = exports.BloodGroup = void 0;
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email field is required."
        }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i, {
            message: "Email must be a valid email address."
        }),
        password: zod_1.z.string({
            required_error: "password field is required."
        })
    })
});
exports.BloodGroup = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];
const registerUser = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email field is required."
        }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i, {
            message: "Email must be a valid email address."
        }),
        password: zod_1.z.string({
            required_error: "password field is required."
        }),
        bloodType: zod_1.z.enum([...exports.BloodGroup], {
            required_error: "bloodType field is required."
        }),
        "location": zod_1.z.string({
            required_error: "location field is required."
        }),
        "age": zod_1.z.number({
            required_error: "age field is required.",
            invalid_type_error: 'age must be a valid positive number'
        }),
        "bio": zod_1.z.string({
            required_error: "bio field is required."
        }),
        "lastDonationDate": zod_1.z.string({
            required_error: "lastDonationDate field is required."
        })
    })
});
exports.authValidationSchemas = {
    loginUser,
    registerUser
};
