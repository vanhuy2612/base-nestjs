import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';

@Injectable()
export class AuthService extends BaseService {
    async login(): Promise<any> {
        return {};
    }
}
