import { TemplateModel } from "../../shared/templateModel";

export class ModelGenerator {
    public defaultTemplateModel() : TemplateModel {
        return {
            id: undefined,
            templateName: '',
            description: '',
            children: [],
            workItemDescription: {
                toApply: false,
                value: ''
            }
        };
    }
}