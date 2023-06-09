import "es6-promise/auto";
import React from "react";
import { TemplateModel } from "../../shared/templateModel";
import { TemplateProvider } from "../../shared/templateprovider";
import { ModelGenerator } from "../../shared/modelGenerator";
import { SelectTemplateContainerState } from "./selectTemplateContainerState";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateItemViewer } from "./templateItemViewer";
import { Button } from "azure-devops-ui/Button";
import { TemplateLoadingProcessor } from "../../shared/templateLoadingProcessor";

export class SelectTemplateContainer extends React.Component<{ templateProvider: TemplateProvider, templateLoadingProcessor: TemplateLoadingProcessor }, SelectTemplateContainerState> {

    private templateModelObserverable: Observable<TemplateModel>
        = new ObservableValue<TemplateModel>(new ModelGenerator().defaultTemplateModel());

    constructor(props: { templates: TemplateModel[], templateProvider: TemplateProvider, templateLoadingProcessor: TemplateLoadingProcessor }) {
        super(props);
        this.state = {
            selectedTemplate: new ModelGenerator().defaultTemplateModel(),
            templates: [],
            dropDownItems: [],
            itemSelected: false
        }

        this.loadTemplatesFromStore = this.loadTemplatesFromStore.bind(this);
        this.loadTemplate = this.loadTemplate.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onApplyButtonClick = this.onApplyButtonClick.bind(this);

        this.loadTemplatesFromStore();
    }

    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <div className="flex-row">
                    <label>Select CodeBoost Template:</label>
                </div>
                <div className="flex-stretch">
                    <Dropdown
                        className="dropDown"
                        ariaLabel="Basic"
                        placeholder="Select a template"
                        items={state.dropDownItems}
                        onSelect={this.onTemplateChange} />
                </div>
                <div className="flex-row margin-4">
                    <Button text="Apply" onClick={this.onApplyButtonClick} className="buttonPadding" disabled={!this.state.itemSelected} />
                </div>
                <div className="separator-line-top margin-top-16 margin-bottom-8"></div>
                <div className="flex-stretch" style={{ display: this.state.itemSelected ? 'block' : 'none' }}>
                    <TemplateItemViewer templateModel={this.templateModelObserverable} />
                </div>
            </div>
        );
    }

    /**
     * Reads all templates from the SDK then loads them into state.
     */
    private async loadTemplatesFromStore(): Promise<void> {
        var templates = await this.props.templateProvider.GetTemplates();
        templates = templates.sort((n1, n2) => {
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
            dropDownItems: templates.map(template => { return { id: template.id!, text: template.templateName }; })
        });
    }

    /**
     * Sets the current state to the template matching the given template ID.
     * @param templateId - Template ID to use when looking up a template to assign to state.
     */
    private loadTemplate(templateId: string): void {
        var templateModels = this.state.templates.filter(x => x.id == templateId);
        if (templateModels.length !== 1) {
            return;
        }

        this.templateModelObserverable.notify(templateModels[0], 'Initial', true);

        this.setState({
            itemSelected: true,
            selectedTemplate: templateModels[0]
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

    private async onApplyButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (!this.state.selectedTemplate === undefined) 
            return;
        



    }
}