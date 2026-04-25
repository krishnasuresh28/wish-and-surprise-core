"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    whatsappNumber: String
    profileImage: String
  }

  type Query {
    # Get all users
    getUsers: [User]
    # Get one user by ID
    getUser(id: ID): User


  }

  type Mutation {
    # Create a new user
    createUser(name: String!, email: String!, whatsappNumber: String): User
    addUser(name:String!, email:String!,whatsappNumber: String) : User
  }
`;
