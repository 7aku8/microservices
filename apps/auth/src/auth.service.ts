import { Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom, throwError, timeout, TimeoutError } from "rxjs";
import { compareSync } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.usersService.send({ role: 'user', cmd: 'get' }, { username })
        .pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof  TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          })
        );

      if (compareSync(password, (await firstValueFrom(user))?.password)) {
        return user;
      }

      return null;
    }
  };
}
