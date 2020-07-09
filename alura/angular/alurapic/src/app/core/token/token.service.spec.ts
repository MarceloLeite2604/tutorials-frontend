import { TokenService } from "./token.service";

describe('O serviço TokenService', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5Mzk5ODM3MiwiZXhwIjoxNTk0MDg0NzcyfQ.SBxuxwwtinHkJAYKJkBCATRlUuJMwNe3e9Bf9Vyxntc';
    let service = new TokenService();

    it('Deve ser instanciado', () => {
        /* If service does not contain a "TokenService" instance, it will either be "undefined" or "null". Both values are validated as "false" in Javascript. */
        expect(service).toBeTruthy();
    });
    it ('Deve guardar um token', () => {
        service.setToken(token);
        expect(service.hasToken()).toBeTruthy();
        /* It is a good practice to validate agains the same value instead of using the same variable. */
        expect(service.getToken()).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5Mzk5ODM3MiwiZXhwIjoxNTk0MDg0NzcyfQ.SBxuxwwtinHkJAYKJkBCATRlUuJMwNe3e9Bf9Vyxntc')
    });

    it ('Deve remove um token', () => {
        service.setToken(token);
        service.removeToken();
        expect(service.hasToken()).toBeFalsy();
        /* Since Javascript validates both null and empty string to be false, it is possible to use "toBeFalsy" method. */
        expect(service.getToken()).toBeFalsy();
    });

    afterEach(() => {
        localStorage.clear();
    });

    beforeEach(() => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5Mzk5ODM3MiwiZXhwIjoxNTk0MDg0NzcyfQ.SBxuxwwtinHkJAYKJkBCATRlUuJMwNe3e9Bf9Vyxntc';
        service = new TokenService();
    })
});