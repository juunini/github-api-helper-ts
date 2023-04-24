import { api } from '@/api'

interface CreateCommitResponse {
  sha: string
  node_id: string
  url: string
  html_url: string
  author: {
    name: string
    email: string
    date: string
  }
  committer: {
    name: string
    email: string
    date: string
  }
  tree: {
    sha: string
    url: string
  }
  message: string
  parents: Array<{
    sha: string
    url: string
    html_url: string
  }>
  verification: {
    verified: boolean
    reason: string
    signature: string | null
    payload: string | null
  }
}

interface CreateCommitProps {
  owner: string
  repo: string
  accessToken: string
  treeSha: string
  parentSha: string
  committer: {
    name: string
    email: string
  }
  message: string
}

export async function createCommit ({
  owner, repo: repoName, accessToken, treeSha, parentSha, committer, message
}: CreateCommitProps): Promise<CreateCommitResponse> {
  return await api({
    uri: `/repos/${owner}/${repoName}/git/commits`,
    accessToken,
    method: 'POST',
    body: JSON.stringify({
      message,
      tree: treeSha,
      author: {
        name: committer.name,
        email: committer.email,
        date: new Date().toISOString()
      },
      parents: [parentSha]
    })
  }) as CreateCommitResponse
}
