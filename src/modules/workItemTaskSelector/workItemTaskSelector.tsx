import "es6-promise/auto";
import * as SDK from 'azure-devops-extension-sdk';
import React from "react";
import ReactDOM from "react-dom";
import { WorkItemTaskSelectorContent } from "./workItemTaskSelectorContent";

/**
 * SDK entrypoint to load the work item task selector UI.
 */
SDK.init().then(async () => {
    var nestedFormContent = <WorkItemTaskSelectorContent />;
        
    ReactDOM.render(
        nestedFormContent, 
        document.getElementById("root"));
    
    await SDK.notifyLoadSucceeded();
    SDK.resize(440, 400);
});
