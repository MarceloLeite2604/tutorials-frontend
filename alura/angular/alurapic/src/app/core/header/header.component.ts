import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Observable } from 'rxjs';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'})
export class HeaderComponent {

    /* It is as good practice to add a dollar sign at the end of variables of type "Observable". */
    user$: Observable<User>;
    /*
    We will retrieve user value directly on template.
    user: User; 
    */

    constructor(private userService:UserService, private router: Router) {
        this.user$ = userService.getUser();
        /* this.user$.subscribe(user => this.user = user); */
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['']);   
    }
}