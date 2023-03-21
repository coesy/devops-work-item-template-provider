define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/app.ts":
/*!************************!*\
  !*** ./scripts/app.ts ***!
  \************************/
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./main */ "./scripts/main.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    var provider = function () {
        return {
            onLoaded: function (workItemLoadedArgs) {
                VSS.require(["scripts/app", "VSS/Service", "TFS/WorkItemTracking/RestClient"], function (app, vssService, restClient) {
                    var witClient = vssService.getCollectionClient(restClient.WorkItemTrackingHttpClient);
                    var webContext = VSS.getWebContext();
                    var httpClient = new AzureHttpClient(webContext.account.id, // Organisation 'danieljeffries'
                    webContext.project.id, // Project 'Azure Web Extensions'
                    witClient);
                    var main = new Main(new StaticTemplateProvider(), httpClient, workItemLoadedArgs.id.toString());
                    main.LoadSelect('sel');
                    main.AssignButton('btn');
                });
            }
        };
    };
    var menuItemHandler = function () {
        return {
            execute: function (actionContext) {
                alert("Hello world");
                new main_1.MainExt();
            }
        };
    };
    VSS.register('embdeddedInWorkItemForm', provider);
    VSS.register('actionMenu', menuItemHandler);
    var AzureHttpClient = /** @class */ (function () {
        function AzureHttpClient(organisation, project, workItemClient) {
            this.organisation = organisation;
            this.project = project;
            this.workItemClient = workItemClient;
        }
        AzureHttpClient.prototype.CreateTask = function (existingTaskId, templatePartModel) {
            return __awaiter(this, void 0, void 0, function () {
                var parent, keyData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.workItemClient.getWorkItem(Number.parseInt(existingTaskId), ["System.AreaPath", "System.IterationPath"]).then(function (workItem) {
                                return workItem;
                            })];
                        case 1:
                            parent = _a.sent();
                            keyData = '';
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
                                ], this.project, 'Task', false, false, false).then(function (workItem) {
                                    debugger;
                                    keyData = workItem.id.toString();
                                }, function (rejected) {
                                    debugger;
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, keyData];
                    }
                });
            });
        };
        return AzureHttpClient;
    }());
    var Main = /** @class */ (function () {
        function Main(optionsProvider, azureHttpClient, originalTaskNumber) {
            this.optionsProvider = optionsProvider;
            this.azureHttpClient = azureHttpClient;
            this.originalTaskNumber = originalTaskNumber;
        }
        Main.prototype.LoadSelect = function (className) {
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
        Main.prototype.AssignButton = function (className) {
            var _this = this;
            var thisRef = this;
            $("." + className).off('click');
            $("." + className).on('click', function () {
                var targetTemplate = thisRef.templates[thisRef.select.selectedIndex];
                _this.LoadChildren(thisRef, targetTemplate);
            });
        };
        Main.prototype.LoadChildren = function (thisRef, templateModel) {
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
                                            return [4 /*yield*/, thisRef.azureHttpClient.CreateTask(thisRef.originalTaskNumber, task)];
                                        case 1:
                                            workItemNumber = _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/, 1];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(asyncTasks)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        };
        Main.prototype.EnsureOptionsAreLoaded = function () {
            if (this.templates !== undefined)
                return;
            this.templates = this.optionsProvider.GetTemplates();
        };
        return Main;
    }());
    var TemplateModel = /** @class */ (function () {
        function TemplateModel() {
        }
        return TemplateModel;
    }());
    var TemplatePartModel = /** @class */ (function () {
        function TemplatePartModel() {
        }
        return TemplatePartModel;
    }());
    var TemplatePartCustomAttributeModel = /** @class */ (function () {
        function TemplatePartCustomAttributeModel() {
        }
        return TemplatePartCustomAttributeModel;
    }());
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

