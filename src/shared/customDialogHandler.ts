import { IDialogOptions, IHostNavigationService, IHostPageLayoutService } from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { WorkItemTaskSelectorConfiguration } from '../modules/workItemTaskSelector/workItemTaskSelectorConfiguration';
import { Observable } from 'azure-devops-ui/Core/Observable';
import { TemplateModel } from './templateModel';
import { TemplatePartModel } from './templatePartModel';

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

    public showConfigurationDialog() : void {
        var dialogOptions :IDialogOptions<ConfigurationDialogConfiguration> = {};
        dialogOptions.title = 'CodeBoost Configuration';
        dialogOptions.lightDismiss = true;
        var configuration = new ConfigurationDialogConfiguration();
        dialogOptions.configuration = configuration;

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.configurationDialog', dialogOptions);
    }

    public showWorkItemSelector(templateModel: Observable<TemplateModel>, instance: TemplateModel): void {
        var dialogOptions :IDialogOptions<TemplatePartModel> = {};
        dialogOptions.title = 'Work Item Selector';
        dialogOptions.lightDismiss = true;
        var configuration = {
            
        };
        dialogOptions.configuration = configuration;

        templateModel.subscribe(newValue => instance = newValue);

        dialogOptions.onClose = (response) => {
            if (response === undefined)
                return;

            instance.children.push(response);
            templateModel.notify(instance, 'Update Children', true);
        };

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.workItemTaskSelector', dialogOptions);
    }
}