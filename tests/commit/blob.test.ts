import { createBlob } from '@/commit/blob'

const response = {
  url: 'https://api.github.com/repos/octocat/example/git/blobs/3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15',
  sha: '3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15'
}

test('createBlob', async () => {
  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response)
  })

  const data = await createBlob({
    owner: 'octocat',
    repo: 'example',
    accessToken: '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',
    data: 'Hello World'
  })

  expect(data.sha).toEqual(response.sha)
})
