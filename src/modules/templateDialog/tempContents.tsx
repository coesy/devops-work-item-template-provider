import "es6-promise/auto";
import React from "react";
import { TemplateModel } from "../../shared/templateModel";
import { TemplateProvider } from "../../shared/templateprovider";
import { ModelGenerator } from "../../shared/modelGenerator";
import { SelectTemplateContainerState } from "./selectTemplateContainerState";


export class TempContents extends React.Component<{ templateProvider: TemplateProvider }, SelectTemplateContainerState> {

    constructor(props: {templates:TemplateModel[], templateProvider: TemplateProvider}){
        super(props);
        this.state = {
            selectedTemplate: new ModelGenerator().defaultTemplateModel(),
            templates: []
        }
    }

    render(): React.ReactNode {
        const state = this.state;

        return (
            <div>Temporary Contents</div>
        );
    }
}