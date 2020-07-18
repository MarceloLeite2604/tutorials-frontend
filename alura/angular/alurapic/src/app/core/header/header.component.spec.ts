import { HeaderComponent } from "./header.component";
import { async, TestBed } from "@angular/core/testing";
import { UserService } from "../user/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MenuModule } from "src/app/shared/components/menu/menu.module";
import { AlertModule } from "src/app/shared/alert/alert.module";
import { LoadingModule } from "src/app/shared/components/loading/loading.module";
import { of } from "rxjs";
import { Router } from "@angular/router";

describe('O componente header', () => {
    let component : HeaderComponent; 
    let userService: UserService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent
            ],
            providers: [
                UserService
            ], imports: [
                RouterTestingModule.withRoutes([]),
                MenuModule,
                AlertModule,
                LoadingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        userService = TestBed.get(UserService);
        router = TestBed.get(Router);

        spyOn(userService, 'getUser').and.returnValue(
            of({
                name: 'Alvaro',
                email: 'alvaro@alvaro.com',
                id: 1
            })
        );

        const fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        /* Request Angular to detect changes on created component. */
        fixture.detectChanges();
    });

    it('Deve ser instanciado.', () => {
        expect(component).toBeTruthy();
    });

    it('Deve realizar o logout.', () => {
        const userServiceLogoutSpy = spyOn(userService, 'logout').and.returnValue(null);
        const routerNavigateSpy = spyOn(router, 'navigate');
        component.logout();

        expect(userServiceLogoutSpy).toHaveBeenCalled();
        expect(routerNavigateSpy).toHaveBeenCalledWith(['']);
    });
});