import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput', {static: true}) emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorSerice : UserNotTakenValidatorService,
        private sigupService: SignupService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: [
                '', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: [
                '', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: [
                '', 
                /* The second parameter array is for synchronous validators. */
                [
                    Validators.required,
                    /* Validators.pattern(/^[a-z0-9_\-]+$/), */
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                /* The third parameter array is for asynchronous validators. */
                [
                    /*
                    Check if username has been took is disable to simplify Jasmine studies *sigh*.
                    this.userNotTakenValidatorSerice.checkUserNameTaken()
                    */
                ]
            ],
            password: [
                '', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        }, 
        { 
            validator: userNamePassword
        });

        if (this.platformDetectorService.isPlatformBrowser()) {
            this.emailInput.nativeElement.focus();
        }
    }

    /*
    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.sigupService.signup(newUser).subscribe( () =>
            this.router.navigate(['']),
            err => console.log(err)
            );
    }
    */

    /* Modified method to validate content when user submits form. */
    signup() {
        if (this.signupForm.valid && !this.signupForm.pending) {
            const newUser = this.signupForm.getRawValue() as NewUser;
            this.sigupService.signup(newUser).subscribe( () =>
                this.router.navigate(['']),
                err => console.log(err)
                );
        }
    }
}