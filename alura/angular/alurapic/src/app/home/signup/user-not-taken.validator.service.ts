import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { debounceTime, switchMap, map, first } from 'rxjs/operators'

import { SignupService } from './signup.service';

/*
Since validators cannot inject dependencies (and we need an "HttpClient" object to be injected on "SignupService"), we should use another way to create this asynchronous validator. The solution is to create a validator service (this class) which accepts injections and will return the actual method validator on "checkUserNameTaken" method.
*/
@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signupService: SignupService) {

    }

    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => this.signupService.checkUsernameTaken(userName)))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                /* To complete the observation, we use the "first" method to inform that the first element received will conclude the observation. */
                .pipe(first());
        }
    }
}