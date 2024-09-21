import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  private readonly authServicep = inject(AuthService);
  private readonly router = inject(Router);
  // constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      if(error) {
        switch (error.status) {
          case 401 || 403:
            this.authServicep.logoutConf();
            this.router.navigate(['./auth']);
            break;
          case 500:
            // toas error message server
            break;
          default:

            break;
        }
      }

      throw error;
    }));
  }
}
