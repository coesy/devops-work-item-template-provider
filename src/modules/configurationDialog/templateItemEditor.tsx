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
import { TemplateItemEditorState } from "./templateItemEditorState";
import { TemplateTargetWorkItemProperties } from "./templateTargetWorkItemProperties";

export class TemplateItemEditor extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemEditorState> {
    constructor(props: { templateModel: Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({
                templateModel: nestedTemplateModel
            });
        });

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
                    <TextField value={localState.templateModel.templateName} onChange={this.onTemplateNameChange} />
                </div>
                <div className="flex-row">
                    <span className="font-weight-light">Description</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel.description} onChange={this.onDescriptionChange} multiline={true} />
                </div>
                <TemplateTargetWorkItemProperties templateModel={this.props.templateModel} />
            </div>
        );
    }

    private isValid(): boolean {
        return this.state.templateModel.templateName !== undefined 
            && this.state.templateModel.templateName.length > 0
            ;
    }

    private onTemplateNameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        var templateModel = this.state.templateModel;
        templateModel.templateName = value;

        this.props.templateModel.notify(templateModel, 'Update', true);
    }

    private onDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        var templateModel = this.state.templateModel;
        templateModel.description = value;

        this.props.templateModel.notify(templateModel, 'Update', true);
    }
}