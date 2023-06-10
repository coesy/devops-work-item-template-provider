import "./workItemForm.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { IWorkItemLoadedArgs } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingServices';
import { AzureHttpClient } from '../../shared/azureHttpClient';
import { TemplateLoadingProcessor } from '../../shared/templateLoadingProcessor';
import { TemplateProvider } from '../../shared/templateprovider';
import { CommonServiceIds, getClient, IExtensionDataService, IProjectPageService } from 'azure-devops-extension-api/index';
import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
import React from "react";
import * as ReactDOM from 'react-dom';
import { WorkItemFormContent } from "./workItemFormContent";

/**
 * Azure UI provider, used to load a react element into an Azure container. 
 */
var embdeddedInWorkItemFormProvider = () => {
    return {
        onLoaded: async (workItemLoadedArgs: IWorkItemLoadedArgs) => {
            var projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
            var project = await projectService.getProject();
            var host = await SDK.getHost();
            var client = getClient(WorkItemTrackingRestClient)

            var httpClient = new AzureHttpClient(
                host.id,
                project!.id,
                client
            );

            var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
            var dataManager = await dataService.getExtensionDataManager(
                'CodeBoost.devops-work-item-template-provider',
                await SDK.getAccessToken()
            );
    
            var templateProvider = new TemplateProvider(dataManager);

            var templateLoadingProcessor = new TemplateLoadingProcessor(
                httpClient,
                templateProvider,
                workItemLoadedArgs.id);

            var templates = await templateProvider.GetTemplates();
            var nestedFormContent = <WorkItemFormContent 
                templates={templates} 
                templateLoadingProcessor={templateLoadingProcessor} />;

            ReactDOM.render(
                nestedFormContent, 
                document.getElementById("root"));

            await SDK.notifyLoadSucceeded();
            SDK.resize(140, 260);
        }
    }
};

/**
 * Registers this component and handler with the devops SDK.
 */
SDK.register('CodeBoost.devops-work-item-template-provider.embdeddedInWorkItemForm', embdeddedInWorkItemFormProvider);
/**
 * SDK init entrypoint.
 */
SDK.init();