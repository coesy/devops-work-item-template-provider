import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";

// Create a handler which handles the menu items.
var configureActionMenuProvider = () => {
    return {
        execute: async function(actionContext:any) {
            var hostPageLayoutService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);

            new CustomDialogHandler(hostPageLayoutService)
                .Show();

            SDK.notifyLoadSucceeded();
        }
    };
};

SDK.register('CodeBoost.devops-work-item-template-provider.configureActionMenu', configureActionMenuProvider);
SDK.init();