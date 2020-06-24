import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class UserService {

    
    /* The main difference between "Subject" and "BehaviorSubject" it that the former publishes its values and discard it, while the latter publishes its value and preserves it until someone consumes it. 
    Here, the "User" is published when "UserService.constructor" method is executed, but at this point the application didn't rendered the header DOM yet. We have to preserve the value until the "HeaderComponent" instance subscribes on userSubject and request its value. Hence the BehaviorSubject. */
    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService){
        if (this.tokenService.hasToken() ) {
            this.decodeAndNotify();
        }
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify()

    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}