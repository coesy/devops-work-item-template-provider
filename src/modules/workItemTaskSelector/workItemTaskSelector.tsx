import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
import { WorkItemTaskSelectorContent } from "./workItemTaskSelectorContent";
import { CommonServiceIds, IProjectPageService, getClient } from "azure-devops-extension-api";
import { WorkItemTrackingRestClient } from "azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient";
import { AzureHttpClient } from "../../shared/azureHttpClient";

/**
 * SDK entrypoint to load the work item task selector UI.
 */
SDK.init().then(async () => {
    var projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
    var project = await projectService.getProject();
    var host = await SDK.getHost();
    var client = getClient(WorkItemTrackingRestClient)

    var httpClient = new AzureHttpClient(
        host.id,
        project!.id,
        client
    );

    var nestedFormContent = <WorkItemTaskSelectorContent azureHttpClient={httpClient} />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 480);
});
