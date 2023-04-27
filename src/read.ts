import { api } from './api'

interface ReadFileResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content: string
  encoding: string
  _links: {
    self: string
    git: string
    html: string
  }
}

interface ReadDirectoryResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  _links: {
    self: string
    git: string
    html: string
  }
}

interface ReadProps {
  owner: string
  repo: string
  path: string
  branch?: string
  accessToken: string
}

export async function read (
  { owner, repo, path, branch, accessToken }: ReadProps
): Promise<ReadFileResponse | ReadDirectoryResponse[]> {
  const ref = branch === undefined || branch === '' ? '' : `?ref=${branch}`

  return await api({
    uri: `/repos/${owner}/${repo}/contents/${path}${ref}`,
    accessToken
  }) as ReadFileResponse | ReadDirectoryResponse[]
}
