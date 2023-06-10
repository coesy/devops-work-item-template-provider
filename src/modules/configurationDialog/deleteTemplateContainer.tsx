import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";
import { Button } from "azure-devops-ui/Button";
import { DeleteTemplateContainerState } from "./deleteTemplateContainerState";

/**
 * React class for the delete template tab in the configuration dialog.
 */
export class DeleteTemplateContainer extends React.Component<{ templateProvider: TemplateProvider }, DeleteTemplateContainerState> {

    /**
     * Creates a new instance of `DeleteTemplateContainer`.
     * @param props - Represents a set of properties set in the react constructor.
     */
    constructor(props: { templates:TemplateModel[], templateProvider: TemplateProvider }) { 
        super(props);
        this.state = {
            templates: [],
            dropDownItems: [],
            selectedTemplate: undefined
        };

        this.loadTemplatesFromStore = this.loadTemplatesFromStore.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);

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
                        onSelect={this.onTemplateChange}>
                    </Dropdown>
                    
                </div>

                <div className="flex-row margin-4">
                <Button text="Delete" onClick={this.onDeleteButtonClick} className="buttonPadding" disabled={this.state.selectedTemplate === undefined} />
                </div>
                <div className="flex-row separator-line-top margin-8">
                    <span className="font-weight-semibold">{this.state.selectedTemplate?.templateName}</span>
                </div>
                <div className="flex-row">
                    <span>{this.state.selectedTemplate?.description}</span>
                </div>
            </div>
        );
    }

    /**
     * Reads all templates from the SDK then loads them into state.
     */
    private async loadTemplatesFromStore(): Promise<void> {
        var templates = await this.props.templateProvider.GetTemplates();
    
        this.setState({
            templates: templates,
            dropDownItems: templates.map(template => { return {id: template.id!, text: template.templateName};})
        });
    }

    /**
     * Handles the template drop downbox change event, sets the state to the newly selected item.
     * @param event - React event, unused.
     * @param item - Details the new dropdown box item.
     */
    private onTemplateChange(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>) {
        var filtered = this.state.templates.filter(x => x.id === item.id);

        this.setState({
            selectedTemplate: filtered.length === 1 ? filtered[0] : undefined
        });
    }

    /**
     * Handles the delete button action. Deletes the currently selected item from the SDK config store.
     * @param event - React event, unused.
     */
    private async onDeleteButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (this.state.selectedTemplate === undefined || this.state.selectedTemplate.id === undefined || this.state.selectedTemplate.id.length == 0)
        {
            console.log('Attempt to delete a template ID which does not exist');
            return;
        }
        $('.spinningBlocker').addClass('spinningBlockerShow');
        await this.props.templateProvider.DeleteTemplate(this.state.selectedTemplate.id);
        this.loadTemplatesFromStore();
        $('.spinningBlocker').removeClass('spinningBlockerShow');
    }
}