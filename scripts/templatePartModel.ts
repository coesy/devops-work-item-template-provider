import { TemplatePartCustomAttributeModel } from "./templatePartCustomAttributeModel";

/**
 * Represents a child task to insert.
 */
export class TemplatePartModel {
    /**
     * Whether or not this task already exists.
     */
    public IsExisting: boolean;
    /**
     * If this task already exists, then this will contain the target work item number.
     */
    public WorkItemNumber: string;
    /**
     * Title of the work item to insert, if this is a new task.
     */
    public Title: string;
    /**
     * Set of attributes to insert, if this is a new task.
     */
    public Attributes: TemplatePartCustomAttributeModel[];
}