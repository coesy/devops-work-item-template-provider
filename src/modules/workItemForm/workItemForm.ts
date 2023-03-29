import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';
import { IWorkItemLoadedArgs } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingServices';
import { AzureHttpClient } from '../../shared/azureHttpClient';
import { TemplateLoadingProcessor } from '../../shared/templateLoadingProcessor';
import { TemplateProvider } from '../../shared/templateprovider';
import { UIToTemplateLoadingProcessorBinder } from '../../shared/uiToTemplateLoadingProcessorBinder';
import { CommonServiceIds, getClient, IProjectPageService } from 'azure-devops-extension-api/index';
import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
import { StaticTemplateProvider } from "../../shared/staticTemplateProvider";

var embdeddedInWorkItemFormProvider = () => {
    return {
        onLoaded: async (workItemLoadedArgs: IWorkItemLoadedArgs) => {
            var projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            var project = await projectService.getProject();
            var host = await SDK.getHost();
            var client = getClient(WorkItemTrackingRestClient)

            var httpClient = new AzureHttpClient(
                host.id, // Organisation 'danieljeffries'
                project!.id, // Project 'Azure Web Extensions'
                client
            );
    
            var templateLoadingProcessor = new TemplateLoadingProcessor(
                httpClient,
                new TemplateProvider,
                workItemLoadedArgs.id);

            var uiBinder = new UIToTemplateLoadingProcessorBinder(
                new TemplateProvider(),
                //new StaticTemplateProvider(),
                templateLoadingProcessor
                );

            await uiBinder.LoadSelect('sel');
            uiBinder.AssignButton('btn');
            uiBinder.AssignTestButton('btnAdd');
            await SDK.notifyLoadSucceeded();
        }
    }
};

SDK.register('CodeBoost.devops-work-item-template-provider.embdeddedInWorkItemForm', embdeddedInWorkItemFormProvider);
SDK.init();