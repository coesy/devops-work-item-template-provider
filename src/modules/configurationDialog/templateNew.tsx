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
import { Icon } from "azure-devops-ui/Icon";
import { Spinner, SpinnerSize } from "azure-devops-ui/Spinner";
import { ModelGenerator } from "./modelGenerator";
import { TemplateNewState } from "./templateNewState";
import { TemplateItemEditor } from "./templateItemEditor";

export class TemplateNew extends React.Component<{ templateProvider: TemplateProvider, onSave:{(name:string): void }|undefined }, TemplateNewState> {

    templateModelObserverable : Observable<TemplateModel> 
        = new ObservableValue<TemplateModel>(new ModelGenerator().defaultTemplateModel());

    constructor(props: { templates:TemplateModel[], templateProvider: TemplateProvider, onSave:{(name:string): void }|undefined }) { 
        super(props);
        this.state = {
            selectedTemplate: new ModelGenerator().defaultTemplateModel(),
            modelValid: false
        };

        this.templateModelObserverable.subscribe((value, action) => this.setState({
            selectedTemplate: value,
            modelValid: value.templateName.length > 0
        }));

        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <div className="flex-row">
                    <Button text="Save" onClick={this.onSaveButtonClick} className="buttonPadding" disabled={!this.state.modelValid} />
                </div>
                <div className="flex-stretch separator-line-top margin-top-8">
                    <TemplateItemEditor templateModel={this.templateModelObserverable} />
                </div>
            </div>
        );
    }

    private async onSaveButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (!this.state.modelValid)
        {
            console.log('Model not valid to save');
            return;
        }

        var newtemplateName = this.state.selectedTemplate.templateName;

        $('.spinningBlocker').addClass('spinningBlockerShow');
        await this.props.templateProvider.CreateDocument(this.state.selectedTemplate!);
        $('.spinningBlocker').removeClass('spinningBlockerShow');
        if (this.props.onSave !== undefined)
            this.props.onSave!(newtemplateName);
    }
}