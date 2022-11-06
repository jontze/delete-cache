import { getInput, setSecret } from '@actions/core';
import * as github from '@actions/github';

export interface Repo {
  owner: string;
  repo: string;
}

export const getRepo = (): Repo => {
  const repoInput = getInput('repo');
  if (repoInput) {
    const [owner, repo] = repoInput.split('/');
    return { owner, repo };
  }
  return github.context.repo;
};

/**
 * 10 GB is the default limit. Github will start to delete cache. This can lead
 * to cache thrashing, where caches are created and deleted at a high frequency.
 * Therefore it's recommended to stay below this limit.
 * https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy
 */
export const getLimit = (): number => {
  const limitInput = getInput('limit');
  let limit = 10;
  if (limitInput) {
    try {
      limit = parseInt(limitInput, 10);
    } catch (_) {
      throw new Error(
        `Invalid input for "limit". Is ${limitInput} a valid integer?`
      );
    }
  }
  return limit;
};

/**
 * The github token provided by the workflow should be enough to perform
 * the cache deletion in the current repo. However, if you want to delete
 * cache in another repo a PAT with actions:write access is required.
 */
export const getGhToken = (): string => {
  const ghToken = getInput('token');
  if (ghToken === '' || ghToken == null) {
    throw new Error(
      "Couldn't find a github token as input. Please provide a valid token."
    );
  }
  setSecret(ghToken);
  return ghToken;
};
