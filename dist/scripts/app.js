define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/app.ts":
/*!************************!*\
  !*** ./scripts/app.ts ***!
  \************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./azureHttpClient */ "./scripts/azureHttpClient.ts"), __webpack_require__(/*! ./templateLoadingProcessor */ "./scripts/templateLoadingProcessor.ts"), __webpack_require__(/*! ./uiToTemplateLoadingProcessorBinder */ "./scripts/uiToTemplateLoadingProcessorBinder.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, azureHttpClient_1, templateLoadingProcessor_1, uiToTemplateLoadingProcessorBinder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    // Create a handler which handles the embedded work item field.
    var embdeddedInWorkItemFormProvider = function () {
        return {
            onLoaded: function (workItemLoadedArgs) {
                VSS.require(["scripts/app", "VSS/Service", "TFS/WorkItemTracking/RestClient"], function (app, vssService, restClient) {
                    var witClient = vssService.getCollectionClient(restClient.WorkItemTrackingHttpClient);
                    var webContext = VSS.getWebContext();
                    var httpClient = new azureHttpClient_1.AzureHttpClient(webContext.account.id, // Organisation 'danieljeffries'
                    webContext.project.id, // Project 'Azure Web Extensions'
                    witClient);
                    var templateLoadingProcessor = new templateLoadingProcessor_1.TemplateLoadingProcessor(httpClient, workItemLoadedArgs.id.toString());
                    var uiBinder = new uiToTemplateLoadingProcessorBinder_1.UIToTemplateLoadingProcessorBinder(new StaticTemplateProvider(), templateLoadingProcessor);
                    uiBinder.LoadSelect('sel');
                    uiBinder.AssignButton('btn');
                });
            }
        };
    };
    // Create a handler which handles the menu items.
    var actionMenuProvider = function () {
        return {
            execute: function (actionContext) {
            }
        };
    };
    // Register the handlers. These refer, and must match, the contributor IDs in vss-extensoin.json.
    VSS.register('embdeddedInWorkItemForm', embdeddedInWorkItemFormProvider);
    VSS.register('actionMenu', actionMenuProvider);
    // Static, temporary configuration to use in debugging/pre-configuration work.
    var StaticTemplateProvider = /** @class */ (function () {
        function StaticTemplateProvider() {
        }
        StaticTemplateProvider.prototype.GetTemplates = function () {
            return [
                {
                    TemplateName: 'Example Template',
                    Children: [
                        {
                            IsExisting: false,
                            WorkItemNumber: '',
                            Title: 'Development',
                            Attributes: []
                        },
                        {
                            IsExisting: false,
                            WorkItemNumber: '',
                            Title: 'Test',
                            Attributes: []
                        },
                        {
                            IsExisting: false,
                            WorkItemNumber: '',
                            Title: 'Sign Off',
                            Attributes: []
                        },
                        {
                            IsExisting: true,
                            WorkItemNumber: '1',
                            Title: 'First Work Item',
                            Attributes: []
                        }
                    ]
                }
            ];
        };
        return StaticTemplateProvider;
    }());
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./scripts/azureHttpClient.ts":
/*!************************************!*\
  !*** ./scripts/azureHttpClient.ts ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.AzureHttpClient = void 0;
    /**
     * A client to be used when communicating with Azure REST APIs.
     */
    var AzureHttpClient = /** @class */ (function () {
        /**
         * Creates a new instance of AzureHttpClient.
         *
         * @param organisation - Organisation ID used in some of the REST requests.
         * @param project - Project ID used in some of the REST requests.
         * @param workItemClient - Underlying work item client used to issue REST requests to Azure.
         */
        function AzureHttpClient(organisation, project, workItemClient) {
            this.organisation = organisation;
            this.project = project;
            this.workItemClient = workItemClient;
        }
        /**
         * Issues a create task request to Azure.
         * @param existingTaskId - ID of the existing work item to which this task is linked, as a parent-child link.
         * @param templatePartModel - Template of the task to add.
         * @returns ID of the newly created task.
         */
        AzureHttpClient.prototype.CreateTask = function (existingTaskId, templatePartModel) {
            return __awaiter(this, void 0, void 0, function () {
                var parent, newWorkItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workItemClient.getWorkItem(Number.parseInt(existingTaskId), ["System.AreaPath", "System.IterationPath"]).then(function (workItem) {
                                return workItem;
                            })];
                        case 1:
                            parent = _a.sent();
                            return [4 /*yield*/, this.workItemClient.createWorkItem([
                                    {
                                        "op": "add",
                                        "path": "/fields/System.Title",
                                        "value": templatePartModel.Title
                                    },
                                    {
                                        'op': 'add',
                                        'path': '/fields/System.AreaPath',
                                        'value': parent.fields["System.AreaPath"]
                                    },
                                    {
                                        'op': 'add',
                                        'path': '/fields/System.IterationPath',
                                        'value': parent.fields["System.IterationPath"]
                                    },
                                    {
                                        'op': 'add',
                                        'path': '/relations/-',
                                        'value': {
                                            'rel': 'System.LinkTypes.Hierarchy-Reverse',
                                            'url': parent.url
                                        }
                                    }
                                ], this.project, 'Task', false, false, false)];
                        case 2:
                            newWorkItem = _a.sent();
                            return [2 /*return*/, newWorkItem.id.toString()];
                    }
                });
            });
        };
        return AzureHttpClient;
    }());
    exports.AzureHttpClient = AzureHttpClient;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./scripts/templateLoadingProcessor.ts":
