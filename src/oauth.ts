interface TokenResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  token_type: string
  scope: string
}

interface TokenErrorResponse {
  error: string
  error_description: string
  error_uri: string
}

class TokenError extends Error {
  constructor (public response: TokenErrorResponse) {
    super(response.error_description)
  }
}

export class OAuth {
  public loginURL: URL

  constructor (private readonly clientId: string, private readonly clientSecret: string) {
    this.loginURL = new URL(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.clientId}`)
  }

  public async accessToken (code: string): Promise<TokenResponse> {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST'
      }
    )
    const data: Record<string, any> = await response.json()

    if (data.error !== undefined) {
      throw new TokenError(data as TokenErrorResponse)
    }

    return data as TokenResponse
  }

  public async refreshToken (refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST'
      }
    )
    const data: Record<string, any> = await response.json()

    if (data.error !== undefined) {
      throw new TokenError(data as TokenErrorResponse)
    }

    return data as TokenResponse
  }
}

interface LoginURLProps {
  clientId: string
  redirectURL?: string
  login?: string
  scope?: string
  state?: string
  allowSignup?: boolean
}

export function loginURL ({
  clientId,
  redirectURL,
  scope = 'user:email',
  login,
  state,
  allowSignup
}: LoginURLProps): URL {
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('scope', scope)
  url.searchParams.set('client_id', clientId)

  if (redirectURL !== undefined) {
    url.searchParams.set('redirect_url', redirectURL)
  }

  if (login !== undefined) {
    url.searchParams.set('login', login)
  }

  if (state !== undefined) {
    url.searchParams.set('state', state)
  }

  if (allowSignup !== undefined) {
    url.searchParams.set('allowSignup', allowSignup.toString())
  }

  return url
}
