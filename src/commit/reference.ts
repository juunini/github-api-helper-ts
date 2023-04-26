import { api } from '@/api'

interface GetReferenceProps {
  owner: string
  repo: string
  accessToken: string
}

interface GetReferenceResponse {
  ref: string
  node_id: string
  url: string
  object: {
    sha: string
    type: string
    url: string
  }
}

export async function getReference ({ owner, repo, accessToken }: GetReferenceProps): Promise<GetReferenceResponse> {
  return await api({
    uri: `/repos/${owner}/${repo}/git/ref/heads/main`,
    accessToken
  }) as GetReferenceResponse
}

interface UpdateReferenceProps {
  commitSha: string
  owner: string
  repo: string
  branch: string
  accessToken: string
}

export interface UpdateReferenceResponse {
  ref: string
  node_id: string
  url: string
  object: {
    sha: string
    type: string
    url: string
  }
}

export async function updateReference ({
  commitSha,
  owner,
  repo,
  branch,
  accessToken
}: UpdateReferenceProps): Promise<UpdateReferenceResponse> {
  return (await api({
    uri: `/repos/${owner}/${repo}/git/refs/heads/${branch}`,
    accessToken,
    method: 'PATCH',
    body: JSON.stringify({ sha: commitSha })
  })) as UpdateReferenceResponse
}
