import { Account } from '@prisma/client';

export type Auth = Account & {
  permissions: string[];
};
