import { AzureHttpClient } from './azureHttpClient';
import { AzureHttpClientFields } from './azureHttpClientFields';
import { TemplateModel } from './templateModel';
import { TemplatePartModel } from './templatePartModel';
import { TemplatePartModelExistingType } from './templatePartModelExistingType';
import { TemplateProvider } from './templateprovider';

/**
 * A processor used to load children from a given template.
 */
export class TemplateLoadingProcessor {
    /**
     * Creates a new instance of TemplateLoadingProcessor.
     * @param azureHttpClient - Azure client used to interact with Azure APIs.
     * @param templateProvider - The Provider for CRUD activities on Templates.
     * @param originalTaskNumber - Task number for the currently selected work item.
     */
    constructor(
        private azureHttpClient: AzureHttpClient,
        private templateProvider: TemplateProvider,
        private originalTaskNumber: number) {

        }

    /**
     * Insert new/existing links to new/existing items as per given template, associated to the currently selected work item.
     * @param templateModel - Template to insert.
     */
    public async LoadChildren(templateModel: TemplateModel) : Promise<TemplatePartModel[]> {
        var asyncTasks = templateModel.children.filter(async task => {
            if (!task.isExisting) {
                await this.azureHttpClient.CreateTask(this.originalTaskNumber, task);
                return 1;
            }

            if (task.copyType === TemplatePartModelExistingType.Copy) {
                var existingModel = await this.azureHttpClient.GetTask(task.workItemNumber);
                if (existingModel === undefined)
                    return 1;

                await this.azureHttpClient.CreateTask(this.originalTaskNumber, {
                    id: '',
                    isExisting: false,
                    workItemNumber: -1,
                    title: existingModel.fields[AzureHttpClientFields.Title],
                    description: existingModel.fields[AzureHttpClientFields.Description],
                    copyType: TemplatePartModelExistingType.Copy,
                    attributes: []
                });
                return 1;
            }
            
            await this.azureHttpClient.LinkExistingTask(this.originalTaskNumber, task.workItemNumber);
            return 1;
        });

        return await Promise.all(asyncTasks);
    }
}