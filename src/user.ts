interface UserResponse {
  'login': string
  'id': number
  'node_id': string
  'avatar_url': string
  'gravatar_id': string
  'url': string
  'html_url': string
  'followers_url': string
  'following_url': string
  'gists_url': string
  'starred_url': string
  'subscriptions_url': string
  'organizations_url': string
  'repos_url': string
  'events_url': string
  'received_events_url': string
  'type': string
  'site_admin': boolean
  'name': string
  'company': string
  'blog': string
  'location': string
  'email': string
  'hireable': boolean
  'bio': string
  'twitter_username': string
  'public_repos': number
  'public_gists': number
  'followers': number
  'following': number
  'created_at': string
  'updated_at': string
}

interface Props {
  accessToken?: string
  id?: number
}

export async function user ({ accessToken, id }: Props): Promise<UserResponse> {
  if (id !== undefined) {
    return await userById(id)
  }

  if (accessToken === undefined) {
    throw new Error('accessToken or id is required')
  }

  return await userByAccessToken(accessToken)
}

async function userByAccessToken (accessToken: string): Promise<UserResponse> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const data = await response.json() as any

  if (response.status >= 400) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`${response.status}: ${data.message}`)
  }

  return data
}

async function userById (id: number): Promise<UserResponse> {
  const response = await fetch(`https://api.github.com/user/${id}`)
  const data = await response.json() as any

  if (response.status >= 400) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`${response.status}: ${data.message}`)
  }

  return data
}
