export class HttpService {

    _handleErrors(res) {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }

    get(url) {
        /* Second method: Using "fetch" available since ES2016. */
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());

        /* 
            First method: Using XMLHttpRequest.
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
    
            xhr.onreadystatechange = () => {
                // XMLHttpRequest ready state values:
                //     0 - Not started.
                //     1 - Connection stablished.
                //     2 - Request received.
                //     3 - Processing request.
                //     4 - Request complete, answer ready.
               if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana anterior.');
                    }
                }
            }
            
            xhr.send();
        });
        */
    }

    post(url, dado) {
        /* Second method: Using "fetch" available since ES2016. */
        return fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));

        /* 
            First method: Using XMLHttpRequest.
        return new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.responseText));
                    } else {
                                    reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado));
        });
        */
    }
}