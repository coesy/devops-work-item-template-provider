import "./workItemTaskSelector.scss";
import React from "react";
import { TemplateModel } from "../../shared/templateModel";
import { Observable } from "azure-devops-ui/Core/Observable";
import { ModelGenerator } from "../configurationDialog/modelGenerator";
import { TextField } from "azure-devops-ui/TextField";
import { Button } from "azure-devops-ui/Button";
import { TemplatePartModel } from "../../shared/templatePartModel";
import * as SDK from 'azure-devops-extension-sdk';
import { CommonServiceIds, IExtensionDataService, IHostPageLayoutService } from "azure-devops-extension-api";

export interface WorkItemTaskSelectorContentState {
    isExisting: boolean,
    existingWorkItemValue: string,
    newWorkItemTitle: string,
    newWorkItemDescription: string,
    newWorkItemEstimate: string
}

export class WorkItemTaskSelectorContent extends React.Component<{}, WorkItemTaskSelectorContentState> {
    constructor(public props:{}) {
        super(props);
        this.state = {
            isExisting: false,
            existingWorkItemValue: '',
            newWorkItemTitle: '',
            newWorkItemDescription: '',
            newWorkItemEstimate: ''
        };

        this.onExistingWorkItemValueChange = this.onExistingWorkItemValueChange.bind(this);
        this.onNewWorkItemTitleChange = this.onNewWorkItemTitleChange.bind(this);
        this.onNewWorkItemDescriptionChange = this.onNewWorkItemDescriptionChange.bind(this);
        this.onNewWorkItemEstimateChange = this.onNewWorkItemEstimateChange.bind(this);
        this.save = this.save.bind(this);
    }

    public render(): JSX.Element {
        var localState = this.state;
        return (
            <div className="flex-column">
                <div className="flex-stretch margin-top-16 margin-bottom-8">
                    <span className="font-weight-heavy">Child Task</span>
                </div>

                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">Existing Work Item Id</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.existingWorkItemValue} 
                        onChange={this.onExistingWorkItemValueChange} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">New Work Item Title</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemTitle} 
                        onChange={this.onNewWorkItemTitleChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">New Work Item Description</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemDescription} 
                        multiline={true} 
                        onChange={this.onNewWorkItemDescriptionChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">New Work Item Estimate</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemEstimate} 
                        onChange={this.onNewWorkItemEstimateChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <Button onClick={this.save} text="Save" />
                </div>
            </div>
        );
    }

    private onExistingWorkItemValueChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            isExisting: value.length > 0,
            existingWorkItemValue: value
        });
    }

    private onNewWorkItemTitleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemTitle: value
        });
    }

    private onNewWorkItemDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemDescription: value
        });
    }

    private onNewWorkItemEstimateChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemEstimate: value            
        });
    }

    private async save(): Promise<void> {
        var partModel: TemplatePartModel = {
            id: crypto.randomUUID(),
            isExisting: this.state.isExisting,
            workItemNumber: this.state.existingWorkItemValue === '' ? -1 : Number.parseInt(this.state.existingWorkItemValue),
            title: this.state.newWorkItemTitle,
            description: this.state.newWorkItemDescription,
            attributes: [
            //    {
            //        key: '',
            //        value: ''
            //    }
            ]
        };

        const config = SDK.getConfiguration();
        if (config.dialog) {
            config.dialog.close(partModel);
        }
        else if (config.panel) {
            config.panel.close(partModel);
        }
    }
}