import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {AuthService} from '../services/auth.service';
import {Router} from '~/@angular/router';
import {catchError} from '~/rxjs/internal/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const currentUser = this.authService.currentUserValue;

    console.log(currentUser);

    if (currentUser && currentUser.token) {
      authReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${currentUser.token}`)});
    }

    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          return [];
        }

        return throwError(error);
      }
    ));
  }
}
