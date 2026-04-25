"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = __importDefault(require("./models/User"));
exports.resolvers = {
    Query: {
        getUsers: async () => await User_1.default.find(),
        getUser: async (_, { id }) => await User_1.default.findById(id),
    },
    Mutation: {
        createUser: async (_, { name, email, whatsappNumber }) => {
            const newUser = new User_1.default({ name, email, whatsappNumber });
            return await newUser.save();
        },
        addUser: async (_, { name, email, whatsappNumber }) => {
            const newUSer = new User_1.default({ name, email, whatsappNumber });
            return await newUSer.save();
        },
    },
};
