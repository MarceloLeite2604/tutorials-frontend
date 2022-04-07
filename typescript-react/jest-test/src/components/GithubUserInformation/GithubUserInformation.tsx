import { useAsyncGithubData } from '../../hooks';

interface GithubUserInformationProperties {
  username: string
}

export const GithubUserInformation = ({ username } : GithubUserInformationProperties) => {

  const asyncStateGithubUserData = useAsyncGithubData(username);

  return (
    <div>
      {asyncStateGithubUserData.loading && <p>Fetching user information...</p>}
      {asyncStateGithubUserData.error && <p>Could not load user information.</p>}
      {asyncStateGithubUserData.result &&
        <div>
          <p><b>Username:</b> {asyncStateGithubUserData.result.username}</p>
          <img src={asyncStateGithubUserData.result.avatarUrl} alt='Github user avatar image.' width='64px' />
        </div>}
    </div>
  );
};
