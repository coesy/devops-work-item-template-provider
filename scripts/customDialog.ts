import Dialog = require("VSS/SDK/Services/Dialogs");

export class CustomDialog
{
public ShowDialog(message) {

    var dialogOptions = {
        title: "Workitem Links",
        width: 300,
        height: 200,
        resizable: false,
    };

    VSS.getService(VSS.ServiceIds.Dialog).then(function (dialogSvc: Dialog.HostDialogService) {

        dialogSvc.openMessageDialog(message, dialogOptions)
            .then(function (dialog) {
                //
            }, function (dialog) {
                //
            });
    });

}
}