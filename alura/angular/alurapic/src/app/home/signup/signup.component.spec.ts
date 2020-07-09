import { async, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { SignUpComponent } from "./signup.component";
import { SignupService } from "./signup.service";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VMessageModule } from "src/app/shared/components/vmessage/vmessage.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

describe('O formulário SignUp', () => {

    let component: SignUpComponent;
    let router: Router;
    let signUpService: SignupService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SignUpComponent
            ],
            providers: [
                SignupService,
                UserNotTakenValidatorService
            ],
            imports: [
                HttpClientTestingModule,
                VMessageModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    }));
 
    beforeEach(() =>{
        router = TestBed.get(Router);
        signUpService = TestBed.get(SignupService);
        const fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Deve ser instanciado.', () => {
        expect(component).toBeTruthy();
    });

    it('Deve cadastrar um usuário.', () => {
        const navigateSpy = spyOn(router, 'navigate');
        spyOn(signUpService, 'signup').and.returnValue(of(null));

        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('12345678');
        component.signup();

        expect(component.signupForm.valid).toBeTruthy();
        //expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

    it('Deve realizar o log caso ocorra algum erro.', () => {
        const consoleLogSpy = spyOn(console, 'log');
        spyOn(signUpService, 'signup').and.returnValue(throwError('Erro de servidor.'));

        component.signupForm.get('email').setValue('alvaro@alvaro.com');
        component.signupForm.get('fullName').setValue('Alvaro');
        component.signupForm.get('userName').setValue('alvaro');
        component.signupForm.get('password').setValue('12345678');
        component.signup();

        expect(consoleLogSpy).toHaveBeenCalledWith('Erro de servidor.')
    });
});