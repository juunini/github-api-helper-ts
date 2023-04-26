import { getReference, updateReference } from '@/commit/reference'

test('getReference', async () => {
  const response = {
    ref: 'refs/heads/featureA',
    node_id: 'MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==',
    url: 'https://api.github.com/repos/octocat/Hello-World/git/refs/heads/featureA',
    object: {
      type: 'commit',
      sha: 'aa218f56b14c9653891f9e74264a383fa43fefbd',
      url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd'
    }
  }

  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response)
  })

  const data = await getReference({
    owner: 'juunini',
    repo: 'github-api',
    accessToken: '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'
  })

  expect(data.object.sha).toEqual(response.object.sha)
})

test('updateReference', async () => {
  const response = {
    ref: 'refs/heads/featureA',
    node_id: 'MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==',
    url: 'https://api.github.com/repos/octocat/Hello-World/git/refs/heads/featureA',
    object: {
      type: 'commit',
      sha: 'aa218f56b14c9653891f9e74264a383fa43fefbd',
      url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd'
    }
  }

  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response)
  })

  const data = await updateReference({
    owner: 'juunini',
    repo: 'github-api',
    branch: 'main',
    accessToken: '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',
    commitSha: 'aa218f56b14c9653891f9e74264a383fa43fefbd'
  })

  expect(data.object.sha).toEqual(response.object.sha)
})
