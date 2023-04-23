import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Account } from '@prisma/client';

export class PaginationResponse<TData> {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  data: TData[];
}

export class AccountDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}

export class LoginResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  data: {
    token: string;
    permissions: string[];
  };
}

export type UserIndexResponse = {
  status: HttpStatus;
  data: Account[];
};

export type UserUpdateResponse = {
  status: HttpStatus;
  data: boolean;
};
