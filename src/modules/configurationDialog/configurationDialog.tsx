import "./configurationDialog.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
import { TemplateProvider } from "../../shared/templateprovider";
import { CommonServiceIds, IExtensionDataService } from "azure-devops-extension-api";
import { ConfigurationTabHandler } from "./configurationTabHandler";

/**
 * SDK entrypoint to load the configuration dialog UI.
 */
SDK.init().then(async () => {
    var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    var dataManager = await dataService.getExtensionDataManager(
        'CodeBoost.devops-work-item-template-provider',
        await SDK.getAccessToken()
    );

    var templateProvider = new TemplateProvider(dataManager);

    var nestedFormContent = <ConfigurationTabHandler 
        templateProvider={templateProvider} />;
    
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 800);
});
