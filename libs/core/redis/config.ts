import Env from '@root/libs/Env';

export const config = {
  host: Env.get('REDIS_HOST', 'localhost'),
  port: Env.get('REDIS_PORT', 'localhost'),
};
