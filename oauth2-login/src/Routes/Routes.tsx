import { MouseEventHandler } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GithubAuthenticationRoute } from './Authentication';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';

const stateKey = 'oauth2-login.github.authentication.state';

const onClick: MouseEventHandler<HTMLButtonElement> = async () => {
  const state = uuidv4();
  console.log(`GithubAuthentication: state is ${state}`);

  window.sessionStorage.setItem(stateKey, state);
  const parameters = {
    client_id: '735759697541-2vc1bcpkfrol0qhfhgqvtcaaa6mkms82.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/authentication/google/callback',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    state
  };

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryString.stringify(parameters)}`;

  console.log('Opening login window.');
  const loginWindow = window.open(url);

  const timer = setInterval(() => {
    if (loginWindow?.closed) {
      clearInterval(timer);
      console.log('Login window closed.');
    }
  }, 500);

  console.log('Awaiting result.');
  await new Promise<Event>(resolve => window.addEventListener('login', resolve))
    .then(res => {
      console.log('Response received.');
      console.log(res);
      console.log((res as CustomEvent).detail);
      const { state: returnedState, code } = (res as CustomEvent<{ state: string, code: string }>).detail;
      console.log(`GithubAuthenticationCallback: state is ${state}`);
      if (state !== returnedState || !code) {
        throw new Error('Invalid response from authentication provider.');
      }

      const body = new URLSearchParams({
        client_id: '0a950e9973f46b033656',
        code,
        redirect_uri: 'http://localhost:3000/',
        state,
        grant_type: 'authorization_code'
      });

      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Could not fetch token.');
          }
          console.log(res.json());
        });
    });
  console.log('Result received.');
};

export const Login = () => <button onClick={onClick}>Log In</button>;

export const Routes = () => <Router>
  <GithubAuthenticationRoute />
  <Route path='/'>
    <button onClick={onClick}>Log In</button>
  </Route>
</Router>;
