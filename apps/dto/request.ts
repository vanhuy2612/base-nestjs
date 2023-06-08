import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class UserWhereInput {
  @ApiProperty()
  name: string | undefined;
}
export class UserIndexRequest {
  @ApiProperty({ type: UserWhereInput })
  where: UserWhereInput;
}
