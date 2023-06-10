import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";
import { Button } from "azure-devops-ui/Button";
import { ModelGenerator } from "../../shared/modelGenerator";
import { TemplateItemEditor } from "./templateItemEditor";
import { EditTemplateContainerState } from "./editTemplateContainerState";

/**
 * TSX class for the template editor content. Handles the UI for editing a new or existing template.
 */
export class EditTemplateContainer extends React.Component<{ templateProvider: TemplateProvider }, EditTemplateContainerState> {
    /**
     * Root observerable used by this entire UI tree. All updates on this model are stored as changes,
     * and this is written if save/create is invoked.
     */
    private templateModelObserverable : Observable<TemplateModel> 
        = new ObservableValue<TemplateModel>(new ModelGenerator().defaultTemplateModel());

    /**
     * Creates a new instance of `EditTemplateContainer`.
     * @param props - Represents a set of properties set in the react constructor.
     */
    constructor(props: { templates:TemplateModel[], templateProvider: TemplateProvider }) { 
        super(props);
        this.state = {
            templates: [],
            dropDownItems: [],
            selectedTemplate: new ModelGenerator().defaultTemplateModel(),
            changed: false,
            showContent: false
        };

        this.templateModelObserverable.subscribe((value, action) => this.setState({
            selectedTemplate: value,
            changed: action !== 'Initial'
        }));

        this.loadTemplatesFromStore = this.loadTemplatesFromStore.bind(this);
        this.loadTemplate = this.loadTemplate.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.onDiscardChangesClick = this.onDiscardChangesClick.bind(this);

        this.loadTemplatesFromStore();
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <div className="flex-stretch">
                    <Dropdown
                        className="dropDown"
                        ariaLabel="Basic"
                        placeholder="Select a template"
                        items={state.dropDownItems}
                        onSelect={this.onTemplateChange} />
                </div>
                <div className="flex-row margin-4">
                    <Button text="Save" onClick={this.onSaveButtonClick} className="buttonPadding" disabled={!this.state.changed} />
                    <Button text="Discard Changes" onClick={this.onDiscardChangesClick} className="buttonPadding" disabled={!this.state.changed} />
                </div>
                <div className="separator-line-top margin-top-16 margin-bottom-8"></div>
                <div className="flex-stretch" style={{display: this.state.showContent ? 'block' : 'none'}}>
                    <TemplateItemEditor templateModel={this.templateModelObserverable} />
                </div>
            </div>
        );
    }

    /**
     * Reads all templates from the SDK then loads them into state.
     */
    private async loadTemplatesFromStore(): Promise<void>  {
        var templates = await this.props.templateProvider.GetTemplates();
        templates = templates.sort((n1,n2) => {
            if (n1.templateName > n2.templateName) {
                return 1;
            }
        
            if (n1.templateName < n2.templateName) {
                return -1;
            }
        
            return 0;
        });
        this.setState({
            templates: templates,
            dropDownItems: templates.map(template => { return {id: template.id!, text: template.templateName};})
        });
    }

    /**
     * Sets the current state to the template matching the given template ID.
     * @param templateId - Template ID to use when looking up a template to assign to state.
     */
    private loadTemplate(templateId: string): void {
        var templateModels = this.state.templates.filter(x => x.id == templateId);
        if (templateModels.length !== 1)
        {
            return;
        }
        
        this.templateModelObserverable.notify(templateModels[0], 'Initial', true);

        this.setState({
            showContent: true,
            changed: false
        });
    }

    /**
     * Handles the template change event.
     * @param event - React event, unused.
     * @param item - Newly selected template details.
     */
    private onTemplateChange(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>) {
        this.loadTemplate(item.id);
    }

    /**
     * Handles the save event.
     * @param event - React event, unused.
     */
    private async onSaveButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (!this.state.changed)
        {
            console.log('No changes to save');
            return;
        }

        var newtemplateName = this.state.selectedTemplate.templateName;

        $('.spinningBlocker').addClass('spinningBlockerShow');
        await this.props.templateProvider.UpdateTemplate(this.state.selectedTemplate!);
        await this.loadTemplatesFromStore();

        var newId = this.state.templates.filter(x => x.templateName === newtemplateName);
        if (newId.length !== 1) {
            console.log('An error has occurred after saving the template, no matching model found after reading back changes');
            return;
        }

        this.loadTemplate(newId[0].id!);
        $('.spinningBlocker').removeClass('spinningBlockerShow');
    }

    /**
     * Handles the discard changes event. Reloads the current state from the SDK store.
     * @param event 
     */
    private onDiscardChangesClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        this.loadTemplatesFromStore();
        this.loadTemplate(this.state.selectedTemplate?.id!);
    }
}