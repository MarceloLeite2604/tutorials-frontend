import { Injectable } from "@angular/core";

const KEY = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService {


    hasToken(){
        /* Double exclamation is an old Javascript trick to convert an object to a boolean value. The first exclamation will obligate the result of "this.getToken" to be analyzed as a boolean result (empty string are analyzed as "false"), but it will also negate is value. To fix this, we use the second exclamation (negating again the result).
        *sigh* I strongly do not recommend tricks like these (one-liners). It might save you some characters and lines, but other developers might find this hard to understand. Depending on the level of your one-liner, not even you on the future might be able to understand it (yeah, I'm talking about my C++ "smart" solutions back in 2005. Shame! shame! **rings bell** ) */
        return !!this.getToken();
    }

    setToken(token:string) {
        /* Observation: Local storage is not the same as IndexedDB (I'm writing this hoping that my future self does not make this mistake [no, I won't {yes, you will}]) */
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}