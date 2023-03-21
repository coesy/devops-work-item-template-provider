import { WorkItemTrackingHttpClient } from "TFS/WorkItemTracking/RestClient";
import { TemplatePartModel } from "./templatePartModel";

/**
 * A client to be used when communicating with Azure REST APIs.
 */
export class AzureHttpClient {
    /**
     * Creates a new instance of AzureHttpClient.
     * 
     * @param organisation - Organisation ID used in some of the REST requests.
     * @param project - Project ID used in some of the REST requests.
     * @param workItemClient - Underlying work item client used to issue REST requests to Azure.
     */
    constructor (
        private organisation: string,
        private project: string,
        private workItemClient: WorkItemTrackingHttpClient) {

    }

    /**
     * Issues a create task request to Azure.
     * @param existingTaskId - ID of the existing work item to which this task is linked, as a parent-child link.
     * @param templatePartModel - Template of the task to add.
     * @returns ID of the newly created task.
     */
    public async CreateTask(existingTaskId: string, templatePartModel: TemplatePartModel): Promise<string> {
        // POST https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/${type}?api-version=7.0
        // https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-items/create?view=azure-devops-rest-7.0&tabs=HTTP
        
        var parent = await this.workItemClient.getWorkItem(
            Number.parseInt(existingTaskId), 
            ["System.AreaPath", "System.IterationPath"]);
        
        var newWorkItem = await this.workItemClient.createWorkItem([
            {
              "op": "add",
              "path": "/fields/System.Title",
              "value": templatePartModel.Title
            },
            {
                'op': 'add',
                'path': '/fields/System.AreaPath',
                'value': parent.fields["System.AreaPath"]
            },
            {
                'op': 'add',
                'path': '/fields/System.IterationPath',
                'value': parent.fields["System.IterationPath"]
            },
            {
                'op': 'add',
                'path': '/relations/-',
                'value': {
                    'rel': 'System.LinkTypes.Hierarchy-Reverse',
                    'url': parent.url
                }
            }
          ], this.project, 'Task', false, false, false);

        return newWorkItem.id.toString();
    }

    public async LinkExistingTask(existingTaskId: string, targetLinkTaskId: string) {
        var target = await this.workItemClient.getWorkItem(
            Number.parseInt(targetLinkTaskId), 
            ["System.AreaPath", "System.IterationPath"]);

        await this.workItemClient.updateWorkItem([
            {
                'op': 'add',
                'path': '/relations/-',
                'value': {
                    'rel': 'System.LinkTypes.Hierarchy-Reverse',
                    'url': target.url
                }
            }
        ], Number.parseInt(existingTaskId), this.project, false, false, false);
    }
}