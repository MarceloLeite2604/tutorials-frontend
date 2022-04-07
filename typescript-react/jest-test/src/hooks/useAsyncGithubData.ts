import { Octokit } from 'octokit';
import { useAsync } from 'react-async-hook';
import { GithubUserData } from '../types';

const octokit = new Octokit();

export function useAsyncGithubData(username: string) {
  return useAsync(() => {
    return octokit.rest.users.getByUsername({ username })
      .then(({ data }) => {
        return {
          username: data.login,
          avatarUrl: data.avatar_url

        } as GithubUserData;
      });
  }, [username]);
}
