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
exports.RequestServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createRequestIntoDB = (currentUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.donorId
        },
        include: {
            userProfile: true,
        },
    }), { password } = _a, donarUserData = __rest(_a, ["password"]);
    const createdRequestData = yield prisma_1.default.request.create({
        data: {
            donorId: payload.donorId,
            phoneNumber: payload.phoneNumber,
            dateOfDonation: payload.dateOfDonation,
            hospitalName: payload.hospitalName,
            hospitalAddress: payload.hospitalAddress,
            reason: payload.reason,
            requesterId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId
        }
    });
    return Object.assign(Object.assign({}, createdRequestData), { donor: donarUserData });
});
const getMyDonorRequestsFromDB = (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield prisma_1.default.request.findMany({
        where: {
            donorId: currentUser.userId
        },
        include: {
            requester: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true
                }
            },
        },
    });
    return { request
    };
});
const requestSearchAbleFields = ['name', 'email', 'bloodType', 'location'];
const getDonorListFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondions = [];
    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR: requestSearchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    ;
    const whereConditions = { AND: andCondions };
    const result = yield prisma_1.default.request.findMany({
        where: whereConditions,
        include: {
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    createdAt: true,
                    updatedAt: true,
                    userProfile: true
                }
            }
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });
    const total = yield prisma_1.default.request.count({
        where: whereConditions
    });
    const data = result.map(request => (request.donor));
    return {
        meta: {
            page,
            limit,
            total
        },
        data: data
    };
});
const updateStatusRequestIntoDB = (requestId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const request = yield prisma_1.default.request.update({
        where: {
            id: requestId
        },
        data: {
            requestStatus: payload === null || payload === void 0 ? void 0 : payload.status
        }
    });
    return { request
    };
});
exports.RequestServices = {
    createRequestIntoDB,
    getMyDonorRequestsFromDB,
    updateStatusRequestIntoDB,
    getDonorListFromDB
};
