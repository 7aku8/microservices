import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { delay, of } from 'rxjs';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(_: any) {
    return of('asdfasdfasldfkj asljfhasldkj').pipe(delay(1000));
  }

  helloWorld() {
    return 'Hello world';
  }
}
