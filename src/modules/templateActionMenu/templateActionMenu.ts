import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';

// Create a handler which handles the menu items.
var templateActionMenuProvider = () => {
    return {
        execute: function(actionContext:any) {
            //debugger;
            // Configure action menu
            SDK.notifyLoadSucceeded();
        }
    };
};

SDK.register('CodeBoost.devops-work-item-template-provider.templateActionMenu', templateActionMenuProvider);
SDK.init();