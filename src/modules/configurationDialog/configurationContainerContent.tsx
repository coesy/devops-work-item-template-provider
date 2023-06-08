import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import ReactDOM from "react-dom";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { TemplateProvider } from "../../shared/templateprovider";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { TemplateEditor } from "./templateEditor";
import { TemplateDeleter } from "./templateDeleter";
import { TemplateNew } from "./templateNew";
import { ConfigurationContainerContentState } from "./configurationContainerContentState";

/**
 * Entry TSX class for the configuration container content.
 */
export class ConfigurationContainerContent extends React.Component<{ templateProvider: TemplateProvider }, ConfigurationContainerContentState> {
    /**
     * Creates a new instance of `ConfigurationContainerContent`.
     * @param props - Template provider used to pass down into child tabs.
     */
    constructor(public props:{ templateProvider: TemplateProvider }) {
        super(props);
        this.state = {
            selectedTabId: 'edit'
        };

        this.onSelectedTabChanged = this.onSelectedTabChanged.bind(this);
        this.onTemplateNewSave = this.onTemplateNewSave.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="flex-column" style={{height:'800px'}} onLoad={() => {  }}>
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
                
                <div className="tabRoot" style={{overflow:'scroll'}}></div>
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
        } else if (newTabId == 'new')
        {
            ReactDOM.render(
                <TemplateNew
                    templateProvider={this.props.templateProvider}
                    onSave={this.onTemplateNewSave} />,
                $('.tabRoot')[0]);
        }
    }

    private onTemplateNewSave(name: string): void {
        this.setState({
            selectedTabId: 'edit'
        });
    }
}