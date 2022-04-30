import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersServiceClient: ClientProxy,
  ) {}

  pingUsersService() {
    const startTs = Date.now();

    const pattern = { cmd: 'ping' };
    const payload = {};

    return this.usersServiceClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
