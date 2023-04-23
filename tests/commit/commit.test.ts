import { createCommit } from '@/commit/commit'

const response = {
  sha: '7638417db6d59f3c431d3e1f261cc637155684cd',
  node_id: 'MDY6Q29tbWl0NzYzODQxN2RiNmQ1OWYzYzQzMWQzZTFmMjYxY2M2MzcxNTU2ODRjZA==',
  url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/7638417db6d59f3c431d3e1f261cc637155684cd',
  author: {
    date: '2014-11-07T22:01:45Z',
    name: 'Monalisa Octocat',
    email: 'octocat@github.com'
  },
  committer: {
    date: '2014-11-07T22:01:45Z',
    name: 'Monalisa Octocat',
    email: 'octocat@github.com'
  },
  message: 'my commit message',
  tree: {
    url: 'https://api.github.com/repos/octocat/Hello-World/git/trees/827efc6d56897b048c772eb4087f854f46256132',
    sha: '827efc6d56897b048c772eb4087f854f46256132'
  },
  parents: [
    {
      url: 'https://api.github.com/repos/octocat/Hello-World/git/commits/7d1b31e74ee336d15cbd21741bc88a537ed063a0',
      sha: '7d1b31e74ee336d15cbd21741bc88a537ed063a0',
      html_url: 'https://github.com/octocat/Hello-World/commit/7d1b31e74ee336d15cbd21741bc88a537ed063a0'
    }
  ],
  verification: {
    verified: false,
    reason: 'unsigned',
    signature: null,
    payload: null
  },
  html_url: 'https://github.com/octocat/Hello-World/commit/7638417db6d59f3c431d3e1f261cc637155684cd'
}

test('createCommit', async () => {
  // @ts-expect-error
  globalThis.fetch = async () => await Promise.resolve({
    json: async () => await Promise.resolve(response)
  })

  const data = await createCommit({
    owner: 'octocat',
    repo: 'example',
    accessToken: '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',
    parentSha: 'aa218f56b14c9653891f9e74264a383fa43fefbd',
    treeSha: '827efc6d56897b048c772eb4087f854f46256132',
    message: 'my commit message'
  })

  expect(data.sha).toEqual(response.sha)
})
