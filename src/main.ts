import * as core from '@actions/core'
// import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const repo: string = core.getInput('repo')
    core.debug(`Target repository for cache cleaning is: "${repo}"`)
    const keys: string[] = core.getMultilineInput('keys')
    core.debug(`Only the following keys will get cleaned: "${keys.join(',')}"`)
    const limit: number = parseInt(core.getInput('limit'), 10)
    core.debug(`Cache cleaning limit is at "${limit}"`)
    const gh_token = process.env['GITHUB_TOKEN'] || core.getInput('token')
    core.setSecret(gh_token)
    // const octokit = github.getOctokit(gh_token)
    core.debug('Initialization finished')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