/***/ "./scripts/main.ts":
/*!*************************!*\
  !*** ./scripts/main.ts ***!
  \*************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MainExt = void 0;
    var MainExt = /** @class */ (function () {
        function MainExt() {
            alert("Hello world");
        }
        return MainExt;
    }());
    exports.MainExt = MainExt;
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/app.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlLy4vc2NyaXB0cy9hcHAudHMiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvLi9zY3JpcHRzL21haW4udHMiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92c3RzLWV4dGVuc2lvbi10cy1zZWVkLXNpbXBsZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidnNzLXdlYi1leHRlbnNpb24tc2RrXCIgLz5cclxuaW1wb3J0ICogYXMgRXh0ZW5zaW9uQ29udHJhY3RzIGZyb20gJ1RGUy9Xb3JrSXRlbVRyYWNraW5nL0V4dGVuc2lvbkNvbnRyYWN0cyc7XHJcbmltcG9ydCB7IFdvcmtJdGVtVHJhY2tpbmdIdHRwQ2xpZW50IH0gZnJvbSAnVEZTL1dvcmtJdGVtVHJhY2tpbmcvUmVzdENsaWVudCc7XHJcbmltcG9ydCB7IE1haW5FeHQgfSBmcm9tICcuL21haW4nO1xyXG5cclxudmFyIHByb3ZpZGVyID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkxvYWRlZDogKHdvcmtJdGVtTG9hZGVkQXJnczogRXh0ZW5zaW9uQ29udHJhY3RzLklXb3JrSXRlbUxvYWRlZEFyZ3MpID0+IHtcclxuICAgICAgICAgICAgVlNTLnJlcXVpcmUoW1wic2NyaXB0cy9hcHBcIiwgXCJWU1MvU2VydmljZVwiLCBcIlRGUy9Xb3JrSXRlbVRyYWNraW5nL1Jlc3RDbGllbnRcIl0sIGZ1bmN0aW9uIChhcHAsIHZzc1NlcnZpY2UsIHJlc3RDbGllbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aXRDbGllbnQgPSB2c3NTZXJ2aWNlLmdldENvbGxlY3Rpb25DbGllbnQocmVzdENsaWVudC5Xb3JrSXRlbVRyYWNraW5nSHR0cENsaWVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2ViQ29udGV4dCA9IFZTUy5nZXRXZWJDb250ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGh0dHBDbGllbnQgPSBuZXcgQXp1cmVIdHRwQ2xpZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYkNvbnRleHQuYWNjb3VudC5pZCwgLy8gT3JnYW5pc2F0aW9uICdkYW5pZWxqZWZmcmllcydcclxuICAgICAgICAgICAgICAgICAgICB3ZWJDb250ZXh0LnByb2plY3QuaWQsIC8vIFByb2plY3QgJ0F6dXJlIFdlYiBFeHRlbnNpb25zJ1xyXG4gICAgICAgICAgICAgICAgICAgIHdpdENsaWVudFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBtYWluID0gbmV3IE1haW4oXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFN0YXRpY1RlbXBsYXRlUHJvdmlkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBodHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtTG9hZGVkQXJncy5pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIG1haW4uTG9hZFNlbGVjdCgnc2VsJyk7XHJcbiAgICAgICAgICAgICAgICBtYWluLkFzc2lnbkJ1dHRvbignYnRuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBtZW51SXRlbUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uKGFjdGlvbkNvbnRleHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJIZWxsbyB3b3JsZFwiKTtcclxuICAgICAgICAgICAgbmV3IE1haW5FeHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuVlNTLnJlZ2lzdGVyKCdlbWJkZWRkZWRJbldvcmtJdGVtRm9ybScsIHByb3ZpZGVyKTtcclxuVlNTLnJlZ2lzdGVyKCdhY3Rpb25NZW51JywgbWVudUl0ZW1IYW5kbGVyKTtcclxuXHJcbmNsYXNzIEF6dXJlSHR0cENsaWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoXHJcbiAgICAgICAgcHJpdmF0ZSBvcmdhbmlzYXRpb246IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHByb2plY3Q6IHN0cmluZyxcclxuICAgICAgICBwcml2YXRlIHdvcmtJdGVtQ2xpZW50OiBXb3JrSXRlbVRyYWNraW5nSHR0cENsaWVudCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgQ3JlYXRlVGFzayhleGlzdGluZ1Rhc2tJZDogc3RyaW5nLCB0ZW1wbGF0ZVBhcnRNb2RlbDogVGVtcGxhdGVQYXJ0TW9kZWwpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIC8vIFBPU1QgaHR0cHM6Ly9kZXYuYXp1cmUuY29tL3tvcmdhbml6YXRpb259L3twcm9qZWN0fS9fYXBpcy93aXQvd29ya2l0ZW1zLyR7dHlwZX0/YXBpLXZlcnNpb249Ny4wXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9sZWFybi5taWNyb3NvZnQuY29tL2VuLXVzL3Jlc3QvYXBpL2F6dXJlL2Rldm9wcy93aXQvd29yay1pdGVtcy9jcmVhdGU/dmlldz1henVyZS1kZXZvcHMtcmVzdC03LjAmdGFicz1IVFRQXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHBhcmVudCA9IGF3YWl0IHRoaXMud29ya0l0ZW1DbGllbnQuZ2V0V29ya0l0ZW0oXHJcbiAgICAgICAgICAgIE51bWJlci5wYXJzZUludChleGlzdGluZ1Rhc2tJZCksIFxyXG4gICAgICAgICAgICBbXCJTeXN0ZW0uQXJlYVBhdGhcIiwgXCJTeXN0ZW0uSXRlcmF0aW9uUGF0aFwiXSkudGhlbih3b3JrSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIga2V5RGF0YTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMud29ya0l0ZW1DbGllbnQuY3JlYXRlV29ya0l0ZW0oW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJvcFwiOiBcImFkZFwiLFxyXG4gICAgICAgICAgICAgIFwicGF0aFwiOiBcIi9maWVsZHMvU3lzdGVtLlRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0ZW1wbGF0ZVBhcnRNb2RlbC5UaXRsZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnb3AnOiAnYWRkJyxcclxuICAgICAgICAgICAgICAgICdwYXRoJzogJy9maWVsZHMvU3lzdGVtLkFyZWFQYXRoJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IHBhcmVudC5maWVsZHNbXCJTeXN0ZW0uQXJlYVBhdGhcIl1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ29wJzogJ2FkZCcsXHJcbiAgICAgICAgICAgICAgICAncGF0aCc6ICcvZmllbGRzL1N5c3RlbS5JdGVyYXRpb25QYXRoJyxcclxuICAgICAgICAgICAgICAgICd2YWx1ZSc6IHBhcmVudC5maWVsZHNbXCJTeXN0ZW0uSXRlcmF0aW9uUGF0aFwiXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnb3AnOiAnYWRkJyxcclxuICAgICAgICAgICAgICAgICdwYXRoJzogJy9yZWxhdGlvbnMvLScsXHJcbiAgICAgICAgICAgICAgICAndmFsdWUnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3JlbCc6ICdTeXN0ZW0uTGlua1R5cGVzLkhpZXJhcmNoeS1SZXZlcnNlJyxcclxuICAgICAgICAgICAgICAgICAgICAndXJsJzogcGFyZW50LnVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLCB0aGlzLnByb2plY3QsICdUYXNrJywgZmFsc2UsIGZhbHNlLCBmYWxzZSkudGhlbih3b3JrSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBrZXlEYXRhID0gd29ya0l0ZW0uaWQudG9TdHJpbmcoKTtcclxuICAgICAgICB9LCByZWplY3RlZCA9PiB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ga2V5RGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVNb2RlbFtdO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3Q6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zUHJvdmlkZXI6IElPcHRpb25zUHJvdmlkZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBhenVyZUh0dHBDbGllbnQ6IEF6dXJlSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIG9yaWdpbmFsVGFza051bWJlcjogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBMb2FkU2VsZWN0KGNsYXNzTmFtZTogc3RyaW5nKSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW5zdXJlT3B0aW9uc0FyZUxvYWRlZCgpO1xyXG5cclxuICAgICAgICB2YXIganF1ZXJ5RWxlbWVudCA9ICQoYC4ke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICB0aGlzLnNlbGVjdCA9IGpxdWVyeUVsZW1lbnRbMF07XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCh0ZW1wbGF0ZSA9PiB7XHJcbiAgICAgICAgICAgIGpxdWVyeUVsZW1lbnQuYXBwZW5kKCQoJzxvcHRpb24+JywgeyBcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5UZW1wbGF0ZU5hbWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0IDogdGVtcGxhdGUuVGVtcGxhdGVOYW1lXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQXNzaWduQnV0dG9uKGNsYXNzTmFtZTogc3RyaW5nKSA6IHZvaWQge1xyXG4gICAgICAgIHZhciB0aGlzUmVmID0gdGhpcztcclxuICAgICAgICAkKGAuJHtjbGFzc05hbWV9YCkub2ZmKCdjbGljaycpO1xyXG4gICAgICAgICQoYC4ke2NsYXNzTmFtZX1gKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRUZW1wbGF0ZSA9IHRoaXNSZWYudGVtcGxhdGVzW3RoaXNSZWYuc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRDaGlsZHJlbih0aGlzUmVmLCB0YXJnZXRUZW1wbGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBMb2FkQ2hpbGRyZW4odGhpc1JlZjpNYWluLCB0ZW1wbGF0ZU1vZGVsOiBUZW1wbGF0ZU1vZGVsKSA6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIGFzeW5jVGFza3MgPSB0ZW1wbGF0ZU1vZGVsLkNoaWxkcmVuLmZpbHRlcihhc3luYyB0YXNrID0+IHtcclxuICAgICAgICAgICAgdmFyIHdvcmtJdGVtTnVtYmVyID0gdGFzay5Xb3JrSXRlbU51bWJlcjtcclxuICAgICAgICAgICAgaWYgKCF0YXNrLklzRXhpc3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHdvcmtJdGVtTnVtYmVyID0gYXdhaXQgdGhpc1JlZi5henVyZUh0dHBDbGllbnQuQ3JlYXRlVGFzayh0aGlzUmVmLm9yaWdpbmFsVGFza051bWJlciwgdGFzayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGFzeW5jVGFza3MpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRW5zdXJlT3B0aW9uc0FyZUxvYWRlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IHRoaXMub3B0aW9uc1Byb3ZpZGVyLkdldFRlbXBsYXRlcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSU9wdGlvbnNQcm92aWRlciB7XHJcbiAgICBHZXRUZW1wbGF0ZXMoKSA6IFRlbXBsYXRlTW9kZWxbXTtcclxufVxyXG5cclxuY2xhc3MgVGVtcGxhdGVNb2RlbCB7XHJcbiAgICBwdWJsaWMgVGVtcGxhdGVOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgQ2hpbGRyZW46IFRlbXBsYXRlUGFydE1vZGVsW107XHJcbn1cclxuXHJcbmNsYXNzIFRlbXBsYXRlUGFydE1vZGVsIHtcclxuICAgIHB1YmxpYyBJc0V4aXN0aW5nOiBib29sZWFuO1xyXG4gICAgcHVibGljIFdvcmtJdGVtTnVtYmVyOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgVGl0bGU6IHN0cmluZztcclxuICAgIHB1YmxpYyBBdHRyaWJ1dGVzOiBUZW1wbGF0ZVBhcnRDdXN0b21BdHRyaWJ1dGVNb2RlbFtdO1xyXG59XHJcblxyXG5jbGFzcyBUZW1wbGF0ZVBhcnRDdXN0b21BdHRyaWJ1dGVNb2RlbCB7XHJcbiAgICBwdWJsaWMgS2V5OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgVmFsdWU6IHN0cmluZztcclxufVxyXG5cclxuY2xhc3MgU3RhdGljVGVtcGxhdGVQcm92aWRlciBpbXBsZW1lbnRzIElPcHRpb25zUHJvdmlkZXIge1xyXG4gICAgR2V0VGVtcGxhdGVzKCk6IFRlbXBsYXRlTW9kZWxbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGVtcGxhdGVOYW1lOiAnRXhhbXBsZSBUZW1wbGF0ZScsXHJcbiAgICAgICAgICAgICAgICBDaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXNFeGlzdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmtJdGVtTnVtYmVyOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGl0bGU6ICdEZXZlbG9wbWVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnVGVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnU2lnbiBPZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc0V4aXN0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaXRsZTogJ0ZpcnN0IFdvcmsgSXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBNYWluRXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGFsZXJ0KFwiSGVsbG8gd29ybGRcIik7XHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zY3JpcHRzL2FwcC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==