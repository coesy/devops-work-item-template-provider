import { AzureHttpClient } from "./azureHttpClient";
import { TemplateModel } from "./templateModel";
import { TemplatePartCustomAttributeModel } from "./templatePartCustomAttributeModel";
import { TemplatePartModel } from "./templatePartModel";
import { TemplateProvider } from "./templateprovider";

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
    public async LoadChildren(templateModel: TemplateModel) : Promise<any> {
        var asyncTasks = templateModel.Children.filter(async task => {
            if (!task.IsExisting) {
                await this.azureHttpClient.CreateTask(this.originalTaskNumber, task);
                return 1;
            }
            
            await this.azureHttpClient.LinkExistingTask(this.originalTaskNumber, task.WorkItemNumber);
            return 1;
        });

        return await Promise.all(asyncTasks);
    }

    public async InsertTestRecord()
    {
        var templateChildren: TemplatePartModel[] = [ 
            { Title: "Hello World", IsExisting: false, WorkItemNumber: 1, Attributes: null}
        ];
        await this.templateProvider.CreateDocument("Test Doc", templateChildren);
    }
}