// import {Injectable, OnDestroy} from '@angular/core';
// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
// import {Observable, Subject} from 'rxjs';
// import {AuthService} from '@/app/shared/services/auth.service';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate, OnDestroy {
//   destroy$ = new Subject();
//
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//   ) {
//   }
//
//   ngOnDestroy(): void {
//     console.log('Guard destroyed');
//     this.destroy$.next();
//   }
//
//   public canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     console.log(this.authService.currentUser);
//     const currentUser = this.authService.currentUserValue;
//     console.log(currentUser);
//     if (currentUser) {
//       // authorised so return true
//       return true;
//     }
//
//     // this.authService.currentUserSubject
//     //   .pipe(takeUntil(this.destroy$))
//     //   .subscribe((value: any) => {
//     //     console.log(value);
//     //     // tslint:disable-next-line:no-unused-expression
//     //     !!value && this.router.navigate(['/dashboard', 'home']);
//     //   });
//
//     // // not logged in so redirect to login page with the return url
//     // this.router.navigate(['/dashboard', 'login'], {queryParams: {returnUrl: state.url}});
//
//     // return false;
//     return false;
//   }
//
// }
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@/app/shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    
    this.router.navigate(['/dashboard', 'login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}

