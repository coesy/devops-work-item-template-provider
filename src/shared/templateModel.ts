import { TemplatePartModel } from './templatePartModel';

/**
 * Defines a configured template.
 */
export class TemplateModel {
    
    public id: string|undefined = undefined;
    /**
     * Name of the template, shown to the user.
     */
    public TemplateName: string = '';
    /**
     * Description of the template, shown to the user.
     */
    public Description: string = '';
    /**
     * Set of child tasks to insert.
     */
    public Children: TemplatePartModel[] = [];
}