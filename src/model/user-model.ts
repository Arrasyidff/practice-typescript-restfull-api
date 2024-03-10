import { User } from "@prisma/client"

export type UserResponse = {
    username: String
    name: String
    token?: String
}

export type CreateUserRequest = {
    username: String
    name: String
    password: String
}

export function toUserResponse(user: User): UserResponse
{
    return {
        name: user.name,
        username: user.username
    }
}