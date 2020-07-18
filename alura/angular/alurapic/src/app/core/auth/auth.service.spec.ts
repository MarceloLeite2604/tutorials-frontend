import { AuthService } from "./auth.service";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing"
import { UserService } from "../user/user.service";

describe('O serviço AuthService.', () =>{

    let service: AuthService;
    let httpMock: HttpTestingController;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService
            ]
        });

        service = TestBed.get(AuthService);
        httpMock = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);
    });

    it('Deve ser instanciado.', () => {
        expect(service).toBeTruthy();
    });

    /* Since the authentication process is asynchronous, we will encapsulate our test inside a "fakeAsync" method. */
    it('Deve autenticar o usuário.', fakeAsync(() => {
        const fakeResponseBody = {
            id: 1,
            nome: 'alvaro',
            email: 'alvaro@alura.com'
        };

        /* Method "spyOn" let us customize the objects's response when an method is invoked and retrieve the method called for further analysis. */
        const spyUserServiceSetToken = spyOn(userService, 'setToken').and.returnValue(null);


        service.authenticate('alvaro', '1234').subscribe(response => {
            /* "toEqual" method compares each object property. */
            expect(response.body).toEqual(fakeResponseBody);
            // expect(response.headers.get('x-access-token')).toBe('tokenTest');
            /* We can check if "setToken" method from "UserService" was invoked with a defined parameter. */
            expect(spyUserServiceSetToken).toHaveBeenCalledWith('tokenTest')
        })

        /* Retrieve the object returned when HttpMock receives a "POST" request. */
        const request : TestRequest = httpMock.expectOne(req => {
            return req.method === "POST";
        });

        /* We can configure the HTTP response on "TestRequest" using flush. First parameter is the response body and second parameter receive response headers. */ 
        request.flush(fakeResponseBody, {
            headers: {
                'x-access-token': 'tokenTest' 
            }
        });

        /* Simulates a passage of time. */
        tick();
    }));
});