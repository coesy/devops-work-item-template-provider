import { IDialogOptions, IHostNavigationService, IHostPageLayoutService } from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { WorkItemTaskSelectorConfiguration } from '../modules/workItemTaskSelector/workItemTaskSelectorConfiguration';
import { Observable } from 'azure-devops-ui/Core/Observable';
import { TemplateModel } from './templateModel';
import { TemplatePartModel } from './templatePartModel';
import { ConfigurationDialogConfiguration } from '../modules/configurationDialog/configurationDialogConfiguration';
import { TemplateDialogConfiguration } from '../modules/templateDialog/templateDialogConfiguration';

/**
 * A handler which can be used to load dialogs.
 */
export class CustomDialogHandler {
    constructor (
        private hostPageLayoutService: IHostPageLayoutService,
        private hostNavigationService: IHostNavigationService) {
        
    }

    /**
     * Show the configuration dialog for template management.
     */
    public showConfigurationDialog(): void {
        var dialogOptions: IDialogOptions<ConfigurationDialogConfiguration> = {};
        dialogOptions.title = 'CodeBoost Configuration';
        dialogOptions.lightDismiss = true;
        dialogOptions.configuration = {};

        this.hostPageLayoutService
            .openCustomDialog(SDK.getExtensionContext().id + '.configurationDialog', dialogOptions);
    }

    /**
     * Show the target work item selector.
     * @param templateModel - Current work item. Observerable into which children are inserted (if applicable from this dialog).
     * @param instance - Seed instance of `templateModel`.
     */
    public showWorkItemSelector(templateModel: Observable<TemplateModel>, instance: TemplateModel): void {
        var dialogOptions :IDialogOptions<TemplatePartModel> = {};
        dialogOptions.title = 'Work Item Selector';
        dialogOptions.lightDismiss = true;
        dialogOptions.configuration = {};

        templateModel.subscribe(newValue => instance = newValue);

        dialogOptions.onClose = (response) => {
            if (response === undefined)
                return;

            instance.children.push(response);
            templateModel.notify(instance, 'Update Children', true);
        };

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.workItemTaskSelector', dialogOptions);
    }

    /**
     * Shows the template dialoage for template selection.
     */
    public showTemplateDialog(): void {
        var dialogOptions: IDialogOptions<TemplateDialogConfiguration> = {};
        dialogOptions.title = 'CodeBoost Template Dialog';
        dialogOptions.lightDismiss = true;
        dialogOptions.configuration = {};

        this.hostPageLayoutService
            .openCustomDialog(SDK.getExtensionContext().id + '.templateDialog', dialogOptions);
    }
}