import {
  getMultilineInput,
  debug,
  info,
  group,
  setFailed,
} from '@actions/core';
import { getOctokit } from '@actions/github';
import { deleteRepoCacheByKey } from './delete';
import { getGhToken, getLimit, getRepo } from './setup';

async function run(): Promise<void> {
  try {
    const repo = getRepo();
    debug(
      `Target repository for cache cleaning is: "${repo.owner}/${repo.repo}"`
    );
    const keys: string[] = getMultilineInput('keys');
    debug(
      `Only the cache entries with the following keys will get deleted: "${keys.join(
        ','
      )}"`
    );
    const limit = getLimit();
    debug(`Cache cleaning limit is at "${limit}"`);
    const ghToken = getGhToken();
    const octokit = getOctokit(ghToken);
    debug('Initialization finished');
    if (limit === 10) {
      for (const key of keys) {
        await group<void>(`Delete cache entries for key "${key}"`, async () => {
          const deletedCaches = await deleteRepoCacheByKey(octokit, {
            ...repo,
            key,
          });
          info(`${deletedCaches.amount} cache entries were deleted`);
          for (const cacheItem of deletedCaches.caches) {
            info(
              `Cache with key "${cacheItem.key}" deleted (last used at ${cacheItem.usedAt} on branch "${cacheItem.ref}" )`
            );
          }
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
