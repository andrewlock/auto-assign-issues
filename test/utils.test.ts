import { chooseAssignees } from '../src/utils'

describe('chooseAssignees', () => {
  test('when no assignees then returns the owner ', () => {
    const owner = 'owner'
    const assignees: string[] = []
    const numberOfAssignees = 0

    const list = chooseAssignees(owner, assignees, numberOfAssignees)

    expect(list).toEqual(['owner'])
  })

  test('when has assignees then returns them all', () => {
    const owner = 'owner'
    const assignees = ['assignee1', 'assignee2']
    const numberOfAssignees = 0

    const list = chooseAssignees(owner, assignees, numberOfAssignees)

    expect(list).toEqual(['assignee1', 'assignee2'])
  })

  test('when has assignees then returns required number in order', () => {
    const owner = 'owner'
    const assignees = ['assignee1', 'assignee2', 'assignee3']
    const numberOfAssignees = 2

    const list = chooseAssignees(owner, assignees, numberOfAssignees)

    expect(list).toEqual(['assignee1', 'assignee2'])
  })

  test('when has duplicates then returns required number excluding duplicates', () => {
    const owner = 'owner'
    const assignees = ['assignee1', 'assignee1', 'assignee3']
    const numberOfAssignees = 2

    const list = chooseAssignees(owner, assignees, numberOfAssignees)

    expect(list).toEqual(['assignee1', 'assignee3'])
  })
})
