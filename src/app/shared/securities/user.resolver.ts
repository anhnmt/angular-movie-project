import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../services/user.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUserByUserId(route.params.userId).pipe(
      catchError(error => {
          this.router.navigate(['/dashboard', 'users']);
          return of(null);
        }
      ));
  }
}
