import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { TextField } from "azure-devops-ui/TextField"
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { ModelGenerator } from "../../shared/modelGenerator";
import { TemplateItemEditorState } from "./templateItemEditorState";
import { TemplateItemPropertiesEditor } from "./templateItemPropertiesEditor";
import { Button } from "azure-devops-ui/Button";
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostNavigationService, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";
import { TemplateItemEditorReadOnlyChild } from "./templateItemEditorReadOnlyChild";

/**
 * React UI element for a template item editor.
 */
export class TemplateItemEditor extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemEditorState> {
    /**
     * Creates a new instance of `TemplateItemEditor`.
     * @param props - Represents a set of properties set in the react constructor.
     */
    constructor(props: { templateModel: Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({templateModel: nestedTemplateModel});
        });

        this.onTemplateNameChange = this.onTemplateNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onNewChildClick = this.onNewChildClick.bind(this);
        this.onExistingChildClick = this.onExistingChildClick.bind(this);
        this.addViaDialog = this.addViaDialog.bind(this);
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
    render(): React.ReactNode {
        const localState = this.state;

        return (
            <div>
                <div className="flex-row">
                    <span className="font-weight-heavy">Template Properties</span>
                </div>
                <div className="flex-row margin-top-4">
                    <span className="font-weight-light">Template Name</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel.templateName} onChange={this.onTemplateNameChange} />
                </div>
                <div className="flex-row margin-top-4">
                    <span className="font-weight-light">Description</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel.description} onChange={this.onDescriptionChange} multiline={true} />
                </div>

                <TemplateItemPropertiesEditor templateModel={this.props.templateModel} />

                <div className="separator-line-top margin-top-16 margin-bottom-8"></div>
                <div className="flex-stretch">
                    <span className="font-weight-heavy">Child Tasks</span>
                </div>
                <div className="flex-stretch">
                    <Button className="margin-left-4 margin-right-4" onClick={async() => await this.addViaDialog()}>Add Child Task</Button>
                </div>

                {
                    (localState.templateModel?.children ?? []).map(x => 
                        <TemplateItemEditorReadOnlyChild 
                            templatePartModel={x} 
                            templateModel={this.props.templateModel} 
                            initialState={this.state.templateModel} />)
                }
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

    private onNewChildClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        var templateModel = this.state.templateModel;
        var newChild = new ModelGenerator().newTemplatePartModel(false);

        templateModel.children = [...templateModel?.children ?? [], newChild];
        this.props.templateModel.notify(templateModel, 'Add Child', true);
    }

    private onExistingChildClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        var templateModel = this.state.templateModel;
        var toAdd = new ModelGenerator().newTemplatePartModel(true);
        
        templateModel.children = [...templateModel?.children ?? [], toAdd];
        this.props.templateModel.notify(templateModel, 'Add Child', true);
    }

    private async addViaDialog(): Promise<void> {
        var hostPageLayoutService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService)
            var hostNavigationService = await SDK.getService<IHostNavigationService>(CommonServiceIds.HostNavigationService);

            new CustomDialogHandler(hostPageLayoutService, hostNavigationService)
                .showWorkItemSelector(this.props.templateModel, this.state.templateModel);
    }
}