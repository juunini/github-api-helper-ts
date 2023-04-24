import { createBlob } from './blob'
import { createCommit } from './commit'
import { createTree } from './tree'
import { type UpdateReferenceResponse, getReference, updateReference } from './reference'

interface CommitProps {
  accessToken: string
  owner: string
  repo: string
  committer: {
    name: string
    email: string
  }
  files: Array<{ path: string, data: string }>
  message: string
}

export async function commit ({
  accessToken, owner, repo, committer, files, message
}: CommitProps): Promise<UpdateReferenceResponse> {
  const reference = await getReference({ owner, repo, accessToken })
  const gitFiles = await Promise.all(
    files.map(
      async ({ path, data }) => await createBlob({ owner, repo, accessToken, data }).then(({ sha }) => ({ sha, path }))
    )
  )
  const tree = await createTree({ owner, repo, accessToken, parentSha: reference.object.sha, files: gitFiles })
  const commit = await createCommit({ owner, repo, accessToken, parentSha: reference.object.sha, treeSha: tree.sha, committer, message })
  return await updateReference({ owner, repo, accessToken, commitSha: commit.sha })
}