/*!*********************************************!*\
  !*** ./scripts/templateLoadingProcessor.ts ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.TemplateLoadingProcessor = void 0;
    /**
     * A processor used to load children from a given template.
     */
    var TemplateLoadingProcessor = /** @class */ (function () {
        /**
         * Creates a new instance of TemplateLoadingProcessor.
         * @param azureHttpClient - Azure client used to interact with Azure APIs.
         * @param originalTaskNumber - Task number for the currently selected work item.
         */
        function TemplateLoadingProcessor(azureHttpClient, originalTaskNumber) {
            this.azureHttpClient = azureHttpClient;
            this.originalTaskNumber = originalTaskNumber;
        }
        /**
         * Insert new/existing links to new/existing items as per given template, associated to the currently selected work item.
         * @param templateModel - Template to insert.
         */
        TemplateLoadingProcessor.prototype.LoadChildren = function (templateModel) {
            return __awaiter(this, void 0, void 0, function () {
                var asyncTasks;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            asyncTasks = templateModel.Children.filter(function (task) { return __awaiter(_this, void 0, void 0, function () {
                                var workItemNumber;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            workItemNumber = task.WorkItemNumber;
                                            if (!!task.IsExisting) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.azureHttpClient.CreateTask(this.originalTaskNumber, task)];
                                        case 1:
                                            workItemNumber = _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/, 1];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(asyncTasks)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return TemplateLoadingProcessor;
    }());
    exports.TemplateLoadingProcessor = TemplateLoadingProcessor;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./scripts/uiToTemplateLoadingProcessorBinder.ts":
/*!*******************************************************!*\
  !*** ./scripts/uiToTemplateLoadingProcessorBinder.ts ***!
  \*******************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.UIToTemplateLoadingProcessorBinder = void 0;
    /**
     * A class which can be used to bind a UI to template loading processes.
     */
    var UIToTemplateLoadingProcessorBinder = /** @class */ (function () {
        /**
         * Creates a new instance of UIToTemplateLoadingProcessorBinder.
         * @param optionsProvider - Template configuration from which to read template metadata.
         * @param templateLoadingProcessor - Processor containing actions which will be ran on UI invocations.
         */
        function UIToTemplateLoadingProcessorBinder(optionsProvider, templateLoadingProcessor) {
            this.optionsProvider = optionsProvider;
            this.templateLoadingProcessor = templateLoadingProcessor;
        }
        /**
         * Loads a select box with options that can be used to choose from configured templates.
         * @param className - Class name to use when using jquery to select a single select box target. Will throw if there are zero targets.
         */
        UIToTemplateLoadingProcessorBinder.prototype.LoadSelect = function (className) {
            this.EnsureOptionsAreLoaded();
            var jqueryElement = $("." + className);
            this.select = jqueryElement[0];
            this.templates.forEach(function (template) {
                jqueryElement.append($('<option>', {
                    value: template.TemplateName,
                    text: template.TemplateName
                }));
            });
        };
        /**
         * Binds a given button to execute LoadChildren (on Processor) when clicked. This call must proceed LoadSelect.
         * @param className - Class name to use when using jquery to select any matching buttons.
         */
        UIToTemplateLoadingProcessorBinder.prototype.AssignButton = function (className) {
            var _this = this;
            var thisRef = this;
            $("." + className).off('click');
            $("." + className).on('click', function () {
                var targetTemplate = thisRef.templates[thisRef.select.selectedIndex];
                _this.templateLoadingProcessor.LoadChildren(targetTemplate);
            });
        };
        /**
         * Ensures that this.templates are available.
         */
        UIToTemplateLoadingProcessorBinder.prototype.EnsureOptionsAreLoaded = function () {
            if (this.templates !== undefined)
                return;
            this.templates = this.optionsProvider.GetTemplates();
        };
        return UIToTemplateLoadingProcessorBinder;
    }());
    exports.UIToTemplateLoadingProcessorBinder = UIToTemplateLoadingProcessorBinder;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/app.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlLy4vc2NyaXB0cy9hcHAudHMiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvLi9zY3JpcHRzL2F6dXJlSHR0cENsaWVudC50cyIsIndlYnBhY2s6Ly92c3RzLWV4dGVuc2lvbi10cy1zZWVkLXNpbXBsZS8uL3NjcmlwdHMvdGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yLnRzIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlLy4vc2NyaXB0cy91aVRvVGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yQmluZGVyLnRzIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZzcy13ZWItZXh0ZW5zaW9uLXNka1wiIC8+XHJcbmltcG9ydCAqIGFzIEV4dGVuc2lvbkNvbnRyYWN0cyBmcm9tICdURlMvV29ya0l0ZW1UcmFja2luZy9FeHRlbnNpb25Db250cmFjdHMnO1xyXG5pbXBvcnQgeyBBenVyZUh0dHBDbGllbnQgfSBmcm9tICcuL2F6dXJlSHR0cENsaWVudCc7XHJcbmltcG9ydCB7IElPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2lPcHRpb25zUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUxvYWRpbmdQcm9jZXNzb3IgfSBmcm9tICcuL3RlbXBsYXRlTG9hZGluZ1Byb2Nlc3Nvcic7XHJcbmltcG9ydCB7IFRlbXBsYXRlTW9kZWwgfSBmcm9tICcuL3RlbXBsYXRlTW9kZWwnO1xyXG5pbXBvcnQgeyBVSVRvVGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yQmluZGVyIH0gZnJvbSAnLi91aVRvVGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yQmluZGVyJztcclxuXHJcbi8vIENyZWF0ZSBhIGhhbmRsZXIgd2hpY2ggaGFuZGxlcyB0aGUgZW1iZWRkZWQgd29yayBpdGVtIGZpZWxkLlxyXG52YXIgZW1iZGVkZGVkSW5Xb3JrSXRlbUZvcm1Qcm92aWRlciA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25Mb2FkZWQ6ICh3b3JrSXRlbUxvYWRlZEFyZ3M6IEV4dGVuc2lvbkNvbnRyYWN0cy5JV29ya0l0ZW1Mb2FkZWRBcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIFZTUy5yZXF1aXJlKFtcInNjcmlwdHMvYXBwXCIsIFwiVlNTL1NlcnZpY2VcIiwgXCJURlMvV29ya0l0ZW1UcmFja2luZy9SZXN0Q2xpZW50XCJdLCBmdW5jdGlvbiAoYXBwLCB2c3NTZXJ2aWNlLCByZXN0Q2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2l0Q2xpZW50ID0gdnNzU2VydmljZS5nZXRDb2xsZWN0aW9uQ2xpZW50KHJlc3RDbGllbnQuV29ya0l0ZW1UcmFja2luZ0h0dHBDbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlYkNvbnRleHQgPSBWU1MuZ2V0V2ViQ29udGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBodHRwQ2xpZW50ID0gbmV3IEF6dXJlSHR0cENsaWVudChcclxuICAgICAgICAgICAgICAgICAgICB3ZWJDb250ZXh0LmFjY291bnQuaWQsIC8vIE9yZ2FuaXNhdGlvbiAnZGFuaWVsamVmZnJpZXMnXHJcbiAgICAgICAgICAgICAgICAgICAgd2ViQ29udGV4dC5wcm9qZWN0LmlkLCAvLyBQcm9qZWN0ICdBenVyZSBXZWIgRXh0ZW5zaW9ucydcclxuICAgICAgICAgICAgICAgICAgICB3aXRDbGllbnRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yID0gbmV3IFRlbXBsYXRlTG9hZGluZ1Byb2Nlc3NvcihcclxuICAgICAgICAgICAgICAgICAgICBodHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtTG9hZGVkQXJncy5pZC50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdWlCaW5kZXIgPSBuZXcgVUlUb1RlbXBsYXRlTG9hZGluZ1Byb2Nlc3NvckJpbmRlcihcclxuICAgICAgICAgICAgICAgICAgICBuZXcgU3RhdGljVGVtcGxhdGVQcm92aWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlTG9hZGluZ1Byb2Nlc3NvclxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB1aUJpbmRlci5Mb2FkU2VsZWN0KCdzZWwnKTtcclxuICAgICAgICAgICAgICAgIHVpQmluZGVyLkFzc2lnbkJ1dHRvbignYnRuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vIENyZWF0ZSBhIGhhbmRsZXIgd2hpY2ggaGFuZGxlcyB0aGUgbWVudSBpdGVtcy5cclxudmFyIGFjdGlvbk1lbnVQcm92aWRlciA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oYWN0aW9uQ29udGV4dCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLy8gUmVnaXN0ZXIgdGhlIGhhbmRsZXJzLiBUaGVzZSByZWZlciwgYW5kIG11c3QgbWF0Y2gsIHRoZSBjb250cmlidXRvciBJRHMgaW4gdnNzLWV4dGVuc29pbi5qc29uLlxyXG5WU1MucmVnaXN0ZXIoJ2VtYmRlZGRlZEluV29ya0l0ZW1Gb3JtJywgZW1iZGVkZGVkSW5Xb3JrSXRlbUZvcm1Qcm92aWRlcik7XHJcblZTUy5yZWdpc3RlcignYWN0aW9uTWVudScsIGFjdGlvbk1lbnVQcm92aWRlcik7XHJcblxyXG4vLyBTdGF0aWMsIHRlbXBvcmFyeSBjb25maWd1cmF0aW9uIHRvIHVzZSBpbiBkZWJ1Z2dpbmcvcHJlLWNvbmZpZ3VyYXRpb24gd29yay5cclxuY2xhc3MgU3RhdGljVGVtcGxhdGVQcm92aWRlciBpbXBsZW1lbnRzIElPcHRpb25zUHJvdmlkZXIge1xyXG4gICAgR2V0VGVtcGxhdGVzKCk6IFRlbXBsYXRlTW9kZWxbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGVtcGxhdGVOYW1lOiAnRXhhbXBsZSBUZW1wbGF0ZScsXHJcbiAgICAgICAgICAgICAgICBDaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXNFeGlzdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmtJdGVtTnVtYmVyOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGl0bGU6ICdEZXZlbG9wbWVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnVGVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnU2lnbiBPZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc0V4aXN0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaXRsZTogJ0ZpcnN0IFdvcmsgSXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFdvcmtJdGVtVHJhY2tpbmdIdHRwQ2xpZW50IH0gZnJvbSBcIlRGUy9Xb3JrSXRlbVRyYWNraW5nL1Jlc3RDbGllbnRcIjtcclxuaW1wb3J0IHsgVGVtcGxhdGVQYXJ0TW9kZWwgfSBmcm9tIFwiLi90ZW1wbGF0ZVBhcnRNb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xpZW50IHRvIGJlIHVzZWQgd2hlbiBjb21tdW5pY2F0aW5nIHdpdGggQXp1cmUgUkVTVCBBUElzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF6dXJlSHR0cENsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgQXp1cmVIdHRwQ2xpZW50LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb3JnYW5pc2F0aW9uIC0gT3JnYW5pc2F0aW9uIElEIHVzZWQgaW4gc29tZSBvZiB0aGUgUkVTVCByZXF1ZXN0cy5cclxuICAgICAqIEBwYXJhbSBwcm9qZWN0IC0gUHJvamVjdCBJRCB1c2VkIGluIHNvbWUgb2YgdGhlIFJFU1QgcmVxdWVzdHMuXHJcbiAgICAgKiBAcGFyYW0gd29ya0l0ZW1DbGllbnQgLSBVbmRlcmx5aW5nIHdvcmsgaXRlbSBjbGllbnQgdXNlZCB0byBpc3N1ZSBSRVNUIHJlcXVlc3RzIHRvIEF6dXJlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgcHJpdmF0ZSBvcmdhbmlzYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHByb2plY3Q6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHdvcmtJdGVtQ2xpZW50OiBXb3JrSXRlbVRyYWNraW5nSHR0cENsaWVudCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzc3VlcyBhIGNyZWF0ZSB0YXNrIHJlcXVlc3QgdG8gQXp1cmUuXHJcbiAgICAgKiBAcGFyYW0gZXhpc3RpbmdUYXNrSWQgLSBJRCBvZiB0aGUgZXhpc3Rpbmcgd29yayBpdGVtIHRvIHdoaWNoIHRoaXMgdGFzayBpcyBsaW5rZWQsIGFzIGEgcGFyZW50LWNoaWxkIGxpbmsuXHJcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVQYXJ0TW9kZWwgLSBUZW1wbGF0ZSBvZiB0aGUgdGFzayB0byBhZGQuXHJcbiAgICAgKiBAcmV0dXJucyBJRCBvZiB0aGUgbmV3bHkgY3JlYXRlZCB0YXNrLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgQ3JlYXRlVGFzayhleGlzdGluZ1Rhc2tJZDogc3RyaW5nLCB0ZW1wbGF0ZVBhcnRNb2RlbDogVGVtcGxhdGVQYXJ0TW9kZWwpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIC8vIFBPU1QgaHR0cHM6Ly9kZXYuYXp1cmUuY29tL3tvcmdhbml6YXRpb259L3twcm9qZWN0fS9fYXBpcy93aXQvd29ya2l0ZW1zLyR7dHlwZX0/YXBpLXZlcnNpb249Ny4wXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9sZWFybi5taWNyb3NvZnQuY29tL2VuLXVzL3Jlc3QvYXBpL2F6dXJlL2Rldm9wcy93aXQvd29yay1pdGVtcy9jcmVhdGU/dmlldz1henVyZS1kZXZvcHMtcmVzdC03LjAmdGFicz1IVFRQXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IGF3YWl0IHRoaXMud29ya0l0ZW1DbGllbnQuZ2V0V29ya0l0ZW0oXHJcbiAgICAgICAgICAgIE51bWJlci5wYXJzZUludChleGlzdGluZ1Rhc2tJZCksIFxyXG4gICAgICAgICAgICBbXCJTeXN0ZW0uQXJlYVBhdGhcIiwgXCJTeXN0ZW0uSXRlcmF0aW9uUGF0aFwiXSkudGhlbih3b3JrSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbmV3V29ya0l0ZW0gPSBhd2FpdCB0aGlzLndvcmtJdGVtQ2xpZW50LmNyZWF0ZVdvcmtJdGVtKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwib3BcIjogXCJhZGRcIixcclxuICAgICAgICAgICAgICBcInBhdGhcIjogXCIvZmllbGRzL1N5c3RlbS5UaXRsZVwiLFxyXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogdGVtcGxhdGVQYXJ0TW9kZWwuVGl0bGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ29wJzogJ2FkZCcsXHJcbiAgICAgICAgICAgICAgICAncGF0aCc6ICcvZmllbGRzL1N5c3RlbS5BcmVhUGF0aCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiBwYXJlbnQuZmllbGRzW1wiU3lzdGVtLkFyZWFQYXRoXCJdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdvcCc6ICdhZGQnLFxyXG4gICAgICAgICAgICAgICAgJ3BhdGgnOiAnL2ZpZWxkcy9TeXN0ZW0uSXRlcmF0aW9uUGF0aCcsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiBwYXJlbnQuZmllbGRzW1wiU3lzdGVtLkl0ZXJhdGlvblBhdGhcIl1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ29wJzogJ2FkZCcsXHJcbiAgICAgICAgICAgICAgICAncGF0aCc6ICcvcmVsYXRpb25zLy0nLFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICdyZWwnOiAnU3lzdGVtLkxpbmtUeXBlcy5IaWVyYXJjaHktUmV2ZXJzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHBhcmVudC51cmxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXSwgdGhpcy5wcm9qZWN0LCAnVGFzaycsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3V29ya0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEF6dXJlSHR0cENsaWVudCB9IGZyb20gXCIuL2F6dXJlSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZU1vZGVsIH0gZnJvbSBcIi4vdGVtcGxhdGVNb2RlbFwiO1xyXG5cclxuLyoqXHJcbiAqIEEgcHJvY2Vzc29yIHVzZWQgdG8gbG9hZCBjaGlsZHJlbiBmcm9tIGEgZ2l2ZW4gdGVtcGxhdGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBUZW1wbGF0ZUxvYWRpbmdQcm9jZXNzb3IuXHJcbiAgICAgKiBAcGFyYW0gYXp1cmVIdHRwQ2xpZW50IC0gQXp1cmUgY2xpZW50IHVzZWQgdG8gaW50ZXJhY3Qgd2l0aCBBenVyZSBBUElzLlxyXG4gICAgICogQHBhcmFtIG9yaWdpbmFsVGFza051bWJlciAtIFRhc2sgbnVtYmVyIGZvciB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHdvcmsgaXRlbS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBhenVyZUh0dHBDbGllbnQ6IEF6dXJlSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIG9yaWdpbmFsVGFza051bWJlcjogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydCBuZXcvZXhpc3RpbmcgbGlua3MgdG8gbmV3L2V4aXN0aW5nIGl0ZW1zIGFzIHBlciBnaXZlbiB0ZW1wbGF0ZSwgYXNzb2NpYXRlZCB0byB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHdvcmsgaXRlbS5cclxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZU1vZGVsIC0gVGVtcGxhdGUgdG8gaW5zZXJ0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgTG9hZENoaWxkcmVuKHRlbXBsYXRlTW9kZWw6IFRlbXBsYXRlTW9kZWwpIDogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICB2YXIgYXN5bmNUYXNrcyA9IHRlbXBsYXRlTW9kZWwuQ2hpbGRyZW4uZmlsdGVyKGFzeW5jIHRhc2sgPT4ge1xyXG4gICAgICAgICAgICB2YXIgd29ya0l0ZW1OdW1iZXIgPSB0YXNrLldvcmtJdGVtTnVtYmVyO1xyXG4gICAgICAgICAgICBpZiAoIXRhc2suSXNFeGlzdGluZykge1xyXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1OdW1iZXIgPSBhd2FpdCB0aGlzLmF6dXJlSHR0cENsaWVudC5DcmVhdGVUYXNrKHRoaXMub3JpZ2luYWxUYXNrTnVtYmVyLCB0YXNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKGFzeW5jVGFza3MpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVGVtcGxhdGVNb2RlbCB9IGZyb20gJy4vdGVtcGxhdGVNb2RlbCc7XHJcbmltcG9ydCB7IElPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2lPcHRpb25zUHJvdmlkZXInO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUxvYWRpbmdQcm9jZXNzb3IgfSBmcm9tICcuL3RlbXBsYXRlTG9hZGluZ1Byb2Nlc3Nvcic7XHJcblxyXG4vKipcclxuICogQSBjbGFzcyB3aGljaCBjYW4gYmUgdXNlZCB0byBiaW5kIGEgVUkgdG8gdGVtcGxhdGUgbG9hZGluZyBwcm9jZXNzZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVUlUb1RlbXBsYXRlTG9hZGluZ1Byb2Nlc3NvckJpbmRlciB7XHJcbiAgICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVNb2RlbFtdO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3Q6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgVUlUb1RlbXBsYXRlTG9hZGluZ1Byb2Nlc3NvckJpbmRlci5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zUHJvdmlkZXIgLSBUZW1wbGF0ZSBjb25maWd1cmF0aW9uIGZyb20gd2hpY2ggdG8gcmVhZCB0ZW1wbGF0ZSBtZXRhZGF0YS5cclxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZUxvYWRpbmdQcm9jZXNzb3IgLSBQcm9jZXNzb3IgY29udGFpbmluZyBhY3Rpb25zIHdoaWNoIHdpbGwgYmUgcmFuIG9uIFVJIGludm9jYXRpb25zLiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uc1Byb3ZpZGVyOiBJT3B0aW9uc1Byb3ZpZGVyLFxyXG4gICAgICAgIHByaXZhdGUgdGVtcGxhdGVMb2FkaW5nUHJvY2Vzc29yOlRlbXBsYXRlTG9hZGluZ1Byb2Nlc3Nvcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgc2VsZWN0IGJveCB3aXRoIG9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaG9vc2UgZnJvbSBjb25maWd1cmVkIHRlbXBsYXRlcy5cclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWUgLSBDbGFzcyBuYW1lIHRvIHVzZSB3aGVuIHVzaW5nIGpxdWVyeSB0byBzZWxlY3QgYSBzaW5nbGUgc2VsZWN0IGJveCB0YXJnZXQuIFdpbGwgdGhyb3cgaWYgdGhlcmUgYXJlIHplcm8gdGFyZ2V0cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIExvYWRTZWxlY3QoY2xhc3NOYW1lOiBzdHJpbmcpIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnN1cmVPcHRpb25zQXJlTG9hZGVkKCk7XHJcblxyXG4gICAgICAgIHZhciBqcXVlcnlFbGVtZW50ID0gJChgLiR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ID0ganF1ZXJ5RWxlbWVudFswXTtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKHRlbXBsYXRlID0+IHtcclxuICAgICAgICAgICAganF1ZXJ5RWxlbWVudC5hcHBlbmQoJCgnPG9wdGlvbj4nLCB7IFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLlRlbXBsYXRlTmFtZSxcclxuICAgICAgICAgICAgICAgIHRleHQgOiB0ZW1wbGF0ZS5UZW1wbGF0ZU5hbWVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYSBnaXZlbiBidXR0b24gdG8gZXhlY3V0ZSBMb2FkQ2hpbGRyZW4gKG9uIFByb2Nlc3Nvcikgd2hlbiBjbGlja2VkLiBUaGlzIGNhbGwgbXVzdCBwcm9jZWVkIExvYWRTZWxlY3QuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lIC0gQ2xhc3MgbmFtZSB0byB1c2Ugd2hlbiB1c2luZyBqcXVlcnkgdG8gc2VsZWN0IGFueSBtYXRjaGluZyBidXR0b25zLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQXNzaWduQnV0dG9uKGNsYXNzTmFtZTogc3RyaW5nKSA6IHZvaWQge1xyXG4gICAgICAgIHZhciB0aGlzUmVmID0gdGhpcztcclxuICAgICAgICAkKGAuJHtjbGFzc05hbWV9YCkub2ZmKCdjbGljaycpO1xyXG4gICAgICAgICQoYC4ke2NsYXNzTmFtZX1gKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRUZW1wbGF0ZSA9IHRoaXNSZWYudGVtcGxhdGVzW3RoaXNSZWYuc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlTG9hZGluZ1Byb2Nlc3Nvci5Mb2FkQ2hpbGRyZW4odGFyZ2V0VGVtcGxhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5zdXJlcyB0aGF0IHRoaXMudGVtcGxhdGVzIGFyZSBhdmFpbGFibGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRW5zdXJlT3B0aW9uc0FyZUxvYWRlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMub3B0aW9uc1Byb3ZpZGVyLkdldFRlbXBsYXRlcygpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9