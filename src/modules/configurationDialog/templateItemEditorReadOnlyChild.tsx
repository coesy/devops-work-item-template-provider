import "./configurationDialog.scss";
import "es6-promise/auto";
import React from "react";
import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";
import { TemplatePartModel } from "../../shared/templatePartModel";
import { Button } from "azure-devops-ui/Button";
import { TemplateItemEditorReadOnlyChildState } from "./templateItemEditorReadOnlyChildState";

/**
 * React UI handles a readonly `TemplatePartModel` instance.
 */
export class TemplateItemEditorReadOnlyChild extends React.Component< { templatePartModel: TemplatePartModel, templateModel: Observable<TemplateModel>, initialState: TemplateModel }, TemplateItemEditorReadOnlyChildState> {
    /**
     * Key used by parent to handle ordering/reloading.
     */
    public key: string;

    /**
     * Creates a new instance of `TemplateItemEditorReadOnlyChild`.
     * @param props - Represents a set of properties set in the react constructor.
     */
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

    /**
     * React UI render method.
     * @returns UI content to render in the element React has been configured to render into.
     */
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

    /**
     * Reverses the state expanded boolean.
     */
    private reverseExpandedState(): void {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    /**
     * Handles the delete event. Removes this instance from the parent template.
     */
    private deleteClick(): void {
        var model = this.state.templateModel;
        var thisId = this.props.templatePartModel.id;
        model.children = model.children.filter(x => x.id != thisId);

        this.setState({expanded: false});
        this.props.templateModel.notify(model, 'Removing Child', true);
    }
}