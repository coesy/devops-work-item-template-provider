define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/app.ts":
/*!************************!*\
  !*** ./scripts/app.ts ***!
  \************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var provider = function () {
        debugger;
        return {
            onLoaded: function (workItemLoadedArgs) {
                debugger;
                var main = new Main(undefined, new StaticTemplateProvider());
                main.LoadSelect('sel');
                main.AssignButton('btn');
            } //,
            //        onFieldChanged: (fieldChangedArgs: ExtensionContracts.IWorkItemFieldChangedArgs) => {
            //            //var changedValue = fieldChangedArgs.changedFields[control.getFieldName()];
            //            //if (changedValue !== undefined) {
            //            //    control.updateExternal(changedValue);
            //            //}
            //            debugger;
            //        }
        };
    };
    VSS.register('index', provider);
    var Main = /** @class */ (function () {
        function Main(vssProvider, optionsProvider) {
            this.vssProvider = vssProvider;
            this.optionsProvider = optionsProvider;
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
            var thisRef = this;
            $("." + className).on('click', function () {
                debugger;
                alert(thisRef.templates[thisRef.select.selectedIndex].TemplateName);
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
                    TemplateName: 'First Work Item',
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy9hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBSUEsSUFBSSxRQUFRLEdBQUc7UUFDWCxRQUFRO1FBQ1IsT0FBTztZQUNILFFBQVEsRUFBRSxVQUFDLGtCQUEwRDtnQkFDakUsUUFBUSxDQUFDO2dCQUNULElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLHNCQUFzQixFQUFFLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLElBQUc7WUFDWiwrRkFBK0Y7WUFDL0YsMEZBQTBGO1lBQzFGLGlEQUFpRDtZQUNqRCx5REFBeUQ7WUFDekQsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2QixXQUFXO1NBQ047SUFDTCxDQUFDLENBQUM7SUFFRixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVoQztRQUlJLGNBQ1ksV0FBeUIsRUFDekIsZUFBaUM7WUFEakMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFDekIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBRTdDLENBQUM7UUFFTSx5QkFBVSxHQUFqQixVQUFrQixTQUFpQjtZQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUU5QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBSSxTQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQXNCLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQVE7Z0JBQzNCLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRTtvQkFDL0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxZQUFZO29CQUM1QixJQUFJLEVBQUcsUUFBUSxDQUFDLFlBQVk7aUJBQy9CLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU0sMkJBQVksR0FBbkIsVUFBb0IsU0FBaUI7WUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxNQUFJLFNBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLFFBQVEsQ0FBQztnQkFDVCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVPLHFDQUFzQixHQUE5QjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTO2dCQUFFLE9BQU87WUFFekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pELENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FBQztJQVVEO1FBQUE7UUFHQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQUFDO0lBRUQ7UUFBQTtRQUtBLENBQUM7UUFBRCx3QkFBQztJQUFELENBQUM7SUFFRDtRQUFBO1FBR0EsQ0FBQztRQUFELHVDQUFDO0lBQUQsQ0FBQztJQUVEO1FBQUE7UUFrQ0EsQ0FBQztRQWpDRyw2Q0FBWSxHQUFaO1lBQ0ksT0FBTztnQkFDSDtvQkFDSSxZQUFZLEVBQUUsaUJBQWlCO29CQUMvQixRQUFRLEVBQUU7d0JBQ047NEJBQ0ksVUFBVSxFQUFFLEtBQUs7NEJBQ2pCLGNBQWMsRUFBRSxFQUFFOzRCQUNsQixLQUFLLEVBQUUsYUFBYTs0QkFDcEIsVUFBVSxFQUFFLEVBQUU7eUJBQ2pCO3dCQUNEOzRCQUNJLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsRUFBRTs0QkFDbEIsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLEVBQUU7eUJBQ2pCO3dCQUNEOzRCQUNJLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUsRUFBRTs0QkFDbEIsS0FBSyxFQUFFLFVBQVU7NEJBQ2pCLFVBQVUsRUFBRSxFQUFFO3lCQUNqQjt3QkFDRDs0QkFDSSxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsY0FBYyxFQUFFLEdBQUc7NEJBQ25CLEtBQUssRUFBRSxpQkFBaUI7NEJBQ3hCLFVBQVUsRUFBRSxFQUFFO3lCQUNqQjtxQkFDSjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0FBQzs7Ozs7Ozs7O1VDMUhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92c3RzLWV4dGVuc2lvbi10cy1zZWVkLXNpbXBsZS8uL3NjcmlwdHMvYXBwLnRzIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdnN0cy1leHRlbnNpb24tdHMtc2VlZC1zaW1wbGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZzdHMtZXh0ZW5zaW9uLXRzLXNlZWQtc2ltcGxlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZzcy13ZWItZXh0ZW5zaW9uLXNka1wiIC8+XHJcbmltcG9ydCAqIGFzIEV4dGVuc2lvbkNvbnRyYWN0cyBmcm9tIFwiVEZTL1dvcmtJdGVtVHJhY2tpbmcvRXh0ZW5zaW9uQ29udHJhY3RzXCI7XHJcbmltcG9ydCB7IFdvcmtJdGVtRm9ybVNlcnZpY2UgfSBmcm9tIFwiVEZTL1dvcmtJdGVtVHJhY2tpbmcvU2VydmljZXNcIjtcclxuXHJcbnZhciBwcm92aWRlciA9ICgpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uTG9hZGVkOiAod29ya0l0ZW1Mb2FkZWRBcmdzOiBFeHRlbnNpb25Db250cmFjdHMuSVdvcmtJdGVtTG9hZGVkQXJncykgPT4ge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdmFyIG1haW4gPSBuZXcgTWFpbih1bmRlZmluZWQsIG5ldyBTdGF0aWNUZW1wbGF0ZVByb3ZpZGVyKCkpO1xyXG4gICAgICAgICAgICBtYWluLkxvYWRTZWxlY3QoJ3NlbCcpO1xyXG4gICAgICAgICAgICBtYWluLkFzc2lnbkJ1dHRvbignYnRuJyk7XHJcbiAgICAgICAgfS8vLFxyXG4vLyAgICAgICAgb25GaWVsZENoYW5nZWQ6IChmaWVsZENoYW5nZWRBcmdzOiBFeHRlbnNpb25Db250cmFjdHMuSVdvcmtJdGVtRmllbGRDaGFuZ2VkQXJncykgPT4ge1xyXG4vLyAgICAgICAgICAgIC8vdmFyIGNoYW5nZWRWYWx1ZSA9IGZpZWxkQ2hhbmdlZEFyZ3MuY2hhbmdlZEZpZWxkc1tjb250cm9sLmdldEZpZWxkTmFtZSgpXTtcclxuLy8gICAgICAgICAgICAvL2lmIChjaGFuZ2VkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4vLyAgICAgICAgICAgIC8vICAgIGNvbnRyb2wudXBkYXRlRXh0ZXJuYWwoY2hhbmdlZFZhbHVlKTtcclxuLy8gICAgICAgICAgICAvL31cclxuLy8gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuLy8gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblZTUy5yZWdpc3RlcignaW5kZXgnLCBwcm92aWRlcik7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuICAgIHByaXZhdGUgdGVtcGxhdGVzOiBUZW1wbGF0ZU1vZGVsW107XHJcbiAgICBwcml2YXRlIHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgdnNzUHJvdmlkZXI6IElWU1NQcm92aWRlcixcclxuICAgICAgICBwcml2YXRlIG9wdGlvbnNQcm92aWRlcjogSU9wdGlvbnNQcm92aWRlcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTG9hZFNlbGVjdChjbGFzc05hbWU6IHN0cmluZykgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkVuc3VyZU9wdGlvbnNBcmVMb2FkZWQoKTtcclxuXHJcbiAgICAgICAgdmFyIGpxdWVyeUVsZW1lbnQgPSAkKGAuJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QgPSBqcXVlcnlFbGVtZW50WzBdIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2godGVtcGxhdGUgPT4ge1xyXG4gICAgICAgICAgICBqcXVlcnlFbGVtZW50LmFwcGVuZCgkKCc8b3B0aW9uPicsIHsgXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuVGVtcGxhdGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgdGV4dCA6IHRlbXBsYXRlLlRlbXBsYXRlTmFtZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFzc2lnbkJ1dHRvbihjbGFzc05hbWU6IHN0cmluZykgOiB2b2lkIHtcclxuICAgICAgICB2YXIgdGhpc1JlZiA9IHRoaXM7XHJcbiAgICAgICAgJChgLiR7Y2xhc3NOYW1lfWApLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGFsZXJ0KHRoaXNSZWYudGVtcGxhdGVzW3RoaXNSZWYuc2VsZWN0LnNlbGVjdGVkSW5kZXhdLlRlbXBsYXRlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBFbnN1cmVPcHRpb25zQXJlTG9hZGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlcyAhPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzID0gdGhpcy5vcHRpb25zUHJvdmlkZXIuR2V0VGVtcGxhdGVzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJVlNTUHJvdmlkZXIge1xyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIElPcHRpb25zUHJvdmlkZXIge1xyXG4gICAgR2V0VGVtcGxhdGVzKCkgOiBUZW1wbGF0ZU1vZGVsW107XHJcbn1cclxuXHJcbmNsYXNzIFRlbXBsYXRlTW9kZWwge1xyXG4gICAgcHVibGljIFRlbXBsYXRlTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIENoaWxkcmVuOiBUZW1wbGF0ZVBhcnRNb2RlbFtdO1xyXG59XHJcblxyXG5jbGFzcyBUZW1wbGF0ZVBhcnRNb2RlbCB7XHJcbiAgICBwdWJsaWMgSXNFeGlzdGluZzogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBXb3JrSXRlbU51bWJlcjogc3RyaW5nO1xyXG4gICAgcHVibGljIFRpdGxlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgQXR0cmlidXRlczogVGVtcGxhdGVQYXJ0Q3VzdG9tQXR0cmlidXRlTW9kZWxbXTtcclxufVxyXG5cclxuY2xhc3MgVGVtcGxhdGVQYXJ0Q3VzdG9tQXR0cmlidXRlTW9kZWwge1xyXG4gICAgcHVibGljIEtleTogc3RyaW5nO1xyXG4gICAgcHVibGljIFZhbHVlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNsYXNzIFN0YXRpY1RlbXBsYXRlUHJvdmlkZXIgaW1wbGVtZW50cyBJT3B0aW9uc1Byb3ZpZGVyIHtcclxuICAgIEdldFRlbXBsYXRlcygpOiBUZW1wbGF0ZU1vZGVsW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRlbXBsYXRlTmFtZTogJ0ZpcnN0IFdvcmsgSXRlbScsXHJcbiAgICAgICAgICAgICAgICBDaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXNFeGlzdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmtJdGVtTnVtYmVyOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGl0bGU6ICdEZXZlbG9wbWVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnVGVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElzRXhpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlOiAnU2lnbiBPZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdHRyaWJ1dGVzOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc0V4aXN0aW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBXb3JrSXRlbU51bWJlcjogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaXRsZTogJ0ZpcnN0IFdvcmsgSXRlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF0dHJpYnV0ZXM6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvYXBwLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9