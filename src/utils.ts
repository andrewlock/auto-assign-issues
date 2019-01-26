export function chooseAssignees (owner: string, available: string[]): string[] {
  // if no config, then assume we're assigning the owner
  if (available.length === 0) {
    return [owner]
  }

  // get the unique set of names
  return available.reduce<string[]>((values, current) => {
    if (values.indexOf(current)) {
      values.push(current)
    }
    return values
  }, [])
}
