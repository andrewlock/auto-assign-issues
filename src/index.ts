import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { autoAssignIssue } from './auto-assign-issue'

export = (app: Application) => {
  app.on('issues.opened', autoAssignIssue)
}
