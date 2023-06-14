import "./workItemTaskSelector.scss";
import React from "react";
import { TextField } from "azure-devops-ui/TextField";
import { Button } from "azure-devops-ui/Button";
import { TemplatePartModel } from "../../shared/templatePartModel";
import * as SDK from 'azure-devops-extension-sdk';
import { TemplatePartModelExistingType } from "../../shared/templatePartModelExistingType";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { WorkItemTaskSelectorContentState } from "./workItemTaskSelectorContentState";
import { AzureHttpClient } from "../../shared/azureHttpClient";
import { AzureHttpClientFields } from "../../shared/azureHttpClientFields";

/**
 * React UI element provides the content for a new `TemplatePartModel` allowing the user to specify components.
 */
export class WorkItemTaskSelectorContent extends React.Component<{azureHttpClient: AzureHttpClient}, WorkItemTaskSelectorContentState> {
    constructor(public props:{azureHttpClient: AzureHttpClient}) {
        super(props);
        this.state = {
            isExisting: false,
            existingWorkItemValue: '',
            existingWorkItemReferenceType: TemplatePartModelExistingType.Copy,
            newWorkItemTitle: '',
            newWorkItemDescription: '',
            newWorkItemEstimate: ''
        };

        this.onExistingWorkItemValueChange = this.onExistingWorkItemValueChange.bind(this);
        this.onNewWorkItemTitleChange = this.onNewWorkItemTitleChange.bind(this);
        this.onNewWorkItemDescriptionChange = this.onNewWorkItemDescriptionChange.bind(this);
        this.onNewWorkItemEstimateChange = this.onNewWorkItemEstimateChange.bind(this);
        this.save = this.save.bind(this);
        this.onReferenceTypeChange = this.onReferenceTypeChange.bind(this);
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
    public render(): JSX.Element {
        var localState = this.state;
        return (
            <div className="flex-column">
                <div className="flex-stretch margin-top-16 margin-bottom-8">
                    <span className="font-weight-heavy">Child Task</span>
                </div>

                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">ID (If Work Item Already Exists)</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.existingWorkItemValue} 
                        onChange={this.onExistingWorkItemValueChange} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">Reference Type (If Work Item Already Exists)</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <Dropdown 
                        className="dropDown"
                        placeholder="Select a reference type"
                        items={[
                            {
                                id: TemplatePartModelExistingType.Copy.toString(),
                                text: "Insert task as a copy"
                            },
                            {
                                id: TemplatePartModelExistingType.Link.toString(),
                                text: "Insert task as a link"
                            }
                        ]}
                        onSelect={this.onReferenceTypeChange} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">Title</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemTitle} 
                        onChange={this.onNewWorkItemTitleChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">Description</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemDescription} 
                        multiline={true} 
                        onChange={this.onNewWorkItemDescriptionChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <span className="font-weight-light">Effort</span>
                </div>
                <div className="flex-stretch margin-top-4">
                    <TextField 
                        value={localState.newWorkItemEstimate} 
                        onChange={this.onNewWorkItemEstimateChange}
                        disabled={localState.isExisting} />
                </div>
                <div className="flex-stretch margin-top-8">
                    <Button onClick={this.save} text="Save" />
                </div>
            </div>
        );
    }

    /**
     * Handles the React text change event for the 'Existing Work Item Id' field.
     * When set to a value disables the fields attributed to a new item.
     * @param event - React callback event, unused.
     * @param value - New value specified by the user.
     */
    private async onExistingWorkItemValueChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): Promise<void> {
        this.setState({
            isExisting: value.length > 0,
            existingWorkItemValue: value
        });

        var asNumber = Number.parseInt(value);
        if (asNumber === undefined)
            return;

        var task = await this.props.azureHttpClient.GetTask(asNumber);
        if (task === undefined)
            return;

        this.setState({
            newWorkItemTitle: task.fields[AzureHttpClientFields.Title],
            newWorkItemDescription: task.fields[AzureHttpClientFields.Description],
            newWorkItemEstimate: task.fields[AzureHttpClientFields.Effort]
        });
    }

    /**
     * Handles the React dropdown box change event for the 'Reference Type' field.
     * @param event - React callback event, unused.
     * @param item - Details the dropdown box choice.
     */
    private onReferenceTypeChange(event: React.SyntheticEvent<HTMLElement, Event>, item: IListBoxItem<{}>): void {
        if (item.id === TemplatePartModelExistingType.Copy.toString())
            this.setState({
                existingWorkItemReferenceType: TemplatePartModelExistingType.Copy
            });
        else if (item.id === TemplatePartModelExistingType.Link.toString())
            this.setState({
                existingWorkItemReferenceType: TemplatePartModelExistingType.Link
            });
    }
    
    /**
     * Handles the React text change event for the 'New Work Item Title' field.
     * @param event - React callback event, unused.
     * @param value - New value specified by the user.
     */
    private onNewWorkItemTitleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemTitle: value
        });
    }

    /**
     * Handles the React text change event for the 'New Work Item Description' field.
     * @param event - React callback event, unused.
     * @param value - New value specified by the user.
     */
    private onNewWorkItemDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemDescription: value
        });
    }

    /**
     * Handles the React text change event for the 'New Work Item Estimate' field.
     * @param event - React callback event, unused.
     * @param value - New value specified by the user.
     */
    private onNewWorkItemEstimateChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.setState({
            newWorkItemEstimate: value            
        });
    }

    /**
     * Invoke to save the current form as a new `TemplatePartModel` in the dialog response content.
     */
    private async save(): Promise<void> {
        var partModel: TemplatePartModel = {
            id: crypto.randomUUID(),
            isExisting: this.state.isExisting,
            workItemNumber: this.state.existingWorkItemValue === '' ? -1 : Number.parseInt(this.state.existingWorkItemValue),
            title: this.state.newWorkItemTitle,
            description: this.state.newWorkItemDescription,
            attributes: [],
            copyType: this.state.existingWorkItemReferenceType
        };

        if (this.state.newWorkItemEstimate !== undefined && this.state.newWorkItemEstimate.length > 0)
            partModel.attributes.push({
                key: AzureHttpClientFields.Effort,
                value: this.state.newWorkItemEstimate
            });

        const config = SDK.getConfiguration();
        if (config.dialog) {
            config.dialog.close(partModel);
        }
        else if (config.panel) {
            config.panel.close(partModel);
        }
    }
}