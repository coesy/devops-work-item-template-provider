import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostNavigationService, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";

/**
 * Azure UI provider, used to load a react element into an Azure container. 
 */
var configureActionMenuProvider = () => {
    return {
        execute: async function(actionContext:any) {
            var hostPageLayoutService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
            var hostNavigationService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);

            new CustomDialogHandler(hostPageLayoutService, hostNavigationService)
                .showConfigurationDialog();
        }
    };
};

/**
 * Registers this component and handler with the devops SDK.
 */
SDK.register('CodeBoost.devops-work-item-template-provider.configureActionMenu', configureActionMenuProvider);
/**
 * SDK init entrypoint.
 */
SDK.init().then(async () => {
    
});
