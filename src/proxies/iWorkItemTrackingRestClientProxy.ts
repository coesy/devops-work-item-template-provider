import * as WebApi from 'azure-devops-extension-api/WebApi/WebApi';
import * as WorkItemTracking from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';

/**
 * An interface which represents the used methods in the WorkItemTrackingRestClient class.
 */
export interface IWorkItemTrackingRestClientProxy {
    /**
     * A proxy for the WorkItemTrackingRestClient.createWorkItem method.
     */
    createWorkItem(
        document: WebApi.JsonPatchDocument, 
        project: string, 
        type: string, 
        validateOnly?: boolean, 
        bypassRules?: boolean, 
        suppressNotifications?: boolean, 
        expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
    
    /**
     * A proxy for the WorkItemTrackingRestClient.getWorkItem method.
     */
    getWorkItem(
        id: number, 
        project?: string, 
        fields?: string[], 
        asOf?: Date, 
        expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;

    /**
     * A proxy for the WorkItemTrackingRestClient.updateWorkItem method.
     */
    updateWorkItem(
        document: WebApi.JsonPatchDocument, 
        id: number, 
        project?: string, 
        validateOnly?: boolean, 
        bypassRules?: boolean, 
        suppressNotifications?: boolean, 
        expand?: WorkItemTracking.WorkItemExpand): Promise<WorkItemTracking.WorkItem>;
}