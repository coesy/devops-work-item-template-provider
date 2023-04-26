import { TemplatePartCustomAttributeModel } from './templatePartCustomAttributeModel';

/**
 * Represents a child task to insert.
 */
export interface TemplatePartModel {
    /**
     * ID used to determine one child element from another.
     */
    id: string,
    /**
     * Whether or not this task already exists.
     */
    isExisting: boolean,
    /**
     * If this task already exists, then this will contain the target work item number.
     */
    workItemNumber: number,
    /**
     * Title of the work item to insert, if this is a new task.
     */
    title: string,
    /**
     * Set of attributes to insert, if this is a new task.
     */
    attributes: TemplatePartCustomAttributeModel[]
}