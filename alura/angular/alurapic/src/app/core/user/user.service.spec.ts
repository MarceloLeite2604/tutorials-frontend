import { UserService } from "./user.service";
import { TestBed } from "@angular/core/testing";

describe('O serviço UserService', () => {
    let service: UserService;

    beforeEach(() => {
        /* 
        const tokenService = new TokenService();
        service = new UserService(tokenService);
        */
        /* Instead of instantiating every object necessary to create an UserService. It is possible to use TestBed as a component depency injector. If a class is injectable, it is as simple as add it in its provider property */
        TestBed.configureTestingModule({
            providers: [
                UserService
            ]
        });
        service = TestBed.get(UserService);
    });

    it('Deve ser instanciado.', () => {
        expect(service).toBeTruthy();
    });

    it('Deve, através de um token, recuperar as informações do usuário.', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5Mzk5ODM3MiwiZXhwIjoxNTk0MDg0NzcyfQ.SBxuxwwtinHkJAYKJkBCATRlUuJMwNe3e9Bf9Vyxntc';
        service.setToken(token);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
        service.getUser().subscribe(user => {
            expect(user.name).toBe('flavio');
        });
    });

    it('Deve limpar as informações no logout.', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5Mzk5ODM3MiwiZXhwIjoxNTk0MDg0NzcyfQ.SBxuxwwtinHkJAYKJkBCATRlUuJMwNe3e9Bf9Vyxntc';
        service.setToken(token);
        service.logout();
        expect(service.isLogged()).toBeFalsy();
        expect(service.getUserName()).toBeFalsy();
    });
});