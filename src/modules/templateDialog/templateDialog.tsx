import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds, IExtensionDataService, IProjectPageService, getClient } from "azure-devops-extension-api";
import { TemplateProvider } from "../../shared/templateprovider";
import { SelectTemplateContainer } from "./selectTemplateContainer";
import React from "react";
import ReactDOM from "react-dom";
import { TemplateLoadingProcessor } from "../../shared/templateLoadingProcessor";
import { WorkItemTrackingRestClient } from "azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient";
import { AzureHttpClient } from "../../shared/azureHttpClient";

SDK.init().then(async () => {
    
    var projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
    var project = await projectService.getProject();
    var host = SDK.getHost();
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
    const templateLoadingProcessor = new TemplateLoadingProcessor(
        httpClient,
        templateProvider,
        1
    );
    
    var nestedFormContent = <SelectTemplateContainer templateProvider={templateProvider} templateLoadingProcessor={templateLoadingProcessor} />;

    ReactDOM.render(
        nestedFormContent,
        document.getElementById("root")    
    );

    await SDK.notifyLoadSucceeded();
    SDK.resize(200, 400);
});