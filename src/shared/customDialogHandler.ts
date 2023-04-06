import { IDialogOptions, IHostPageLayoutService } from 'azure-devops-extension-api';
import * as SDK from 'azure-devops-extension-sdk/SDK';

/**
 * 
 */
export class CustomDialogHandler {
    constructor (private hostPageLayoutService: IHostPageLayoutService ) {
        
    }

    public Show() : void {
        //this.hostPageLayoutService.setFullScreenMode(true);
        //this.hostPageLayoutService.openPanel(SDK.getExtensionContext().id + '.configurationDialog', {
        //    title: 'CodeBoost Configuration'
        //});

        var dialogOptions :IDialogOptions<undefined> = {};
        dialogOptions.title = 'CodeBoost Configuration';
        dialogOptions.lightDismiss = true;
        dialogOptions.configuration = {
            width: 1200,
            height: 800
        };

        this.hostPageLayoutService.openCustomDialog(SDK.getExtensionContext().id + '.configurationDialog', dialogOptions);
    }
}

// FROM 'customDialog.html'

//var createTemplateForm = (function() {
//    var callbacks = [];
//    
//    function inputChanged() {
//        // Execute registered callbacks
//        for(var i = 0; i < callbacks.length; i++) {
//            callbacks[i](isValid());
//        }
//    }
//    
//    function isValid() {
//        // Check whether form is valid or not
//        return !!(name.value);
//    }
//    
//    function getFormData() {
//        // Get form values
//        return {
//            name: name.value,
//            isExisting: isExisting.value,
//            email: email.value  
//        };
//    }
//
//    var name = document.getElementById("templateName");
//    var isExisting = document.getElementById("existing");
//    
//    name.addEventListener("change", inputChanged);
//    isExisting.addEventListener("childType", inputChanged);
//                    
//    return {
//        isFormValid: function() {
//            return isValid();   
//        },
//        getFormData: function() {
//            return getFormData();
//        },
//        attachFormChanged: function(cb) {
//             callbacks.push(cb);
//        }
//    };
//})();

// FROM 'customDialog.ts'

//import { Dialog } from 'azure-devops-extension-sdk/SDK';


////import Dialog = require("VSS/SDK/Services/Dialogs");
//
////import { Dialog } from '../node_modules/azure-devops-extension-sdk/SDK';
//
///*interface IHostDialogOptions {
//
//    height?: number;
//    width?: number;
//    draggable?: boolean;
//    resizable?: boolean;
//    title?: string;
//    modal?: boolean;
//    buttons?: IDictionaryStringTo<any>;
//    open?: Function;
//    close?: Function;
//    getDialogResult?: () => any;
//    okCallback?: (result: any) => void;
//    cancelCallback?: Function;
//    okText?: string;
//    cancelText?: string;
//}*/
//
//
//export class CustomDialog
//{
//public async ShowDialog(title) {
//
//    var createTemplateForm;
//    var extensionCtx = VSS.getExtensionContext();
//    var contributionId = extensionCtx.publisherId + "." + extensionCtx.extensionId + ".create-template-form";
//
//    var dialogOptions = {
//        title: title, 
//        width: 300, 
//        height: 200, 
//        resizable: false,
//        getDialogResult: function() {
//            // Get the result from registrationForm object
//            return createTemplateForm ? createTemplateForm.getFormData() : null;
//        },
//        okCallback: function (result) {
//            // Log the result to the console
//            console.log(JSON.stringify(result));
//        }
//    }; 
//
//    var dialogSvc: Dialog.HostDialogService = await VSS.getService(VSS.ServiceIds.Dialog);
//
//    var dialog = await dialogSvc.openDialog(contributionId, dialogOptions);
//
//    var currentInstance = await dialog.getContributionInstance("create-template-form");
//            
//    // Keep a reference of registration form instance (to be used previously in dialog options)
//    createTemplateForm = currentInstance;
//    
//    // Subscribe to form input changes and update the Ok enabled state
//    createTemplateForm.attachFormChanged(function(isValid) {
//        dialog.updateOkButton(isValid);
//    });
//    
//    // Set the initial ok enabled state
//    createTemplateForm.isFormValid().then(function (isValid) {
//        dialog.updateOkButton(isValid);
//    });
//                      
//    }
//}