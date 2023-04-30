import { api } from '@/api'

test('api with method', async () => {
  const response = {
    ref: 'refs/heads/main',
    node_id: 'REF_kwDOJaCAQq9yZWZzL2hlYWRzL21haW4',
    url: 'https://api.github.com/repos/juunini/test/git/refs/heads/main',
    object: {
      sha: '0ce17c726076e7873f1f58bdd73442866cc55506',
      type: 'commit',
      url: 'https://api.github.com/repos/juunini/test/git/commits/0ce17c726076e7873f1f58bdd73442866cc55506'
    }
  }

  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response),
    status: 200
  })

  const data = await api({
    uri: '/repos/juunini/test/git/refs/heads/main',
    accessToken: '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',
    method: 'PATCH',
    body: JSON.stringify({ sha: '0ce17c726076e7873f1f58bdd73442866cc55506' })
  })

  // @ts-expect-error
  expect(data.object.sha).toEqual(response.object.sha)
})

test('api without method', async () => {
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
    json: async () => await Promise.resolve(response),
    status: 200
  })

  const data = await api({
    uri: '/repos/juunini/test/git/ref/heads/main',
    accessToken: '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'
  })

  // @ts-expect-error
  expect(data.object.sha).toEqual(response.object.sha)
})

test('api with error', async () => {
  const response = {
    message: 'Update is not a fast forward',
    documentation_url: 'https://docs.github.com/rest/reference/git#update-a-reference'
  }

  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response),
    status: 422
  })

  try {
    await api({
      uri: '/repos/juunini/test/git/refs/heads/main',
      accessToken: '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',
      method: 'PATCH',
      body: JSON.stringify({ sha: '0ce17c726076e7873f1f58bdd73442866cc55506' })
    })
  } catch (e) {
    // @ts-expect-error
    expect(e.message).toEqual('422: Update is not a fast forward')
    return
  }

  throw new Error('failed')
})
