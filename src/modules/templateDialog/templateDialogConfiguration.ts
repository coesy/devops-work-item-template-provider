import { IWorkItemLoadedArgs } from "azure-devops-extension-api/WorkItemTracking/WorkItemTrackingServices";

/** 
 * Configuration for 'Template Dialog'.
 */
export class TemplateDialogConfiguration {
    workItemLoadedArgs: IWorkItemLoadedArgs;

    constructor(workItemLoadedArgs: IWorkItemLoadedArgs) {
        this.workItemLoadedArgs = workItemLoadedArgs;
    }
}