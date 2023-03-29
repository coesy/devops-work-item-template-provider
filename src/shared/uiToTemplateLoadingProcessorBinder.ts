import { TemplateModel } from './templateModel';
import { IOptionsProvider } from './iOptionsProvider';
import { TemplateLoadingProcessor } from './templateLoadingProcessor';

/**
 * A class which can be used to bind a UI to template loading processes.
 */
export class UIToTemplateLoadingProcessorBinder {
    private templates: TemplateModel[] = [];
    private select: any;

    /**
     * Creates a new instance of UIToTemplateLoadingProcessorBinder.
     * @param optionsProvider - Template configuration from which to read template metadata.
     * @param templateLoadingProcessor - Processor containing actions which will be ran on UI invocations. 
     */
    public constructor(
        private optionsProvider: IOptionsProvider,
        private templateLoadingProcessor:TemplateLoadingProcessor) {

    }

    /**
     * Loads a select box with options that can be used to choose from configured templates.
     * @param className - Class name to use when using jquery to select a single select box target. Will throw if there are zero targets.
     */
    public async LoadSelect(className: string) {
        await this.EnsureOptionsAreLoaded();
        
        if (this.templates != null) {
            var jqueryElement = $(`.${className}`);
            this.select = jqueryElement[0];
            jqueryElement.empty();
            this.templates.forEach(template => {
                jqueryElement.append($('<option>', { 
                    value: template.TemplateName,
                    text : template.TemplateName
                }));
            });
        }
    }

    /**
     * Binds a given button to execute LoadChildren (on Processor) when clicked. This call must proceed LoadSelect.
     * @param className - Class name to use when using jquery to select any matching buttons.
     */
    public AssignButton(className: string) : void {
        var thisRef = this;
        $(`.${className}`).off('click');
        $(`.${className}`).on('click', () => {
            var targetTemplate = thisRef.templates[thisRef.select.selectedIndex];
            this.templateLoadingProcessor.LoadChildren(targetTemplate);
        });
    }

    /**
     * Binds a given button to execute Inserting a TestRecord (on Processor) when clicked. This call must proceed LoadSelect.
     * @param className - Class name to use when using jquery to select any matching buttons.
     */
    public AssignTestButton(className: string) : void {
        var thisRef = this;
        $(`.${className}`).off('click');
        $(`.${className}`).on('click', () => {
            thisRef.templateLoadingProcessor.InsertTestRecord();
        });
        this.LoadSelect('sel');
    }

    /**
     * Ensures that this.templates are available.
     */
    private async EnsureOptionsAreLoaded() {
        if (this.templates.length > 0) return;

        try {
            this.templates = await this.optionsProvider.GetTemplates();
        }
        catch (exception: any) {
            return;
        }
    }
}