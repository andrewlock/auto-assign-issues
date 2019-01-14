import { Context } from 'probot' // eslint-disable-line no-unused-vars
import { AppConfig } from './app-config'
import { chooseAssignees } from './utils'

const ConfigFilename = 'auto-assign-issues.yml'

export async function autoAssignIssue (context: Context): Promise<void> {
  const config: AppConfig = await context.config<AppConfig | null>(ConfigFilename, { addAssignees: true })

  if (!config) {
    throw new Error(`${ConfigFilename} configuration file not found`)
  }

  // create an empty params object as an easy way to get the owner
  const tempParams = context.issue({ assignees: [] })
  const owner = tempParams.owner

  const assignees = chooseAssignees(owner, config.assignees || [], config.numberOfAssigneesToAdd || 0)

  try {
    const addAssigneeParams = context.issue({ assignees: assignees })
    const result = await context.github.issues.addAssignees(addAssigneeParams)
    context.log(result)
  } catch (error) {
    context.log(error)
  }
}
