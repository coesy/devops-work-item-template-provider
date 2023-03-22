import { TemplatePartModel } from "./templatePartModel";

/**
 * Defines a configured template.
 */
export class TemplateModel {

    /**
     * The Id of the template, unique.
     */
    public TemplateId: number
    /**
     * Name of the template, shown to the user.
     */
    public TemplateName: string;
    /**
     * Set of child tasks to insert.
     */
    public Children: TemplatePartModel[];
}