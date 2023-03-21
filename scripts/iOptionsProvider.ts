import { TemplateModel } from "./templateModel";

/**
 * Defines a base class for configuration used by this app.
 */
export interface IOptionsProvider {
    /**
     * Returns a set of templates currently configured.
     */
    GetTemplates() : TemplateModel[];
}