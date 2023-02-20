import { Account } from "@prisma/client";
import { Request } from "express";

export interface RequestT extends Request {
    auth?: Account & { permissions: string[] };
}