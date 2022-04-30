import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats_transporter:4222'],
      queue: 'auth_service',
    },
  });
  await app.listen().then(() => logger.log('Auth microservice is running...'));
}
bootstrap();
