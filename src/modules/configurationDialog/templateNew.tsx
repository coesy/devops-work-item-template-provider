import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Observable, ObservableValue } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { TemplateProvider } from "../../shared/templateprovider";
import { Button } from "azure-devops-ui/Button";
import { ModelGenerator } from "./modelGenerator";
import { TemplateNewState } from "./templateNewState";
import { TemplateItemEditor } from "./templateItemEditor";

export class TemplateNew extends React.Component<{ templateProvider: TemplateProvider, onSave:{(name:string): void }|undefined }, TemplateNewState> {

    templateModelObserverable : Observable<TemplateModel> 
        = new ObservableValue<TemplateModel>(new ModelGenerator().defaultTemplateModel());

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

    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>
                <div className="flex-row">
                    <Button text="Save" onClick={this.onSaveButtonClick} className="buttonPadding" disabled={!this.state.modelValid} />
                </div>
                <div className="flex-stretch separator-line-top margin-top-8">
                    <TemplateItemEditor templateModel={this.templateModelObserverable} />
                </div>
            </div>
        );
    }

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