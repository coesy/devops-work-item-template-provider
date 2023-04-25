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
import { TemplateTargetWorkItemPropertiesState } from "./templateTargetWorkItemPropertiesState";

export class TemplateTargetWorkItemProperties extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateTargetWorkItemPropertiesState> {
    constructor(props: { templateModel:Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        }

        props.templateModel.subscribe(nestedTemplateModel => {
            this.state = {
                templateModel: nestedTemplateModel
            };
        });

        this.onWorkItemDescriptionChange = this.onWorkItemDescriptionChange.bind(this);
        this.onCollapseClick = this.onCollapseClick.bind(this);
    }

    render(): React.ReactNode {
        const localState = this.state;

        return (
            <div className="subtle-border">
                <div className="flex-end">
                    <Icon ariaLabel="Collapse All" iconName="CollapseAll" className="cursor-pointer" style={{display:'none'}} onClick={this.onCollapseClick} />
                    <Icon ariaLabel="Expand All" iconName="ExpandAll" className="cursor-pointer" />
                </div>
                <div className="flex-row" style={{display:'none'}}>
                    <span className="font-weight-light">Target Work Item Description</span>
                </div>
                <div className="flex-row" style={{display:'none'}}>
                    <TextField value={localState.templateModel.workItemDescription?.value} multiline={true} onChange={this.onWorkItemDescriptionChange} />
                </div>
            </div>
        );
    }

    private onWorkItemDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        var templateModel = this.state.templateModel;
        templateModel.workItemDescription = {
            toApply: value.length > 0,
            value: value
        };

        this.props.templateModel.notify(templateModel, 'Update', true);
    }

    private onCollapseClick(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
        debugger;
    }
}