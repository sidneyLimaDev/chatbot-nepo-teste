import { isValidCity } from '../src/utils/inputValidator';

describe('inputValidator', () => {
    it('deve retornar true se a entrada for válida', () => {
        expect(isValidCity('São Paulo')).toBe(true);
    });

    it('deve retornar false se a entrada estiver vazia', () => {
        expect(isValidCity('')).toBe(false);
    });
});
