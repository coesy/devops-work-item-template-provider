/// <reference types="vss-web-extension-sdk" />
import * as ExtensionContracts from 'TFS/WorkItemTracking/ExtensionContracts';
import { WorkItemTrackingHttpClient } from 'TFS/WorkItemTracking/RestClient';

var provider = () => {
    return {
        onLoaded: (workItemLoadedArgs: ExtensionContracts.IWorkItemLoadedArgs) => {
            VSS.require(["scripts/app", "VSS/Service", "TFS/WorkItemTracking/RestClient"], function (app, vssService, restClient) {
                var witClient = vssService.getCollectionClient(restClient.WorkItemTrackingHttpClient);
                var webContext = VSS.getWebContext();

                var httpClient = new AzureHttpClient(
                    webContext.account.id, // Organisation 'danieljeffries'
                    webContext.project.id, // Project 'Azure Web Extensions'
                    witClient
                );
        
                var main = new Main(
                    new StaticTemplateProvider(),
                    httpClient,
                    workItemLoadedArgs.id.toString());
                main.LoadSelect('sel');
                main.AssignButton('btn');
            });
        }
    }
};

VSS.register('index', provider);

class AzureHttpClient {
    constructor (
        private organisation: string,
        private project: string,
        private workItemClient: WorkItemTrackingHttpClient) {

    }

    public async CreateTask(existingTaskId: string, templatePartModel: TemplatePartModel): Promise<string> {
        // POST https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/${type}?api-version=7.0
        // https://learn.microsoft.com/en-us/rest/api/azure/devops/wit/work-items/create?view=azure-devops-rest-7.0&tabs=HTTP
        
        var parent = await this.workItemClient.getWorkItem(
            Number.parseInt(existingTaskId), 
            ["System.AreaPath", "System.IterationPath"]).then(workItem => {
            return workItem;
        });
        var keyData: string = '';

        await this.workItemClient.createWorkItem([
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
          ], this.project, 'Task', false, false, false).then(workItem => {
            debugger;
            keyData = workItem.id.toString();
        }, rejected => {
            debugger;
        });

        return keyData;
    }
}

class Main {
    private templates: TemplateModel[];
    private select: any;

    public constructor(
        private optionsProvider: IOptionsProvider,
        private azureHttpClient: AzureHttpClient,
        private originalTaskNumber: string) {

    }

    public LoadSelect(className: string) : void {
        this.EnsureOptionsAreLoaded();

        var jqueryElement = $(`.${className}`);
        this.select = jqueryElement[0];
        this.templates.forEach(template => {
            jqueryElement.append($('<option>', { 
                value: template.TemplateName,
                text : template.TemplateName
            }));
        });
    }

    public AssignButton(className: string) : void {
        var thisRef = this;
        $(`.${className}`).off('click');
        $(`.${className}`).on('click', () => {
            var targetTemplate = thisRef.templates[thisRef.select.selectedIndex];
            this.LoadChildren(thisRef, targetTemplate);
        });
    }

    private async LoadChildren(thisRef:Main, templateModel: TemplateModel) : Promise<number> {
        var asyncTasks = templateModel.Children.filter(async task => {
            var workItemNumber = task.WorkItemNumber;
            if (!task.IsExisting) {
                workItemNumber = await thisRef.azureHttpClient.CreateTask(thisRef.originalTaskNumber, task);
            }
            return 1;
        });

        await Promise.all(asyncTasks);
        return 1;
    }

    private EnsureOptionsAreLoaded() {
        if (this.templates !== undefined) return;

        this.templates = this.optionsProvider.GetTemplates();
    }
}

interface IOptionsProvider {
    GetTemplates() : TemplateModel[];
}

class TemplateModel {
    public TemplateName: string;
    public Children: TemplatePartModel[];
}

class TemplatePartModel {
    public IsExisting: boolean;
    public WorkItemNumber: string;
    public Title: string;
    public Attributes: TemplatePartCustomAttributeModel[];
}

class TemplatePartCustomAttributeModel {
    public Key: string;
    public Value: string;
}

class StaticTemplateProvider implements IOptionsProvider {
    GetTemplates(): TemplateModel[] {
        return [
            {
                TemplateName: 'Example Template',
                Children: [
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Development',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Test',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Sign Off',
                        Attributes: []
                    },
                    {
                        IsExisting: true,
                        WorkItemNumber: '1',
                        Title: 'First Work Item',
                        Attributes: []
                    }
                ]
            }
        ]
    }
}