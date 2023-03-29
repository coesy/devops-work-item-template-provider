import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';

// Create a handler which handles the menu items.
var configurationDialogProvider = () => {
    return {
        execute: function(actionContext:any) {
            debugger;
            //new CustomDialog().ShowDialog("Hello World");
            SDK.notifyLoadSucceeded();
        }
    };
};

SDK.register('CodeBoost.devops-work-item-template-provider.configurationDialog', configurationDialogProvider);
SDK.init();