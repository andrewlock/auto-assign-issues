import { chooseAssignees } from '../src/utils'

describe('chooseAssignees', () => {
  test('when no assignees then returns the owner ', () => {
    const owner = 'owner'
    const assignees: string[] = []

    const list = chooseAssignees(owner, assignees)

    expect(list).toEqual(['owner'])
  })

  test('when has assignees then returns them all', () => {
    const owner = 'owner'
    const assignees = ['assignee1', 'assignee2']

    const list = chooseAssignees(owner, assignees)

    expect(list).toEqual(['assignee1', 'assignee2'])
  })

  test('when has duplicates then returns excluding duplicates', () => {
    const owner = 'owner'
    const assignees = ['assignee1', 'assignee1', 'assignee3']

    const list = chooseAssignees(owner, assignees)

    expect(list).toEqual(['assignee1', 'assignee3'])
  })
})
