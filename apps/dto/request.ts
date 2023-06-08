import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

export class UserUpdateInput {
  @ApiProperty()
  @IsString()
  name: string | undefined;
  @ApiProperty()
  @IsNumber()
  age: number | undefined;
}

export class UserUpdateRequest {
  @ApiProperty({ type: UserUpdateInput })
  data: UserUpdateInput;
}
