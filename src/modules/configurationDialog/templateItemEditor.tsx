import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import ReactDOM from "react-dom";
import { TextField } from "azure-devops-ui/TextField"
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { ModelGenerator } from "./modelGenerator";
import { TemplateItemEditorState } from "./templateItemEditorState";
import { TemplateTargetWorkItemProperties } from "./templateTargetWorkItemProperties";
import { TemplatePartModel } from "../../shared/templatePartModel";
import { Button } from "azure-devops-ui/Button";
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { CommonServiceIds, IHostNavigationService, IHostPageLayoutService } from "azure-devops-extension-api";
import { CustomDialogHandler } from "../../shared/customDialogHandler";

export interface TemplateItemEditorReadOnlyChildState {
    expanded: boolean,
    templateModel: TemplateModel
}

export class TemplateItemEditorReadOnlyChild extends React.Component< { templatePartModel: TemplatePartModel, templateModel: Observable<TemplateModel>, initialState: TemplateModel }, TemplateItemEditorReadOnlyChildState> {
    public key: string;

    constructor(props: { templatePartModel: TemplatePartModel, templateModel: Observable<TemplateModel>, initialState: TemplateModel}) {
        super(props);

        this.state = {
            expanded: false,
            templateModel: props.initialState
        };

        props.templateModel.subscribe(newModel => this?.setState({templateModel: newModel}));

        this.reverseExpandedState = this.reverseExpandedState.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.key = props.templatePartModel.id;
    }

    render(): React.ReactNode {
        var reactDom = (
            <div className="flex-stretch margin-top-8 margin-bottom-8 padding-16 depth-8 depth-8">
                <div className="flex-grow">
                    <span className="font-weight-heavy" onClick={this.reverseExpandedState}>{this.props.templatePartModel.isExisting ? this.props.templatePartModel.workItemNumber : this.props.templatePartModel.title}</span>
                </div>

                {
                    this.props.templatePartModel.isExisting
                    ?
                    <>
                        <div className="flex-row margin-top-16" style={{display: this.state.expanded ? 'block' : 'none'}}>
                            <span className="font-weight-light">Work Item Id</span>
                        </div>  
                        <div className="flex-row margin-top-8" style={{display: this.state.expanded ? 'block' : 'none'}}>
                            <span className="font-weight-medium">{this.props.templatePartModel.workItemNumber}</span>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex-row margin-top-16" style={{display: this.state.expanded ? 'block' : 'none'}}>
                            <span className="font-weight-light">Description</span>
                        </div>  
                        <div className="flex-row margin-top-8" style={{display: this.state.expanded ? 'block' : 'none'}}>
                            <span className="font-weight-medium">{this.props.templatePartModel.description}</span>
                        </div>
                    </>
                }

                <div className="flex-row margin-top-16" style={{display: this.state.expanded ? 'block' : 'none'}}>
                    <Button onClick={this.deleteClick}>Delete</Button>
                </div>
                
            </div>
        );

        return reactDom;
    }

    private reverseExpandedState(): void {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    private deleteClick(): void {
        var model = this.state.templateModel;
        var thisId = this.props.templatePartModel.id;
        model.children = model.children.filter(x => x.id != thisId);

        this.setState({expanded: false});
        this.props.templateModel.notify(model, 'Removing Child', true);
    }
}

export class TemplateItemEditor extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemEditorState> {
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

                <TemplateTargetWorkItemProperties templateModel={this.props.templateModel} />

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