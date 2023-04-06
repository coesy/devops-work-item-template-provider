import "./configurationDialog.scss";
import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk/SDK';
import React from "react";
import { Button } from "azure-devops-ui/Button";
import ReactDOM from "react-dom";
import { Nav } from "react-bootstrap";
import { Page } from "azure-devops-ui/Page";
import { Header, TitleSize } from "azure-devops-ui/Header";

export interface IConfigurationContainerContentState {

}

export class ConfigurationContainerContent extends React.Component<IConfigurationContainerContentState> {
    
    constructor(private configurationContainerContentState:IConfigurationContainerContentState) {
        super(configurationContainerContentState);
        this.setState(configurationContainerContentState);
    }

    public render(): JSX.Element {
        return (
            <Page>
                <Header title="CodeBoost Configuration"></Header>
                <div className="page-content">
                    <div>Hello World</div>
                </div>
            </Page>
        );
    }
}

$(document).ready(async () => {
    var nestedFormContent = <ConfigurationContainerContent 
        //templates={templates} 
        //templateLoadingProcessor={templateLoadingProcessor} 
        />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(1200,800);
});
