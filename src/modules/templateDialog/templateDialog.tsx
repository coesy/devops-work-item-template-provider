import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds, IExtensionDataService } from "azure-devops-extension-api";
import { TemplateProvider } from "../../shared/templateprovider";
import { TempContents } from "./tempContents";
import React from "react";
import ReactDOM from "react-dom";

SDK.init().then(async () => {
    
    var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    var dataManager = await dataService.getExtensionDataManager(
        'CodeBoost.devops-work-item-template-provider',
        await SDK.getAccessToken()
    );

    var templateProvider = new TemplateProvider(dataManager);
    
    var nestedFormContent = <TempContents templateProvider={templateProvider} />;

    ReactDOM.render(
        nestedFormContent,
        document.getElementById("root")    
    );

    await SDK.notifyLoadSucceeded();
    SDK.resize(200, 400);
});