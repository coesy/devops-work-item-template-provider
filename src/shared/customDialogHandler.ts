import { IDialogOptions, IHostNavigationService, IHostPageLayoutService } from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk/SDK';

/**
 * 
 */
export class CustomDialogHandler {
    constructor (
        private hostPageLayoutService: IHostPageLayoutService,
        private hostNavigationService: IHostNavigationService) {
        
    }

    public Show() : void {
        var dialogOptions :IDialogOptions<undefined> = {};
        dialogOptions.title = 'CodeBoost Configuration';
        dialogOptions.lightDismiss = true;
        dialogOptions.configuration = {
            //width: 1200,
            //height: 800
        };

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.configurationDialog', dialogOptions);
    }
}