import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/auth/auth.service";
import { PlatformDetectorService } from "src/app/core/platform/platform-detector.service";

/* Since its component is a page, there is no need to declare a selector for it. */
@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameImput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService, 
        private router: Router,
        private platformDetectionService: PlatformDetectorService) { }
    
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            /* 
                The properties receives an array. 
                The first element is its default value.
                The second element is a validation.
            */
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {

        console.log('autenticando');
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        
        return this.authService
            .authenticate(userName, password)
            .subscribe(() => 
                this.router.navigate(['users', userName]),
                err => {
                    console.log(err.message);
                    /* Here we should use a "Renderer" object like we did on "darken-on-hover" directive, but unfortunatelly on Angular's project version it is not possible to focus the element (it has been deprecated). Newer Angular versions might have solved this, but we'll to stick with that here. ¯\_(ツ)_/¯ 
                    Observation: The following condition prevents the "focus" request to run on a server side, where the DOM object is not available. */
                    if (this.platformDetectionService.isPlatformBrowser()) {
                        this.userNameImput.nativeElement.focus();
                    }
                    this.loginForm.reset();
                });
    }
}