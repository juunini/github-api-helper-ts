interface APIProps {
  uri: string
  accessToken: string
  method?: string
  body?: string
}

export async function api ({ uri, accessToken, method = 'GET', body }: APIProps): Promise<unknown> {
  const response = await fetch(`https://api.github.com${uri}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body
  })
  return await response.json()
}
