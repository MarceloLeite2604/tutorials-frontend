import { isLowerCase } from "./lower-case.validator";

describe('A função lowerCaseValidator', () => {
    it('Deve confirmar quando recebe um texto em caixa baixa', () => {
        /* Arrange */
        const valor = 'mario';
        /* Act */
        const resultado = isLowerCase(valor);
        /* Assert */
        expect(resultado).toBeTruthy();
    });
    it('Deve validar quando o valor enviado não for caixa baixa', () => {
        /* Arrange, act and assert in one line. */
        expect(isLowerCase('Mario')).toBeFalsy();
    });
})