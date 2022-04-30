import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger();

(async () => {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats_transporter:4222'],
      queue: 'users_service',
    },
  });

  await app.listen().then(() => logger.log('Users microservice is running...'));
})();
