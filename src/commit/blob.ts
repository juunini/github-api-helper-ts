import { api } from '@/api'

interface CreateBlobResponse {
  sha: string
  url: string
}

interface CreateBlobProps {
  owner: string
  repo: string
  accessToken: string
  data: string
}

export async function createBlob ({ owner, repo, accessToken, data }: CreateBlobProps): Promise<CreateBlobResponse> {
  return await api({
    uri: `/repos/${owner}/${repo}/git/blobs`,
    accessToken,
    method: 'POST',
    body: JSON.stringify({
      content: data,
      encoding: 'utf-8'
    })
  }) as CreateBlobResponse
}
