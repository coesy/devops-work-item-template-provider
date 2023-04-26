import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { TextField } from "azure-devops-ui/TextField"
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { Icon } from "azure-devops-ui/Icon";
import { ModelGenerator } from "./modelGenerator";
import { TemplateTargetWorkItemPropertiesState } from "./templateTargetWorkItemPropertiesState";
import { Button } from "azure-devops-ui/Button";
import { Card } from "azure-devops-ui/Card";

export class TemplateTargetWorkItemProperties extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateTargetWorkItemPropertiesState> {
    constructor(props: { templateModel:Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel(),
            expanded: false
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({
                templateModel: nestedTemplateModel
            });
        });

        this.onWorkItemDescriptionChange = this.onWorkItemDescriptionChange.bind(this);
        this.onCollapseClick = this.onCollapseClick.bind(this);
        this.onCollapseButtonClick = this.onCollapseButtonClick.bind(this);
    }

    render(): React.ReactNode {
        const localState = this.state;

        return (
            <div className="flex-stretch margin-top-8 margin-bottom-8 padding-16 depth-8 depth-8">
                <div className="flex-grow" style={{margin:'-8px', height:'37.6px'}}>
                    <span>Target Work Item Properties</span>
                    <Button style={{float:'right'}} onClick={this.onCollapseButtonClick}>{this.state.expanded ? 'Collapse' : 'Expand'}</Button>
                    <div style={{flex:'break'}}></div>
                </div>

                <div className="flex-row margin-top-16" style={{display: localState.expanded ? 'block' : 'none'}}>
                    <span className="font-weight-light">Target Work Item Description</span>
                </div>
                <div className="flex-row" style={{display: localState.expanded ? 'block' : 'none'}}>
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
        var newExpanded = !this.state.expanded;

        this.setState({
            expanded: newExpanded
        });
    }

    private onCollapseButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): void {
        var newExpanded = !this.state.expanded;

        this.setState({
            expanded: newExpanded
        });
    }
}