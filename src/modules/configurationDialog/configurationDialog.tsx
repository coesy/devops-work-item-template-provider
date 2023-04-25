import "./configurationDialog.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
import { TextField } from "azure-devops-ui/TextField"
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";
import { CommonServiceIds, IExtensionDataService } from "azure-devops-extension-api";
import { Button } from "azure-devops-ui/Button";
import { Icon } from "azure-devops-ui/Icon";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { ConfigurationContainerContent } from "./configurationContainerContent";



























SDK.init().then(async () => {
    // Get configuration as follows.
    // var configuration = SDK.getConfiguration();
    var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    var dataManager = await dataService.getExtensionDataManager(
        'CodeBoost.devops-work-item-template-provider',
        await SDK.getAccessToken()
    );

    var templateProvider = new TemplateProvider(dataManager);

    var nestedFormContent = <ConfigurationContainerContent 
        templateProvider={templateProvider} />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 800);
});
