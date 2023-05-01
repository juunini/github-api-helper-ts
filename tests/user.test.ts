import { user } from '@/user'

describe('user', () => {
  afterEach(() => {
    // @ts-expect-error
    global.fetch = undefined
  })

  context('with a valid access token', () => {
    const response = {
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
    const status = 200

    beforeEach(() => {
      // @ts-expect-error
      global.fetch = jest.fn().mockImplementation(async () => {
        return await Promise.resolve({
          status,
          json: async () => await Promise.resolve(response)
        })
      })
    })

    it('returns the user data', async () => {
      const data = await user('valid-token')
      expect(data).toEqual(response)
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
        await user('invalid-token')
      } catch (error) {
        expect((error as Error).message).toBe(`${status}: ${response.message}`)
        return
      }

      throw new Error('failed')
    })
  })
})
