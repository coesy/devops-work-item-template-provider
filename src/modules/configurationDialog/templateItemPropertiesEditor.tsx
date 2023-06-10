import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { TextField } from "azure-devops-ui/TextField"
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { ModelGenerator } from "../../shared/modelGenerator";
import { TemplateItemPropertiesEditorState } from "./templateItemPropertiesEditorState";

/** 
 * React UI handles the properties of a target work item (properties to be adjusted from the template).
*/
export class TemplateItemPropertiesEditor extends React.Component<{ templateModel: Observable<TemplateModel> }, TemplateItemPropertiesEditorState> {
    /**
     * Creates a new instance of `TemplateItemPropertiesEditor`.
     * @param props - Represents a set of properties set in the react constructor.
     */
    constructor(props: { templateModel:Observable<TemplateModel> }) {
        super(props);

        this.state = {
            templateModel: new ModelGenerator().defaultTemplateModel()
        };

        props.templateModel.subscribe(nestedTemplateModel => {
            this.setState({
                templateModel: nestedTemplateModel
            });
        });

        this.onWorkItemDescriptionChange = this.onWorkItemDescriptionChange.bind(this);
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
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

    /**
     * Handles the description change event.
     * @param event - React event, unused.
     * @param value - New description entered.
     */
    private onWorkItemDescriptionChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
        var templateModel = this.state.templateModel;
        templateModel.workItemDescription = {
            toApply: value.length > 0,
            value: value
        };

        this.props.templateModel.notify(templateModel, 'Update', true);
    }
}