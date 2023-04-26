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

export interface TemplateItemEditorChildState {
    templateModel: TemplateModel,
    title: string,
    childId: string
};
export class TemplateItemEditorChild extends React.Component<{ templateModel: Observable<TemplateModel>, childId: string }, TemplateItemEditorChildState> {
    constructor(props: { templateModel: Observable<TemplateModel>, childId: string }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel(),
            title: '',
            childId: props.childId
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            if (this.state.childId.length == 0) 
                return;

            this.setState({
                templateModel: nestedTemplateModel,
                title: nestedTemplateModel.children.filter(x => x.id === this.props.childId)[0].title
            });
        });

        this.titleChange = this.titleChange.bind(this);
    }

    render(): React.ReactNode {
        const localState = this.state;

        return (
            <>
                <div className="flex-stretch"><span>New Child</span></div>
                <div className="flex-stretch">
                    <TextField value={localState.title} onChange={this.titleChange}></TextField>
                </div>
            </>
            
        );
    }

    private titleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        this.ensureCreated();

        var model = this.state.templateModel;
        model.children.filter(x => x.id == this.state.childId)[0].title = value;
        this.props.templateModel.notify(model, 'Update', true);
    }

    private ensureCreated(): void {
        if (this.state.childId.length !== 0) return;

        var newId = crypto.randomUUID().toString();
        var model = this.state.templateModel;
        model.children.push({
            id: newId,
            isExisting: false,
            workItemNumber: -1,
            title: '',
            attributes: []
        });

        this.setState({
            childId: newId
        });
    }
}

export class TemplateItemEditor extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemEditorState> {
    constructor(props: { templateModel: Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        };

        props.templateModel.subscribe(nestedTemplateModel => {

            // TODO: Track changes using IDs to only manipulate children added/removed/changed.

            ReactDOM.unmountComponentAtNode($('.childContainer')[0]);
            
            this.setState({
                templateModel: nestedTemplateModel
            });

            if (nestedTemplateModel.children === undefined)
                return;

            ReactDOM.render(
                nestedTemplateModel.children.map(child => <TemplateItemEditorChild templateModel={this.props.templateModel} childId={child.id} />),
                $('.childContainer')[0]);
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

                <div className="childContainer"></div>
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