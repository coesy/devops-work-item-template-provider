import "./configurationDialog.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk/SDK';
import React from "react";
import ReactDOM from "react-dom";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { TemplateModel } from "../../shared/templateModel";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateProvider } from "../../shared/templateprovider";

export class TemplateEditor extends React.Component<{templates:TemplateModel[]}> {
    constructor(props: { templates:TemplateModel[] }) { 
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    render(): React.ReactNode {
        return (
            <div className="flex-row" style={{ margin: "8px", alignItems: "center"}}>
                <Dropdown
                    ariaLabel="Basic"
                    placeholder="Select a template"
                    items={this.props.templates.map(template => { return { id: template.TemplateName, text: template.TemplateName }})}
                    onSelect={this.onSelect}>
                </Dropdown>
            </div>
        );
    }

    private onSelect(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>) {

    }
}

export class ConfigurationContainerContent extends React.Component<{ templateProvider: TemplateProvider }> {
    private selectedTabId: ObservableValue<string>;

    constructor(public props:{ templateProvider: TemplateProvider }) {
        super(props);
        this.selectedTabId = new ObservableValue('1');

        // Bind methods to allow 'this' references in React callback methods.
        this.onSelectedTabChanged = this.onSelectedTabChanged.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="flex-column">
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.selectedTabId}
                    tabSize={TabSize.Tall}
                >
                    <Tab name="Edit Template" id="edit" />
                    <Tab name="New Template" id="new" />
                </TabBar>
                <div id="tabRoot"></div>
            </div>
        );
    }

    private async onSelectedTabChanged(newTabId: string) {
        debugger;
        this.selectedTabId.value = newTabId;
        if (newTabId == "edit")
            ReactDOM.render(
                <TemplateEditor 
                    templates={await this.props.templateProvider.GetTemplates()} />,
                document.getElementById('tabRoot'));
    }
}

$(document).ready(async () => {
    var templateProvider = new TemplateProvider();

    var nestedFormContent = <ConfigurationContainerContent 
        templateProvider={templateProvider}
        />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    //SDK.resize(1200, 800);
    //SDK.applyTheme(SDK.)
});
