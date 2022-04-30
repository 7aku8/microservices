import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

(async () => {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(3000);
})();
