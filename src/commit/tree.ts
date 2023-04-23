import { api } from '@/api'

interface CreateTreeResponse {
  sha: string
  url: string
  tree: Array<{
    path: string
    mode: string
    type: string
    sha: string
    size: number
    url: string
  }>
  truncated: boolean
}

interface CreateTreeProps {
  owner: string
  repo: string
  accessToken: string
  parentSha: string
  files: Array<{ path: string, sha: string, mode?: string }>
}

export async function createTree ({ owner, repo, accessToken, parentSha, files }: CreateTreeProps): Promise<CreateTreeResponse> {
  return await api({
    uri: `/repos/${owner}/${repo}/git/trees`,
    accessToken,
    method: 'POST',
    body: JSON.stringify({
      base_tree: parentSha,
      tree: files.map(({ path, sha, mode = '100644' }) => ({
        path,
        mode,
        type: 'blob',
        sha
      }))
    })
  }) as CreateTreeResponse
}
