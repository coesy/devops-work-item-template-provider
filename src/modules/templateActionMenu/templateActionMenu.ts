import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostNavigationService, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";

/**
 * Azure UI provider, used to load a react element into an Azure container. 
 */
var templateActionMenuProvider = () => {
    return {
        execute: async function(actionContext:any) {
            //debugger;
            // Configure action menu
            var hostPageLayoutService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
            var hostNavigationService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);

            new CustomDialogHandler(hostPageLayoutService, hostNavigationService)
                .showTemplateDialog();
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
SDK.init().then(async () => {

});