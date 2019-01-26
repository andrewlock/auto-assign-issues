export interface AppConfig {
  /** If enabled, auto-assigns users when a new issue is created */
  addAssignees: boolean;

  /** If enabled, the list of users to assign to new issues. If empty, the
   * repository owner is assigned
   */
  assignees?: string[];
}
