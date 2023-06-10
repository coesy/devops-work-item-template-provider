import { TemplateModel } from './templateModel';

/**
 * Defines a base class for configuration used by this app.
 */
export interface OptionsProvider {
    /**
     * Returns a set of templates currently configured.
     */
    GetTemplates() : Promise<TemplateModel[]>;
}