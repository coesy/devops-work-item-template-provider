import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
import { TemplatePartModel } from './templatePartModel';
import { WorkItem } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';
import { AzureHttpClientFields } from './azureHttpClientFields';

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
        private workItemClient: WorkItemTrackingRestClient) {

    }

    /**
     * Issues a create task request to Azure.
     * @param existingTaskId - ID of the existing work item to which this task is linked, as a parent-child link.
     * @param templatePartModel - Template of the task to add.
     * @returns ID of the newly created task.
     */
    public async CreateTask(existingTaskId: number, templatePartModel: TemplatePartModel): Promise<string> {
        // POST https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/${type}?api-version=7.0
        // https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-items/create?view=azure-devops-rest-7.0&tabs=HTTP
        
        var parent = await this.GetTask(existingTaskId);

        if (parent === undefined)
            throw new Error('Undefined parent, unable to create a task');
        
        var workItemContent = [
            {
              'op': 'add',
              'path': `/fields/${AzureHttpClientFields.Title}`,
              'value': templatePartModel.title
            },
            {
                'op': 'add',
                'path': `/fields/${AzureHttpClientFields.AreaPath}`,
                'value': parent.fields[AzureHttpClientFields.AreaPath]
            },
            {
                'op': 'add',
                'path': `/fields/${AzureHttpClientFields.IterationPath}`,
                'value': parent.fields[AzureHttpClientFields.IterationPath]
            },
            {
                'op': 'add',
                'path': `/fields/${AzureHttpClientFields.Description}`,
                'value': templatePartModel.description
            },
            {
                'op': 'add',
                'path': '/relations/-',
                'value': {
                    'rel': 'System.LinkTypes.Hierarchy-Reverse',
                    'url': parent.url
                }
            }
        ];

        var attributeMap = templatePartModel.attributes.map(x => {
            return {
                'op': 'add',
                'path': `/fields/${x.key}`,
                'value': x.value
            };
        });

        attributeMap.forEach(x => workItemContent.push(x));

        var newWorkItem = await this.workItemClient.createWorkItem(workItemContent, this.project, 'Task', false, false, false);

        return newWorkItem.id.toString();
    }

    

    /**
     * Returns a task associated with the given `workItemId`.
     * @param workItemId - ID to use when looking up a work item.
     */
    public async GetTask(workItemId: number): Promise<WorkItem|undefined> {

        try
        {
            return await this.workItemClient.getWorkItem(
                workItemId,
                this.project,
                [AzureHttpClientFields.AreaPath, AzureHttpClientFields.IterationPath, AzureHttpClientFields.Title, AzureHttpClientFields.Effort, AzureHttpClientFields.Description]
            );
        }
        catch (error)
        {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Creates a related to link between two work items.
     * @param existingTaskId - First of the items to link.
     * @param targetLinkTaskId - Second of the items to link.
     */
    public async LinkExistingTask(existingTaskId: number, targetLinkTaskId: number) {
        var target = await this.workItemClient.getWorkItem(
            targetLinkTaskId, 
            this.project,
            ['System.AreaPath', 'System.IterationPath']);

        await this.workItemClient.updateWorkItem([
            {
                'op': 'add',
                'path': '/relations/-',
                'value': {
                    'rel': 'System.LinkTypes.Related',
                    'url': target.url
                }
            }
        ], existingTaskId, this.project, false, false, false);
    }
}