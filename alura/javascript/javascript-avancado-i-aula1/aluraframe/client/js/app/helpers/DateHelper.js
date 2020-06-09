class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada.')
    }
    
    static textoParaData(texto) {

        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error('Deve estar no formato aaaa-mm-dd');
        }

        return new Date(...texto.split('-')
        /* I do not agree with this one liner. It is a clever solution to reduce the arrow function (lamba), but I think it is kinda confusing for other developers to read. Why is it subtracting an index from an item? But since it was developed in the course like this, we'll accept it and continue as it is. */
        .map((item,indice) => item - indice %2));
    }

    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }
}