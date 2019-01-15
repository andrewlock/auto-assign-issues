// You can import your modules
// import index from '../src/index'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import { payload } from "./fixtures/issues.opened";

nock.disableNetConnect()

describe('My Probot app', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({ id: 123, cert: 'test' })
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app = () => 'test'
  })

  test('assigns owner when an issue is opened and no config', async (done) => {
    const ownerAssignedBody = { 'assignees': ['hiimbex'] }

    // Test that we correctly return a test token
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    // Test that we correctly return the config when requested
    nock('https://api.github.com')
      .get('/repos/hiimbex/testing-things/contents/.github/auto-assign-issues.yml')
      .reply(404)

    // Test that a user is assigned
    nock('https://api.github.com')
      .post('/repos/hiimbex/testing-things/issues/1/assignees', (body: any) => {
        done(expect(body).toMatchObject(ownerAssignedBody))
        return true
      })
      .reply(200)

    // Receive a webhook event
    await probot.receive({ name: 'issues', payload })
  })
})
