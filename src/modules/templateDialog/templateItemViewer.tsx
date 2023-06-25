import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import React from "react";
import { TemplateItemViewerState } from "./templateItemViewerState";
import { ModelGenerator } from "../../shared/modelGenerator";
import { TextField } from "azure-devops-ui/TextField";

export class TemplateItemViewer extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemViewerState> {

    constructor(props: { templateModel: Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({ templateModel: nestedTemplateModel });
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className="flex-row">
                    <span className="font-weight-heavy">Template Properties</span>
                </div>
                <div className="flex-row margin-top-4">
                    <span className="font-weight-light">Template Name</span>
                </div>
                <div className="flex-stretch">
                    <span>{this.state.templateModel.templateName}</span>
                </div>
                <div className="flex-row margin-top-4">
                    <span className="font-weight-light">Description</span>
                </div>
                <div className="flex-stretch">
                    <span>{this.state.templateModel.description}</span>
                </div>
                <div className="flex-row margin-top-4">
                    <span className="font-weight-light">Child Tasks</span>
                </div>
                <div className="flex-stretch">
                    <ul>
                        {this.state.templateModel.children.map(child => <li key={child.title}> {child.title}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}