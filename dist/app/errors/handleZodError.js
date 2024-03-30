"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorDetails = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    const allMessages = errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.map(it => it === null || it === void 0 ? void 0 : it.message).join(" ");
    return {
        statusCode,
        message: allMessages,
        errorDetails,
    };
};
exports.default = handleZodError;
