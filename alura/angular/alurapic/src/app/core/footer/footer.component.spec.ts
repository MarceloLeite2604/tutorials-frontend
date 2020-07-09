import { TestBed, async } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserService } from "../user/user.service";
import { of } from "rxjs";

describe('O componente footer', () => {
    let component: FooterComponent;

    /* 
    Compile components is an asynchronous method (component creation might take some time to complete), so Angular recommends to wrap it around an "async" method to wait for its execution to move on.
    It is a best practice to split synchronous and asynchronous "beforeEach" method executions. 
    */
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [ UserService ],
            declarations: [
                FooterComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        const userService = TestBed.get(UserService);

        spyOn(userService, 'getUser').and.returnValue(of({
            email: 'alvaro@alvaro.com',
            name: 'Alvaro',
            id: 1
        }))

        /* Since "FooterComponent" is not injectable, we have to request its creation. */
        const fixture = TestBed.createComponent(FooterComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it ('Deve ser instanciado.', () => {
        expect(component).toBeTruthy();
    })
});