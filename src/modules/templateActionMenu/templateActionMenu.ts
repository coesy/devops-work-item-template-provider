import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';

/**
 * Azure UI provider, used to load a react element into an Azure container. 
 */
var templateActionMenuProvider = () => {
    return {
        execute: function(actionContext:any) {
            //debugger;
            // Configure action menu
            SDK.notifyLoadSucceeded();
        }
    };
};

/**
 * Registers this component and handler with the devops SDK.
 */
SDK.register('CodeBoost.devops-work-item-template-provider.templateActionMenu', templateActionMenuProvider);
/**
 * SDK init entrypoint.
 */
SDK.init();