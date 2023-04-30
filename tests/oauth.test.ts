import { OAuth, loginURL } from '@/oauth'

const clientId = 'Iv1.acb6779efbecc9fa'
const clientSecret = '40a6faf87f362fb0d454fb5419f0ad7ac877a0ed'
const oauth = new OAuth(clientId, clientSecret)

describe('loginURL', () => {
  context('when just given a clientId', () => {
    const expectScope = 'user:email'

    it(`returns a URL with "${expectScope}" scope`, () => {
      const url = loginURL({ clientId })

      expect(url.searchParams.get('scope')).toBe(expectScope)
      expect(url.toString()).toBe(`https://github.com/login/oauth/authorize?scope=${encodeURIComponent(expectScope)}&client_id=${clientId}`)
    })
  })

  context('when given a scope', () => {
    const scope = 'repo'

    it('returns a URL with the given scope', () => {
      const url = loginURL({ clientId, scope })

      expect(url.searchParams.get('scope')).toBe(scope)
    })
  })

  context('when given a redirectURL', () => {
    const redirectURL = 'https://example.com'

    it('returns a URL with the given redirectURL', () => {
      const url = loginURL({ clientId, redirectURL })

      expect(url.searchParams.get('redirect_url')).toBe(redirectURL)
    })
  })

  context('when given a login', () => {
    const login = 'octocat'

    it('returns a URL with the given login', () => {
      const url = loginURL({ clientId, login })

      expect(url.searchParams.get('login')).toBe(login)
    })
  })

  context('when given a state', () => {
    const state = 'state'

    it('returns a URL with the given state', () => {
      const url = loginURL({ clientId, state })

      expect(url.searchParams.get('state')).toBe(state)
    })
  })

  context('when given a allowSignup', () => {
    const allowSignup = true

    it('returns a URL with the given allowSignup', () => {
      const url = loginURL({ clientId, allowSignup })

      expect(url.searchParams.get('allowSignup')).toBe(allowSignup.toString())
    })
  })
})

describe('OAuth.accessToken', () => {
  context('when the response is successful', () => {
    const code = 'bd1ba45f9f9eba1077b4'
    const response = {
      access_token: 'ghu_k7X36Ju0jFfFu8kFiC9vJlAQedZ18T36BFFj',
      expires_in: 28800,
      refresh_token: 'ghr_3YuwtFDCQfZ2COXOuLHkp37FSyMVJESjixSipQxiKt4IsuS5pNc1hgoUfrd0PceinnLu2935KKcL',
      refresh_token_expires_in: 15811200,
      token_type: 'bearer',
      scope: ''
    }

    it('returns the access token', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const token = await oauth.accessToken(code)
      expect(token.access_token).toEqual(response.access_token)
    })
  })

  context('when the response is an error', () => {
    const code = 'invalid_code'
    const response = {
      error: 'bad_verification_code',
      error_description: 'The code passed is incorrect or expired.',
      error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
    }

    it('throws an error', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      try {
        await oauth.accessToken(code)
      } catch (e: any) {
        expect(e.response).toEqual(response)
        return
      }

      throw new Error('failed')
    })
  })
})

describe('OAuth.refreshToken', () => {
  context('when the response is successful', () => {
    const refreshToken = 'ghr_bvBBo9XFZzV6EfSZ47tMyRda6xgibauB4E9RqNYwnVxeB9lueOZtxg6xG1eAK6W807kimF0XFYI2'
    const response = {
      access_token: 'ghu_k7X36Ju0jFfFu8kFiC9vJlAQedZ18T36BFFj',
      expires_in: 28800,
      refresh_token: 'ghr_3YuwtFDCQfZ2COXOuLHkp37FSyMVJESjixSipQxiKt4IsuS5pNc1hgoUfrd0PceinnLu2935KKcL',
      refresh_token_expires_in: 15811200,
      token_type: 'bearer',
      scope: ''
    }

    it('returns the access token', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const token = await oauth.refreshToken(refreshToken)
      expect(token.access_token).toEqual(response.access_token)
    })
  })

  context('when the response is an error', () => {
    const refreshToken = 'invalid_token'
    const response = {
      error: 'bad_refresh_token',
      error_description: 'The refresh token passed is incorrect or expired.',
      error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
    }

    it('throws an error', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      try {
        await oauth.refreshToken(refreshToken)
      } catch (e: any) {
        expect(e.response).toEqual(response)
        return
      }

      throw new Error('failed')
    })
  })
})
