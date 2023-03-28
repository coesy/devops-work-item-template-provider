import Dialog = require("VSS/SDK/Services/Dialogs");

/*interface IHostDialogOptions {

    height?: number;
    width?: number;
    draggable?: boolean;
    resizable?: boolean;
    title?: string;
    modal?: boolean;
    buttons?: IDictionaryStringTo<any>;
    open?: Function;
    close?: Function;
    getDialogResult?: () => any;
    okCallback?: (result: any) => void;
    cancelCallback?: Function;
    okText?: string;
    cancelText?: string;
}*/


export class CustomDialog
{
public async ShowDialog(title) {

    var createTemplateForm;
    var extensionCtx = VSS.getExtensionContext();
    var contributionId = extensionCtx.publisherId + "." + extensionCtx.extensionId + ".create-template-form";

    var dialogOptions = {
        title: title, 
        width: 300, 
        height: 200, 
        resizable: false,
        getDialogResult: function() {
            // Get the result from registrationForm object
            return createTemplateForm ? createTemplateForm.getFormData() : null;
        },
        okCallback: function (result) {
            // Log the result to the console
            console.log(JSON.stringify(result));
        }
    }; 

    var dialogSvc: Dialog.HostDialogService = await VSS.getService(VSS.ServiceIds.Dialog);

    var dialog = await dialogSvc.openDialog(contributionId, dialogOptions);

    var currentInstance = await dialog.getContributionInstance("create-template-form");
            
    // Keep a reference of registration form instance (to be used previously in dialog options)
    createTemplateForm = currentInstance;
    
    // Subscribe to form input changes and update the Ok enabled state
    createTemplateForm.attachFormChanged(function(isValid) {
        dialog.updateOkButton(isValid);
    });
    
    // Set the initial ok enabled state
    createTemplateForm.isFormValid().then(function (isValid) {
        dialog.updateOkButton(isValid);
    });
                      
    }
}