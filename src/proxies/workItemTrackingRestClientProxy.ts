import * as WebApi from 'azure-devops-extension-api/WebApi/WebApi';
import * as WorkItemTracking from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';
import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
import { IWorkItemTrackingRestClientProxy } from '.';

export class WorkItemTrackingRestClientProxy implements IWorkItemTrackingRestClientProxy {
    client: WorkItemTrackingRestClient;

    constructor(client: WorkItemTrackingRestClient) {
        this.client = client;
        this.createWorkItem = this.createWorkItem.bind(this);
    }

    createWorkItem(document: WebApi.JsonPatchDocument, project: string, type: string, validateOnly?: boolean | undefined, bypassRules?: boolean | undefined, suppressNotifications?: boolean | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
        return this.client.createWorkItem(document, project, type, validateOnly, bypassRules, suppressNotifications, expand);
    }

    getWorkItem(id: number, project?: string | undefined, fields?: string[] | undefined, asOf?: Date | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
        return this.client.getWorkItem(id, project, fields, asOf, expand);
    }

    updateWorkItem(document: WebApi.JsonPatchDocument, id: number, project?: string | undefined, validateOnly?: boolean | undefined, bypassRules?: boolean | undefined, suppressNotifications?: boolean | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
        return this.client.updateWorkItem(document, id, project, validateOnly, bypassRules, suppressNotifications);
    }
}