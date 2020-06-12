const stores = ['negociacoes'];
const version = 4;
const dbname = 'aluraframe';
let connection = null;
let close = null;

export class ConnectionFactory {
    constructor() {
        throw new Error('Não é possível criar instancias de ConnectionFactory.');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open('aluraframe',  1);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result); 
            };

            openRequest.onsuccess = e => {

                if (!connection) {
                    connection = e.target.result;

                    /* Saves original "close" method and bind its execution to "connection" variable. */
                    close = connection.close.bind(connection);
                    /* Apply a monkey patch to replace "close" method. */
                    connection.close = function() {
                        throw new Error('Você não pode fechar diretamente a conexão.');
                    };
                }
                resolve(connection);
            };


            openRequest.onerror = e => {

                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if(connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, {autoIncrement: true})
        });
    }

    static closeConnection() {
        if (connection) {
            close();
            connection = null;
        }
    }
}