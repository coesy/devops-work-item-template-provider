import { AzureHttpClient } from "./azureHttpClient";
import { TemplateModel } from "./templateModel";

/**
 * A processor used to load children from a given template.
 */
export class TemplateLoadingProcessor {
    /**
     * Creates a new instance of TemplateLoadingProcessor.
     * @param azureHttpClient - Azure client used to interact with Azure APIs.
     * @param originalTaskNumber - Task number for the currently selected work item.
     */
    constructor(
        private azureHttpClient: AzureHttpClient,
        private originalTaskNumber: string) {

        }

    /**
     * Insert new/existing links to new/existing items as per given template, associated to the currently selected work item.
     * @param templateModel - Template to insert.
     */
    public async LoadChildren(templateModel: TemplateModel) : Promise<any> {
        var asyncTasks = templateModel.Children.filter(async task => {
            var workItemNumber = task.WorkItemNumber;
            if (!task.IsExisting) {
                workItemNumber = await this.azureHttpClient.CreateTask(this.originalTaskNumber, task);
            }
            return 1;
        });

        return await Promise.all(asyncTasks);
    }
}