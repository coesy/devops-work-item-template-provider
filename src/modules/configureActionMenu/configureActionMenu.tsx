import "es6-promise/auto";

import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostNavigationService, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";

// Create a handler which handles the menu items.
var configureActionMenuProvider = () => {
    return {
        execute: async function(actionContext:any) {
            var hostPageLayoutService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);
            var hostNavigationService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);

            new CustomDialogHandler(hostPageLayoutService, hostNavigationService)
                .Show();

            //SDK.notifyLoadSucceeded();
        }
    };
};

SDK.register('CodeBoost.devops-work-item-template-provider.configureActionMenu', configureActionMenuProvider);
SDK.init().then(async () => {
    //debugger;
    //var hostNavigationService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);
    //debugger;
    //console.log('Hello world');
    //var queryParams = (await hostNavigationService.getQueryParams())['loadUI'];
    //if (queryParams !== 'true')
    //    return;
    //    console.log('Hello world - 2');
    //$('.he').html('NEW CONTENT');
});
