import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";
import { Button } from "azure-devops-ui/Button";
import { TemplateDeleterState } from "./templateDeleterState";

export class TemplateDeleter extends React.Component<{ templateProvider: TemplateProvider }, TemplateDeleterState> {

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

    private loadTemplatesFromStore(): void {
        this.props.templateProvider.GetTemplates().then(templates => {
            this.setState({
                templates: templates,
                dropDownItems: templates.map(template => { return {id: template.id!, text: template.templateName};})
            });
        });
    }

    private onTemplateChange(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>) {

        var filtered = this.state.templates.filter(x => x.id === item.id);

        this.setState({
            selectedTemplate: filtered.length === 1 ? filtered[0] : undefined
        });
    }

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