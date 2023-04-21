import Env from "@root/libs/Env";

export const config = {
  host: Env.get('KAFKA_HOST', 'localhost'),
  port: Env.get('KAFKA_PORT', 'localhost'),
  groupId: 'kafka-group-id',
  injectionToken: 'KAFKA-INJECTION-TOKEN',
  clientId: 'KAFKA-CLIENT-ID',
};