/// <reference types="vss-web-extension-sdk" />
import * as ExtensionContracts from 'TFS/WorkItemTracking/ExtensionContracts';
import { AzureHttpClient } from './azureHttpClient';
import { CustomDialog } from './customDialog';
import { IOptionsProvider } from './iOptionsProvider';
import { TemplateLoadingProcessor } from './templateLoadingProcessor';
import { TemplateModel } from './templateModel';
import { TemplateProvider } from './templateprovider';
import { UIToTemplateLoadingProcessorBinder } from './uiToTemplateLoadingProcessorBinder';

// Create a handler which handles the embedded work item field.
var embdeddedInWorkItemFormProvider = () => {
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
        
                var templateLoadingProcessor = new TemplateLoadingProcessor(
                    httpClient,
                    new TemplateProvider,
                    workItemLoadedArgs.id);

                var uiBinder = new UIToTemplateLoadingProcessorBinder(
                    new TemplateProvider(),
                    templateLoadingProcessor
                    );
                uiBinder.LoadSelect('sel');
                uiBinder.AssignButton('btn');
                uiBinder.AssignTestButton('btnAdd');
            });
        }
    }
};

// Create a handler which handles the menu items.
var actionMenuProvider = () => {
    return {
        execute: function(actionContext) {
            debugger;
            new CustomDialog().ShowDialog("Hello World");
        }
    };
};

// Register the handlers. These refer, and must match, the contributor IDs in vss-extensoin.json.
VSS.register('embdeddedInWorkItemForm', embdeddedInWorkItemFormProvider);
VSS.register('actionMenu', actionMenuProvider);

// Static, temporary configuration to use in debugging/pre-configuration work.
class StaticTemplateProvider implements IOptionsProvider {
    async GetTemplates(): Promise<TemplateModel[]> {
        return [
            {
                TemplateName: 'Example Template',
                Children: [
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Development',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Test',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Sign Off',
                        Attributes: []
                    },
                    {
                        IsExisting: true,
                        WorkItemNumber: 1,
                        Title: 'First Work Item',
                        Attributes: []
                    }
                ]
            }
        ]
    }
}
