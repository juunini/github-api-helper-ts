import { user } from '@/user'

const validResponse = {
  login: 'juunini',
  id: 41536271,
  node_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  avatar_url: 'https://avatars.githubusercontent.com/u/41536271?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/juunini',
  html_url: 'https://github.com/juunini',
  followers_url: 'https://api.github.com/users/juunini/followers',
  following_url: 'https://api.github.com/users/juunini/following{/other_user}',
  gists_url: 'https://api.github.com/users/juunini/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/juunini/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/juunini/subscriptions',
  organizations_url: 'https://api.github.com/users/juunini/orgs',
  repos_url: 'https://api.github.com/users/juunini/repos',
  events_url: 'https://api.github.com/users/juunini/events{/privacy}',
  received_events_url: 'https://api.github.com/users/juunini/received_events',
  type: 'User',
  site_admin: false,
  name: 'Juunini',
  company: '@cloudmatelabs',
  blog: 'https://velog.io/@juunini',
  location: 'Seongnam-si Gyeonggi-do, Republic of Korea',
  email: 'juuni.ni.i@gmail.com',
  hireable: true,
  bio: '지상 최강의 개발자 (The Powerfulest Developer on the Earth)',
  twitter_username: 'juunini1',
  public_repos: 103,
  public_gists: 15,
  followers: 163,
  following: 27,
  created_at: '2018-07-22T08:54:26Z',
  updated_at: '2023-04-25T12:52:41Z'
}

describe('user', () => {
  afterEach(() => {
    // @ts-expect-error
    global.fetch = undefined
  })

  context('with a valid access token', () => {
    const status = 200

    beforeEach(() => {
      // @ts-expect-error
      global.fetch = jest.fn().mockImplementation(async () => {
        return await Promise.resolve({
          status,
          json: async () => await Promise.resolve(validResponse)
        })
      })
    })

    it('returns the user data', async () => {
      const data = await user({ accessToken: 'valid-token' })
      expect(data).toEqual(validResponse)
    })
  })

  context('with an invalid access token', () => {
    const response = {
      message: 'Bad credentials',
      documentation_url: 'https://docs.github.com/rest'
    }
    const status = 401

    beforeEach(() => {
      // @ts-expect-error
      global.fetch = jest.fn().mockImplementation(async () => {
        return await Promise.resolve({
          status,
          json: async () => await Promise.resolve(response)
        })
      })
    })

    it('throws an error', async () => {
      try {
        await user({ accessToken: 'invalid-token' })
      } catch (error) {
        expect((error as Error).message).toBe(`${status}: ${response.message}`)
        return
      }

      throw new Error('failed')
    })
  })

  context('with a valid user id', () => {
    const status = 200

    beforeEach(() => {
      // @ts-expect-error
      global.fetch = jest.fn().mockImplementation(async () => {
        return await Promise.resolve({
          status,
          json: async () => await Promise.resolve(validResponse)
        })
      })
    })

    it('returns the user data', async () => {
      const data = await user({ id: validResponse.id })
      expect(data).toEqual(validResponse)
    })
  })

  context('when given invalid user id', () => {
    const response = {
      message: 'Not Found',
      documentation_url: 'https://docs.github.com/rest/reference/users#get-a-user'
    }
    const status = 404

    beforeEach(() => {
      // @ts-expect-error
      global.fetch = jest.fn().mockImplementation(async () => {
        return await Promise.resolve({
          status,
          json: async () => await Promise.resolve(response)
        })
      })
    })

    it('should throw 404 error', async () => {
      try {
        await user({ id: 0 })
      } catch (error) {
        expect((error as Error).message).toBe(`${status}: ${response.message}`)
        return
      }

      throw new Error('failed')
    })
  })

  context('without any arguments', () => {
    it('should throw an error', async () => {
      try {
        await user({})
      } catch (error) {
        expect((error as Error).message).toBe('accessToken or id is required')
        return
      }

      throw new Error('failed')
    })
  })
})
