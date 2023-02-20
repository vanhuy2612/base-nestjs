import { Account } from "@prisma/client";

export type LoginRequestBody = {
    username: string;
    password: string;
}

export type Auth = Account & {
    permissions: string[];
}