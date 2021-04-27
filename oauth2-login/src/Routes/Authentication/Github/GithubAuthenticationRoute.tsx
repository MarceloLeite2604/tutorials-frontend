import { BrowserRouter as Router, Route } from 'react-router-dom';
import queryString from 'query-string';

const GithubAuthenticationCallback = () => {
  const parameters = queryString.parse(location.search);
  console.log(location.search);

  if (!parameters.state || !parameters.code) {
    throw new Error('Something went wrong on authentication.');
  }

  if (window.opener) {
    const loginEvent = new CustomEvent<{ state: string, code: string }>('login', {
      detail: {
        state: parameters.state as string,
        code: parameters.code as string
      }
    });
    window.opener.dispatchEvent(loginEvent);
    // setInterval(() => window.close(), 1000);
  }
  return null;
};

export const GithubAuthenticationRoute = () => <Router>
  <Route exact path="/authentication/google/callback">
    <GithubAuthenticationCallback />
  </Route>
</Router>;
