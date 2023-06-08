import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { TextField } from "azure-devops-ui/TextField"
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { ModelGenerator } from "./modelGenerator";
import { TemplateTargetWorkItemPropertiesState } from "./templateTargetWorkItemPropertiesState";

export class TemplateTargetWorkItemProperties extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateTargetWorkItemPropertiesState> {
    constructor(props: { templateModel:Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel(),
            templateChildren: []
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({
                templateModel: nestedTemplateModel,
                templateChildren: nestedTemplateModel.children
            });
        });

        this.onWorkItemDescriptionChange = this.onWorkItemDescriptionChange.bind(this);
    }

    render(): React.ReactNode {
        const localState = this.state;

        return (
            <>
                <div className="separator-line-top margin-top-16 margin-bottom-8"></div>
                <div className="flex-grow">
                    <span className="font-weight-heavy">Target Work Item Properties</span>
                </div>

                <div className="flex-row margin-top-4" >
                    <span className="font-weight-light">Target Work Item Description</span>
                </div>
                <div className="flex-stretch">
                    <TextField value={localState.templateModel.workItemDescription?.value} multiline={true} onChange={this.onWorkItemDescriptionChange} />
                </div>
            </>
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
}