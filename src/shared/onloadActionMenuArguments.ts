/**
 * Properties reflect those available in the `onLoad` context of an action menu.
 */
export interface OnloadActionMenuArguments {
    workItemId: number,
    workItemTypeName: string,
    currentProjectGuid: string,
    currentProjectName: string,
    hideDelete: boolean,
    workItemAvailable: boolean
}