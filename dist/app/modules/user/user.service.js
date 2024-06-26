"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMyProfileFromDB = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId
        },
        include: {
            userProfile: true,
        },
    }), { password } = _a, userData = __rest(_a, ["password"]);
    return userData;
});
const updateMyProfileIntoDB = (currentUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.userProfile.update({
        where: {
            userId: currentUser.userId
        },
        data: payload
    });
    return userData;
});
exports.UserServices = {
    getMyProfileFromDB,
    updateMyProfileIntoDB
};
