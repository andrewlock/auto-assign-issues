export function chooseAssignees (owner: string, available: string[], desiredNumber: number): string[] {
  // if no config, then assume we're assigning the owner
  if (available.length === 0) {
    return [owner]
  }

  // assign everyone
  if (desiredNumber === 0) {
    return available
  }

  // get the unique set of names
  const withoutDuplicates = available.reduce<string[]>((values, current) => {
    if (values.indexOf(current)) {
      values.push(current)
    }
    return values
  }, [])

  return withoutDuplicates.slice(0, desiredNumber)
}
