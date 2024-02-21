import { IDialogOptions, IHostPageLayoutService } from "azure-devops-extension-api";
import { Mock, It, Times } from "moq.ts";
import { CustomDialogHandler } from "./customDialogHandler";
import { ISdkProxy } from "../proxies";
import { IExtensionContext } from "azure-devops-extension-sdk";
//import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "./templateModel";
import { Observable } from "azure-devops-ui/Core/Observable";
import { __extends, __spreadArrays } from "tslib";

function generateTemplateModel() : TemplateModel {
    return {
        id: '',
        templateName: '',
        description: '',
        children: [],
        workItemDescription: {
            toApply: true,
            value: ''
        }
    };
}

describe('Custom Dialog Handler', () => {
    var hostPageLayoutService: Mock<IHostPageLayoutService>;
    var sdk: Mock<ISdkProxy>;

    beforeEach(() => {
        hostPageLayoutService = new Mock<IHostPageLayoutService>();
        sdk = new Mock<ISdkProxy>();

        var extensionContextMock = new Mock<IExtensionContext>()
            .setup(x => x.id)
            .returns('unit_test_extension_id');

        sdk.setup(x => x.getExtensionContext())
            .returns(extensionContextMock.object());
    });

    test('showConfigurationDialog should call openCustomDialog', () => {
        hostPageLayoutService
            .setup(x => x.openCustomDialog(It.IsAny<string>(), It.IsAny<IDialogOptions<unknown>|undefined>()))
            .callback(() => {});

        new CustomDialogHandler(hostPageLayoutService.object(), sdk.object())
            .showConfigurationDialog();

        hostPageLayoutService.verify(
            x => x.openCustomDialog(
                It.Is<string>(str => str === 'unit_test_extension_id.configurationDialog'), 
                It.Is<IDialogOptions<unknown>>(options => 
                    options.title === 'CodeBoost Configuration')),
            Times.Exactly(1));
    });

    test('showWorkItemSelector should open custom dialog', () => {
        hostPageLayoutService
            .setup(x => x.openCustomDialog(It.IsAny<string>(), It.IsAny<IDialogOptions<unknown>|undefined>()))
            .callback(() => {});

        var templateModel = generateTemplateModel();
        var observerable = new Observable<TemplateModel>();
        observerable.notify(templateModel, 'Unit test seed', true);

        new CustomDialogHandler(hostPageLayoutService.object(), sdk.object())
            .showWorkItemSelector(observerable, templateModel);

        hostPageLayoutService.verify(
            x => x.openCustomDialog(
                It.Is<string>(str => str === 'Xunit_test_extension_id.workItemTaskSelector'), 
                It.Is<IDialogOptions<unknown>>(options => 
                    options.title === 'CodeBoost Configuration')),
            Times.Exactly(1));
    });

    test('showWorkItemSelector should update given TemplateModel on changes', () => {

    });

    test('showWorkItemSelector should set onClose to clear children', () => {

    });

    test('showTemplateDialog should open custom dialog', () => {

    });
});