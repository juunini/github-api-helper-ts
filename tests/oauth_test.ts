import { describe, expect, test } from 'bun:test'

import { OAuth } from '@/oauth'

const clientId = 'Iv1.acb6779efbecc9fa'
const clientSecret = '40a6faf87f362fb0d454fb5419f0ad7ac877a0ed'
const oauth = new OAuth(clientId, clientSecret)

describe('OAuth.accessToken', () => {
  describe('when the response is successful', () => {
    const code = 'bd1ba45f9f9eba1077b4'
    const response = {
      access_token: 'ghu_k7X36Ju0jFfFu8kFiC9vJlAQedZ18T36BFFj',
      expires_in: 28800,
      refresh_token: 'ghr_3YuwtFDCQfZ2COXOuLHkp37FSyMVJESjixSipQxiKt4IsuS5pNc1hgoUfrd0PceinnLu2935KKcL',
      refresh_token_expires_in: 15811200,
      token_type: 'bearer',
      scope: ''
    }

    test('returns the access token', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const token = await oauth.accessToken(code)
      expect(token.access_token).toEqual(response.access_token)
    })
  })

  describe('when the response is an error', () => {
    const code = 'invalid_code'
    const response = {
      error: 'bad_verification_code',
      error_description: 'The code passed is incorrect or expired.',
      error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
    }

    test('throws an error', async () => {
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
  describe('when the response is successful', () => {
    const refreshToken = 'ghr_bvBBo9XFZzV6EfSZ47tMyRda6xgibauB4E9RqNYwnVxeB9lueOZtxg6xG1eAK6W807kimF0XFYI2'
    const response = {
      access_token: 'ghu_k7X36Ju0jFfFu8kFiC9vJlAQedZ18T36BFFj',
      expires_in: 28800,
      refresh_token: 'ghr_3YuwtFDCQfZ2COXOuLHkp37FSyMVJESjixSipQxiKt4IsuS5pNc1hgoUfrd0PceinnLu2935KKcL',
      refresh_token_expires_in: 15811200,
      token_type: 'bearer',
      scope: ''
    }

    test('returns the access token', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const token = await oauth.refreshToken(refreshToken)
      expect(token.access_token).toEqual(response.access_token)
    })
  })

  describe('when the response is an error', () => {
    const refreshToken = 'invalid_token'
    const response = {
      error: 'bad_refresh_token',
      error_description: 'The refresh token passed is incorrect or expired.',
      error_uri: 'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code'
    }

    test('throws an error', async () => {
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
