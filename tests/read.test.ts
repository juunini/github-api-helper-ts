import { read } from '@/read'

describe('read', () => {
  const request = {
    owner: 'juunini',
    repo: 'test',
    accessToken: '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'
  }

  context('when the path is a file', () => {
    const response = {
      name: 'test.txt',
      path: 'test.txt',
      sha: '32f64f4d836716819dc5fa9a1e09a29b428881df',
      size: 1,
      url: 'https://api.github.com/repos/juunini/test/contents/test.txt?ref=main',
      html_url: 'https://github.com/juunini/test/blob/main/test.txt',
      git_url: 'https://api.github.com/repos/juunini/test/git/blobs/32f64f4d836716819dc5fa9a1e09a29b428881df',
      download_url: 'https://raw.githubusercontent.com/juunini/test/main/test.txt',
      type: 'file',
      content: 'dA==\n',
      encoding: 'base64',
      _links: {
        self: 'https://api.github.com/repos/juunini/test/contents/test.txt?ref=main',
        git: 'https://api.github.com/repos/juunini/test/git/blobs/32f64f4d836716819dc5fa9a1e09a29b428881df',
        html: 'https://github.com/juunini/test/blob/main/test.txt'
      }
    }

    it('returns the Object', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const data = await read({
        ...request,
        path: 'test'
      })

      expect(data instanceof Array).toBeFalsy()
      expect(data).toHaveProperty('content')
      expect(data).toHaveProperty('encoding')
    })
  })

  context('when the path is a directory', () => {
    const response = [
      {
        name: 'argo-easier',
        path: 'test/argo-easier',
        sha: '2c36e2341fac8eafe3330acbb79902e009a5682f',
        size: 403,
        url: 'https://api.github.com/repos/juunini/test/contents/test/argo-easier?ref=main',
        html_url: 'https://github.com/juunini/test/blob/main/test/argo-easier',
        git_url: 'https://api.github.com/repos/juunini/test/git/blobs/2c36e2341fac8eafe3330acbb79902e009a5682f',
        download_url: 'https://raw.githubusercontent.com/juunini/test/main/test/argo-easier',
        type: 'file',
        _links: {
          self: 'https://api.github.com/repos/juunini/test/contents/test/argo-easier?ref=main',
          git: 'https://api.github.com/repos/juunini/test/git/blobs/2c36e2341fac8eafe3330acbb79902e009a5682f',
          html: 'https://github.com/juunini/test/blob/main/test/argo-easier'
        }
      },
      {
        name: 'test.txt',
        path: 'test/test.txt',
        sha: '8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        size: 13,
        url: 'https://api.github.com/repos/juunini/test/contents/test/test.txt?ref=main',
        html_url: 'https://github.com/juunini/test/blob/main/test/test.txt',
        git_url: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        download_url: 'https://raw.githubusercontent.com/juunini/test/main/test/test.txt',
        type: 'file',
        _links: {
          self: 'https://api.github.com/repos/juunini/test/contents/test/test.txt?ref=main',
          git: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
          html: 'https://github.com/juunini/test/blob/main/test/test.txt'
        }
      },
      {
        name: 'test2.txt',
        path: 'test/test2.txt',
        sha: '8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        size: 13,
        url: 'https://api.github.com/repos/juunini/test/contents/test/test2.txt?ref=main',
        html_url: 'https://github.com/juunini/test/blob/main/test/test2.txt',
        git_url: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        download_url: 'https://raw.githubusercontent.com/juunini/test/main/test/test2.txt',
        type: 'file',
        _links: {
          self: 'https://api.github.com/repos/juunini/test/contents/test/test2.txt?ref=main',
          git: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
          html: 'https://github.com/juunini/test/blob/main/test/test2.txt'
        }
      },
      {
        name: 'test33.txt',
        path: 'test/test33.txt',
        sha: '8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        size: 13,
        url: 'https://api.github.com/repos/juunini/test/contents/test/test33.txt?ref=main',
        html_url: 'https://github.com/juunini/test/blob/main/test/test33.txt',
        git_url: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
        download_url: 'https://raw.githubusercontent.com/juunini/test/main/test/test33.txt',
        type: 'file',
        _links: {
          self: 'https://api.github.com/repos/juunini/test/contents/test/test33.txt?ref=main',
          git: 'https://api.github.com/repos/juunini/test/git/blobs/8d0abcffd0bb53a9dfae62bbd94e992acddc8bbe',
          html: 'https://github.com/juunini/test/blob/main/test/test33.txt'
        }
      }
    ]

    it('returns the Array', async () => {
      // @ts-expect-error
      globalThis.fetch = async () => await Promise.resolve({
        json: async () => await Promise.resolve(response)
      })

      const data = await read({
        ...request,
        path: 'test'
      })

      expect(data instanceof Array).toBeTruthy()
    })
  })

  context('when branch is provided', () => {
    const path = 'test'
    const branch = 'test'

    it('should request with "ref" query param', async () => {
      // @ts-expect-error
      globalThis.fetch = async (options) => await Promise.resolve({
        json: async () => await Promise.resolve({})
      })

      const fetchSpy = jest.spyOn(globalThis, 'fetch')
      await read({
        ...request,
        path,
        branch
      })

      expect(fetchSpy).toBeCalledWith(
        `https://api.github.com/repos/${request.owner}/${request.repo}/contents/${path}?ref=${branch}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${request.accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          },
          method: 'GET'
        }
      )
    })
  })
})
