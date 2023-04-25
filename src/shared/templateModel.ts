import { TemplatePartModel } from './templatePartModel';

/**
 * Defines a configured template.
 */
export interface TemplateModel {
    /**
     * ID provided by the Azure plugin.
     */
    id: string|undefined,
    /**
     * Name of the template, shown to the user.
     */
    templateName: string,
    /**
     * Description of the template, shown to the user.
     */
    description: string,
    /**
     * Set of child tasks to insert.
     */
    children: TemplatePartModel[],
    /**
     * A description which, if not 
     */
    workItemDescription: TemplateModelAttribute|undefined
}

export interface TemplateModelAttribute {
    toApply: boolean,
    value: string
}