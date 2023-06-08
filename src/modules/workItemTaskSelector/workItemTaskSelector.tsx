import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
//import { TemplateProvider } from "../../shared/templateprovider";
//import { CommonServiceIds, IExtensionDataService } from "azure-devops-extension-api";
import { WorkItemTaskSelectorContent } from "./workItemTaskSelectorContent";
import { WorkItemTaskSelectorConfiguration } from "./workItemTaskSelectorConfiguration";
import { IExtensionDataService } from "azure-devops-extension-api";

SDK.init().then(async () => {
    var nestedFormContent = <WorkItemTaskSelectorContent />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 400);
});
