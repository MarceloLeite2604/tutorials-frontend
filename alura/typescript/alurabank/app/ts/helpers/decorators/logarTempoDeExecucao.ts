export function logarTempoDeExecucao(emSegundos: boolean = false) {

    /*
    propertyKey: Method name.
    descriptor: Decorator contents (including the invoked method).
    */
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        /* This function will replace the original method invoked. */
        descriptor.value = function(...args: any[]) {
            let unidade = "ms";
            let divisor = 1;

            if (emSegundos) {
                unidade = "s";
                divisor = 1000;
            }

            console.log('------------');
            console.log(`Os parâmetros passados para o método ${propertyKey} são ${JSON.stringify(args)}`);
            const t1 = performance.now();
            /* The original method is invoked. */
            const retorno = metodoOriginal.apply(this, args);
            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`)
            const t2 = performance.now();
            console.log(`O método ${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}.`)
            return retorno;
        }

        return descriptor;
    }
}