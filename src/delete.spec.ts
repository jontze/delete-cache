/* eslint-disable camelcase */
import { DeletePayload, deleteRepoCacheByKey, HydratedOctokit } from './delete';

describe('DeleteRepoCacheByKey', () => {
  let mockPayload: DeletePayload;
  let spyDeleteActionsCacheByKey: jest.Mock;
  let mockReturn: {};
  const mockAmount = 1;
  const mockCache = {
    id: 123,
    ref: 'main',
    key: 'my-cache-key-1',
    size_in_bytes: 100,
    created_at: 'today',
    last_accessed_at: 'today',
  };

  beforeEach(() => {
    mockPayload = {
      key: 'my-cache-key-1',
      owner: 'jontze',
      repo: 'delete-cache',
    };
    mockReturn = {
      data: {
        total_count: mockAmount,
        actions_caches: [Object.assign({}, mockCache)],
      },
    };
    spyDeleteActionsCacheByKey = jest.fn();
    spyDeleteActionsCacheByKey.mockResolvedValue(mockReturn);
  });

  it('should delete caches with matching key', async () => {
    const mockGithub = {
      rest: {
        actions: {
          deleteActionsCacheByKey: spyDeleteActionsCacheByKey,
        },
      },
    } as unknown as HydratedOctokit;
    await deleteRepoCacheByKey(mockGithub, mockPayload);
    expect(spyDeleteActionsCacheByKey).toHaveBeenCalledWith({
      ...mockPayload,
    });
  });

  it('should return deleted amnount', async () => {
    const mockGithub = {
      rest: {
        actions: {
          deleteActionsCacheByKey: spyDeleteActionsCacheByKey,
        },
      },
    } as unknown as HydratedOctokit;
    const ret = await deleteRepoCacheByKey(mockGithub, mockPayload);
    expect(ret.amount).toBe(mockAmount);
  });

  it('should return list of deleted caches', async () => {
    const mockGithub = {
      rest: {
        actions: {
          deleteActionsCacheByKey: spyDeleteActionsCacheByKey,
        },
      },
    } as unknown as HydratedOctokit;
    const ret = await deleteRepoCacheByKey(mockGithub, mockPayload);
    expect(Array.isArray(ret.caches)).toBe(true);
  });

  it('should return details of deleted caches', async () => {
    const mockGithub = {
      rest: {
        actions: {
          deleteActionsCacheByKey: spyDeleteActionsCacheByKey,
        },
      },
    } as unknown as HydratedOctokit;
    const ret = await deleteRepoCacheByKey(mockGithub, mockPayload);
    expect(ret.caches[0].id).toBe(mockCache.id);
    expect(ret.caches[0].key).toBe(mockCache.key);
    expect(ret.caches[0].ref).toBe(mockCache.ref);
    expect(ret.caches[0].createdAt).toBe(mockCache.created_at);
    expect(ret.caches[0].usedAt).toBe(mockCache.last_accessed_at);
    expect(ret.caches[0].size).toBe(mockCache.size_in_bytes);
  });
});
