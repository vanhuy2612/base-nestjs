import { HttpStatus } from "@nestjs/common"
import { Account } from "@prisma/client";

export type LoginResponse = {
    status: HttpStatus,
    data: {
        token: string;
        permissions: string[];
    }
}

export type UserIndexResponse = {
    status: HttpStatus,
    data: Account[];
}

export type UserUpdateResponse = {
    status: HttpStatus,
    data: boolean,
}