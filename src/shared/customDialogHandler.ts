import { IDialogOptions, IHostNavigationService, IHostPageLayoutService } from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk/SDK';

export class ConfigurationDialogConfiguration
{
    //public test: string = "";
}

/**
 * 
 */
export class CustomDialogHandler {
    constructor (
        private hostPageLayoutService: IHostPageLayoutService,
        private hostNavigationService: IHostNavigationService) {
        
    }

    public Show() : void {
        var dialogOptions :IDialogOptions<ConfigurationDialogConfiguration> = {};
        dialogOptions.title = 'CodeBoost Configuration';
        dialogOptions.lightDismiss = true;
        var configuration = new ConfigurationDialogConfiguration();
        //configuration.test = "Hello World 9";
        dialogOptions.configuration = configuration;

        dialogOptions.onClose = (configuration) => {
            // To handle postback from dialog if required.
            //debugger;
        };

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.configurationDialog', dialogOptions);
    }
}