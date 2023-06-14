import React from "react";
import { TemplateModel } from "../../shared/templateModel";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Button } from "azure-devops-ui/Button";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { TemplateLoadingProcessor } from "../../shared/templateLoadingProcessor";
import { ModelGenerator } from "../../shared/modelGenerator";
import { WorkItemFormContentState } from "./nestedFormContentState";

/**
 * A component which can be used to render the work item form panel.
 */
export class WorkItemFormContent extends React.Component<{templates: TemplateModel[], templateLoadingProcessor: TemplateLoadingProcessor}, WorkItemFormContentState> {
    /**
     * Creates a new instance of WorkItemFormContent.
     * @param WorkItemFormContentState - State input from which to load UI state.
     */
    constructor(props: {templates: TemplateModel[], templateLoadingProcessor: TemplateLoadingProcessor}) {
        super(props);
        this.state = {
            selectedTemplate: new ModelGenerator().defaultTemplateModel()
        };
     
        // Bind methods to allow 'this' references in React callback methods.
        this.dropdownChange = this.dropdownChange.bind(this);
        this.insertTemplateOnClick = this.insertTemplateOnClick.bind(this);
    }

    /**
     * React render entrypoint. 
     */
    public render(): JSX.Element {
        return (
            <div>
                <div className="flex-row">
                    <label>CodeBoost Template:</label>
                </div>
                <div className="flex-stretch margin-top-4">
                    <Dropdown<TemplateModel> 
                        className="dropDown"
                        items={this.props.templates.map(template => {
                            return { text: template.templateName, data: template, id: template.templateName };})} 
                        onSelect={(sender, args) => this.dropdownChange(sender, args)} />
                </div>
                <div className="flex-stretch margin-top-4">
                    <Button text="Insert Template" onClick={() => this.insertTemplateOnClick()}></Button>
                </div>
            </div>
        );
    }

    /**
     * Handles the dropdown change event. Sets the sstate to the newly selected template.
     * @param sender - React parameter, not used.
     * @param args - Newly selected template data.
     */
    private dropdownChange(sender:React.SyntheticEvent<HTMLElement, Event>, args:IListBoxItem<TemplateModel>): void {
        this.setState({
            selectedTemplate: args.data
        });
    }

    /**
     * Handles the insert template event. Inserts the template children into the target work item, via the template
     * loading processor.
     */
    private insertTemplateOnClick(): void {
        if (this.state.selectedTemplate === undefined)
            return;

        this.props.templateLoadingProcessor.LoadChildren(this.state.selectedTemplate);
    }
}