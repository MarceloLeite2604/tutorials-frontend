import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private userService : UserService,
        private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |Observable<boolean> | Promise<boolean> {

        if (!this.userService.isLogged()) {
            /* When an used tries to access a protected path and it is not logged on, the system will redirect it to home page and also add a query parameter informing the path the used tried to navigate to. We can use it later to redirect him after a successful login. */
            this.router.navigate(
                [''],
                {
                    queryParams: {
                        fromUrl: state.url
                    }
                });
            return false;
        }

        return true;
    }
}