import "./configurationDialog.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
import { TextField } from "azure-devops-ui/TextField"
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";
import { CommonServiceIds, IExtensionDataService } from "azure-devops-extension-api";
import { Button } from "azure-devops-ui/Button";

interface ChangeTracker {
    changed: boolean
}

interface TemplateItemEditorState {
    templateModel: TemplateModel
}

export class TemplateItemEditor extends React.Component<{changed: ChangeTracker, templateModel: TemplateModel}, TemplateItemEditorState> {
    constructor(props: {changed: ChangeTracker, templateModel: TemplateModel}) {
        super(props);
        this.state = {
            templateModel: props.templateModel
        };

        this.onTemplateNameChange = this.onTemplateNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    render(): React.ReactNode {
        const localState = this.state;

        return (
            <div>
                <div className="flex-row">
                    <span className="font-weight-light">Template Name</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel?.TemplateName} onChange={this.onTemplateNameChange} />
                </div>
                <div className="flex-row">
                    <span className="font-weight-light">Description</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel?.Description} onChange={this.onDescriptionChange} multiline={true} />
                </div>
            </div>
        );
    }

    private isValid(): boolean {
        return this.state.templateModel.TemplateName !== undefined 
            && this.state.templateModel.TemplateName.length > 0
            ;
    }

    private onTemplateNameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.props.templateModel.TemplateName = value;
        this.props.changed.changed = true;

        this.setState({
           templateModel: this.props.templateModel
        });
    }

    private onDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.props.templateModel.Description = value;
        this.props.changed.changed = true;

        this.setState({
            templateModel: this.props.templateModel
        });
    }
}

interface TemplateEditorState {
    templates: TemplateModel[],
    dropDownItems: {id:string, text:string}[],
    selectedTemplate: TemplateModel|undefined
}

interface TemplateDeleterState {
    templates: TemplateModel[],
    dropDownItems: {id:string, text:string}[],
    selectedTemplate: TemplateModel|undefined
}

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

                <div className="flex-row">
                <Button text="Delete" onClick={this.onDeleteButtonClick} className="buttonPadding" disabled={this.state.selectedTemplate === undefined} />
                </div>
                <div className="flex-row separator-line-top margin-top-8">
                    <span className="font-weight-semibold">{this.state.selectedTemplate?.TemplateName}</span>
                </div>
                <div className="flex-row">
                    <span>{this.state.selectedTemplate?.Description}</span>
                </div>
            </div>
        );
    }

    private loadTemplatesFromStore(): void {
        this.props.templateProvider.GetTemplates().then(templates => {
            this.setState({
                templates: templates,
                dropDownItems: templates.map(template => { return {id: template.id!, text: template.TemplateName};})
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
        await this.props.templateProvider.DeleteTemplate(this.state.selectedTemplate.id);
        this.loadTemplatesFromStore();
    }
}

export class TemplateEditor extends React.Component<{ templateProvider: TemplateProvider }, TemplateEditorState> {
    private changed: ChangeTracker = {changed: false};

    constructor(props: { templates:TemplateModel[], templateProvider: TemplateProvider }) { 
        super(props);
        this.state = {
            templates: [],
            dropDownItems: [],
            selectedTemplate: undefined
        };

        this.loadTemplatesFromStore = this.loadTemplatesFromStore.bind(this);
        this.loadTemplate = this.loadTemplate.bind(this);
        this.onTemplateChange = this.onTemplateChange.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.onDiscardChangesClick = this.onDiscardChangesClick.bind(this);

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
                        onSelect={this.onTemplateChange} />
                </div>
                <div className="flex-row">
                    <Button text="Save" onClick={this.onSaveButtonClick} className="buttonPadding" disabled={this.state.selectedTemplate === undefined} />
                    <Button text="Discard Changes" onClick={this.onDiscardChangesClick} className="buttonPadding" disabled={this.state.selectedTemplate === undefined} />
                </div>
                <div className="flex-stretch separator-line-top margin-top-8">
                    <div className="templateEditArea"></div>
                </div>
            </div>
        );
    }

    private loadTemplatesFromStore(): void {
        this.props.templateProvider.GetTemplates().then(templates => {
            this.setState({
                templates: templates,
                dropDownItems: templates.map(template => { return {id: template.id!, text: template.TemplateName};})
            });
        });
    }

    private loadTemplate(templateId: string): void {
        var templateModels = this.state.templates.filter(x => x.id == templateId);
        if (templateModels.length !== 1)
        {
            this.setState({
                selectedTemplate: undefined
            });
            return;
        }
        
        this.setState({
            selectedTemplate: templateModels[0]
        });

        this.changed.changed = false;

        ReactDOM.unmountComponentAtNode($('.templateEditArea')[0]);
        ReactDOM.render(
            <TemplateItemEditor 
                changed={this.changed} 
                templateModel={this.state.selectedTemplate!} />,
            $('.templateEditArea')[0]
        );
    }

    private onTemplateChange(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>) {

        this.loadTemplate(item.id);
    }

    private async onSaveButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (!this.changed.changed)
        {
            console.log('No changes to save');
            return;
        }

        await this.props.templateProvider.UpdateTemplate(this.state.selectedTemplate!);
        this.loadTemplatesFromStore();
        this.loadTemplate(this.state.selectedTemplate?.id!);
    }

    private onDiscardChangesClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        this.loadTemplatesFromStore();
        this.loadTemplate(this.state.selectedTemplate?.id!);
    }
}

interface ConfigurationContainerContentState {
    selectedTabId: string
}

export class ConfigurationContainerContent extends React.Component<{ templateProvider: TemplateProvider }, ConfigurationContainerContentState> {
    constructor(public props:{ templateProvider: TemplateProvider }) {
        super(props);
        this.state = {
            selectedTabId: 'edit'
        };

        // Bind methods to allow 'this' references in React callback methods.
        this.onSelectedTabChanged = this.onSelectedTabChanged.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="flex-column" style={{height:'800px'}} onLoad={() => { this.onSelectedTabChanged('edit'); }}>
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.state.selectedTabId}
                    tabSize={TabSize.Tall} >
                    <Tab name="Edit Template" id="edit" />
                    <Tab name="New Template" id="new" />
                    <Tab name="Delete Template" id="delete" />
                </TabBar>
                <div className="tabRoot"></div>
            </div>
        );
    }

    private async onSelectedTabChanged(newTabId: string) {
        this.setState({
            selectedTabId: newTabId
        });

        if (newTabId == 'edit')
        {
            ReactDOM.render(
                <TemplateEditor 
                    templateProvider={this.props.templateProvider} />,
                $('.tabRoot')[0]);
        } else if (newTabId == 'delete')
        {
            ReactDOM.render(
                <TemplateDeleter
                    templateProvider={this.props.templateProvider} />,
                $('.tabRoot')[0]);
        }
    }
}

SDK.init().then(async () => {
    // Get configuration as follows.
    // var configuration = SDK.getConfiguration();
    var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
    var dataManager = await dataService.getExtensionDataManager(
        'CodeBoost.devops-work-item-template-provider',
        await SDK.getAccessToken()
    );

    var templateProvider = new TemplateProvider(dataManager);

    var nestedFormContent = <ConfigurationContainerContent 
        templateProvider={templateProvider} />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 800);
});
