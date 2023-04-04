import React from "react";
import { INestedFormContentState } from "./iNestedFormContentState";
import { TemplateModel } from "../../shared/templateModel";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { Button } from "azure-devops-ui/Button";
import { IListBoxItem } from "azure-devops-ui/ListBox";

/**
 * A component which can be used to render the work item form panel.
 */
export class NestedFormContent extends React.Component<INestedFormContentState> {
    private selectedTemplate: TemplateModel|undefined;

    /**
     * Creates a new instance of NestedFormContent.
     * @param nestedFormContentState - State input from which to load UI state.
     */
    constructor(private nestedFormContentState: INestedFormContentState) {
        super(nestedFormContentState);
        this.state = nestedFormContentState;
     
        // Bind methods to allow 'this' references in React callback methods.
        this.dropdownChange = this.dropdownChange.bind(this);
        this.insertTemplateOnClick = this.insertTemplateOnClick.bind(this);
        this.insertTest = this.insertTest.bind(this);
    }

    /**
     * React render entrypoint. 
     */
    public render(): JSX.Element {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        CodeBoost Work Item Template
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Choose Template:</label>
                    </div>
                    <div className="col-sm-4">
                        <Dropdown<TemplateModel> className="dropDown" items={this.nestedFormContentState.templates.map(template => {
                            return { text: template.TemplateName, data: template, id: template.TemplateName };
                        })} onSelect={(sender, args) => this.dropdownChange(sender, args)}></Dropdown>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <Button text="Insert Template" onClick={() => this.insertTemplateOnClick()}></Button>
                    </div>
                    <div className="col-sm-2">
                        <Button text="Test Insert Template into Storage" onClick={() => this.insertTest()}></Button>
                    </div>
                </div>
            </div>
        );
    }

    private dropdownChange(sender:React.SyntheticEvent<HTMLElement, Event>, args:IListBoxItem<TemplateModel>): void {
        this.selectedTemplate = args.data;
    }

    private insertTemplateOnClick(): void {
        if (this.selectedTemplate === undefined)
            return;

        this.nestedFormContentState.templateLoadingProcessor.LoadChildren(this.selectedTemplate);
    }

    private async insertTest(): Promise<void> {
        await this.nestedFormContentState.templateLoadingProcessor.InsertTestRecord();
    }
}