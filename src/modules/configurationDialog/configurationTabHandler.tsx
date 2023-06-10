import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import ReactDOM from "react-dom";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { TemplateProvider } from "../../shared/templateprovider";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { EditTemplateContainer } from "./editTemplateContainer";
import { DeleteTemplateContainer } from "./deleteTemplateContainer";
import { NewTemplateContainer } from "./newTemplateContainer";
import { ConfigurationTabHandlerState } from "./configurationTabHandlerState";
import $ from 'jquery';

/**
 * Entry TSX class for the configuration container content.
 */
export class ConfigurationTabHandler extends React.Component<{ templateProvider: TemplateProvider }, ConfigurationTabHandlerState> {
    /**
     * Creates a new instance of `ConfigurationTabHandler`.
     * @param props - Template provider used to pass down into child tabs.
     */
    constructor(public props: { templateProvider: TemplateProvider }) {
        super(props);
        this.state = {
            selectedTabId: 'edit'
        };

        this.onSelectedTabChanged = this.onSelectedTabChanged.bind(this);
        this.onNewTemplateContainerSave = this.onNewTemplateContainerSave.bind(this);
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
    public render(): JSX.Element {
        return (
            <div className="flex-column" style={{ height: '800px' }} onLoad={() => { }}>
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.state.selectedTabId}
                    tabSize={TabSize.Tall} >
                    <Tab name="Edit Template" id="edit" isSelected={true} />
                    <Tab name="New Template" id="new" />
                    <Tab name="Delete Template" id="delete" />
                </TabBar>
                <div className="spinningBlocker">
                    <Spinner size={SpinnerSize.large} />
                </div>

                <div className="tabRoot" style={{ overflow: 'scroll' }}></div>
            </div>
        );
    }

    /**
     * Handles the tab change event.
     * @param newTabId - Target tab code to change to. Currently 'edit', 'delete', 'new'.
     */
    private async onSelectedTabChanged(newTabId: string) {
        this.setState({
            selectedTabId: newTabId
        });

        if (newTabId == 'edit') {
            ReactDOM.render(
                <EditTemplateContainer
                    templateProvider={this.props.templateProvider} />,
                $('.tabRoot')[0]);
        } else if (newTabId == 'delete') {
            ReactDOM.render(
                <DeleteTemplateContainer
                    templateProvider={this.props.templateProvider} />,
                $('.tabRoot')[0]);
        } else if (newTabId == 'new') {
            ReactDOM.render(
                <NewTemplateContainer
                    templateProvider={this.props.templateProvider}
                    onSave={this.onNewTemplateContainerSave} />,
                $('.tabRoot')[0]);
        }
    }

    /**
     * Call to move to the edit tab. Handles the redirect when a new template has been added.
     * @oaram name - Name of the new template to load in the edit window. Currently unused.
     */
    private onNewTemplateContainerSave(name: string): void {
        this.setState({
            selectedTabId: 'edit'
        });
    }
}