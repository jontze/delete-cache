import {GitHub} from '@actions/github/lib/utils';

export type HydratedOctokit = InstanceType<typeof GitHub>;

export interface DeletePayload {
  owner: string;
  repo: string;
  key: string;
  ref?: string;
}

export interface DeletedCache {
  id?: number;
  ref?: string;
  key?: string;
  size?: number;
  usedAt?: string;
  createdAt?: string;
}

export interface DeletedCaches {
  amount: number;
  caches: DeletedCache[];
}

export const deleteRepoCacheByKey = async (
  github: HydratedOctokit,
  payload: DeletePayload
): Promise<DeletedCaches> => {
  const res = await github.rest.actions.deleteActionsCacheByKey({
    ...payload
  });
  return {
    amount: res.data.total_count,
    caches: res.data.actions_caches.map(deletedCache => ({
      id: deletedCache.id,
      ref: deletedCache.ref,
      key: deletedCache.key,
      size: deletedCache.size_in_bytes,
      usedAt: deletedCache.last_accessed_at,
      createdAt: deletedCache.created_at
    }))
  };
};
