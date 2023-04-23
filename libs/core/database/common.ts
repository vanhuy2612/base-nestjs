import { Account, Role } from '@prisma/client';

export type AccountT = Account & {
  role: Role | null;
};
