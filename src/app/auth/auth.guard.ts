import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './authService.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        let isAuth = this.authService.isUserAuth();
        this.authService.getAuthStatusListener().subscribe(result => isAuth=result);
        if(!isAuth){
            this.router.navigate(['/auth/signin'])
        }
        return isAuth;
    }

}