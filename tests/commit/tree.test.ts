import { createTree } from '@/commit/tree'

const response = {
  sha: 'cd8274d15fa3ae2ab983129fb037999f264ba9a7',
  url: 'https://api.github.com/repos/octocat/Hello-World/trees/cd8274d15fa3ae2ab983129fb037999f264ba9a7',
  tree: [
    {
      path: 'file.rb',
      mode: '100644',
      type: 'blob',
      size: 132,
      sha: '7c258a9869f33c1e1e1f74fbb32f07c86cb5a75b',
      url: 'https://api.github.com/repos/octocat/Hello-World/git/blobs/7c258a9869f33c1e1e1f74fbb32f07c86cb5a75b'
    }
  ],
  truncated: true
}

test('createTree', async () => {
  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response)
  })

  const data = await createTree({
    owner: 'octocat',
    repo: 'example',
    accessToken: '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',
    parentSha: 'aa218f56b14c9653891f9e74264a383fa43fefbd',
    files: [{
      path: 'file.rb',
      sha: '7c258a9869f33c1e1e1f74fbb32f07c86cb5a75b'
    }]
  })

  expect(data.sha).toEqual(response.sha)
})
