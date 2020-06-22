import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";

/* Since its component is a page, there is no need to declare a selector for it. */
@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
    
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
                console.log('Autenticado.'), 
                err => {
                    console.log(err.message);
                    this.loginForm.reset();
                });
    }
}