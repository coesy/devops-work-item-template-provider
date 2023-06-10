import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { TemplateProvider } from "../../shared/templateprovider";
import { Button } from "azure-devops-ui/Button";
import { ModelGenerator } from "../../shared/modelGenerator";
import { NewTemplateContainerState } from "./newTemplateContainerState";
import { TemplateItemEditor } from "./templateItemEditor";

/**
 * React UI for a new template.
 */
export class NewTemplateContainer extends React.Component<{ templateProvider: TemplateProvider, onSave:{(name:string): void }|undefined }, NewTemplateContainerState> {
    /**
     * Root observerable used by this entire UI tree. All updates on this model are stored as changes,
     * and this is written if save/create is invoked.
     */
    private templateModelObserverable : Observable<TemplateModel> 
        = new ObservableValue<TemplateModel>(new ModelGenerator().defaultTemplateModel());

    /**
     * Creates a new instance of `NewTemplateContainer`.
     * @param props - Represents a set of properties set in the react constructor.
     */
    constructor(props: { templates:TemplateModel[], templateProvider: TemplateProvider, onSave:{(name:string): void }|undefined }) { 
        super(props);
        this.state = {
            selectedTemplate: new ModelGenerator().defaultTemplateModel(),
            modelValid: false
        };

        this.templateModelObserverable.subscribe((value, action) => this.setState({
            selectedTemplate: value,
            modelValid: value.templateName.length > 0
        }));

        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <div className="flex-row">
                    <Button text="Save" onClick={this.onSaveButtonClick} className="buttonPadding" disabled={!this.state.modelValid} />
                </div>
                <div className="separator-line-top margin-top-16 margin-bottom-8"></div>
                <div className="flex-stretch">
                    <TemplateItemEditor templateModel={this.templateModelObserverable} />
                </div>
            </div>
        );
    }

    /**
     * Save button event, if model state is valid saves the current instance.
     * @param event - React event, unused.
     */
    private async onSaveButtonClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>): Promise<void> {
        if (!this.state.modelValid)
        {
            console.log('Model not valid to save');
            return;
        }

        var newtemplateName = this.state.selectedTemplate.templateName;

        $('.spinningBlocker').addClass('spinningBlockerShow');
        await this.props.templateProvider.CreateDocument(this.state.selectedTemplate!);
        $('.spinningBlocker').removeClass('spinningBlockerShow');
        if (this.props.onSave !== undefined)
            this.props.onSave!(newtemplateName);
    }
}