function processaToken(token) {
    if (typeof (token) === 'string') {
        return token.replace(/2/g, 'X');
    }
    else {
        return token.toFixed().replace(/2/g, 'X');
    }
}
const tokenProcessado = processaToken('1234');
const segundoTokenProcessado = processaToken(1234);
