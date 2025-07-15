"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/getLeads";
exports.ids = ["pages/api/getLeads"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2FgetLeads&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5CgetLeads.ts&middlewareConfigBase64=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2FgetLeads&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5CgetLeads.ts&middlewareConfigBase64=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_getLeads_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\getLeads.ts */ \"(api)/./pages/api/getLeads.ts\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_getLeads_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_getLeads_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/getLeads\",\n        pathname: \"/api/getLeads\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _pages_api_getLeads_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRmdldExlYWRzJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGcGFnZXMlNUNhcGklNUNnZXRMZWFkcy50cyZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDTDtBQUMxRDtBQUNzRDtBQUN0RDtBQUNBLGlFQUFlLHdFQUFLLENBQUMsbURBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sZUFBZSx3RUFBSyxDQUFDLG1EQUFRO0FBQ3BDO0FBQ08sd0JBQXdCLGdIQUFtQjtBQUNsRDtBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZO0FBQ1osQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL2x1eHVyeS1jcm0vP2U0MzMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNBUElSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL3BhZ2VzLWFwaS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGFwaVxcXFxnZXRMZWFkcy50c1wiO1xuLy8gUmUtZXhwb3J0IHRoZSBoYW5kbGVyIChzaG91bGQgYmUgdGhlIGRlZmF1bHQgZXhwb3J0KS5cbmV4cG9ydCBkZWZhdWx0IGhvaXN0KHVzZXJsYW5kLCBcImRlZmF1bHRcIik7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCBcImNvbmZpZ1wiKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzQVBJUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTX0FQSSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dldExlYWRzXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2V0TGVhZHNcIixcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBhcmVuJ3QgdXNlZCBpbiBwcm9kdWN0aW9uLlxuICAgICAgICBidW5kbGVQYXRoOiBcIlwiLFxuICAgICAgICBmaWxlbmFtZTogXCJcIlxuICAgIH0sXG4gICAgdXNlcmxhbmRcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy1hcGkuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2FgetLeads&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5CgetLeads.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./pages/api/getLeads.ts":
/*!*******************************!*\
  !*** ./pages/api/getLeads.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handler(req, res) {\n    if (req.method === \"GET\") {\n        try {\n            const leads = await prisma.lead.findMany({\n                orderBy: {\n                    createdAt: \"desc\"\n                }\n            });\n            res.status(200).json(leads);\n        } catch (err) {\n            console.error(\"❌ Error fetching leads:\", err);\n            res.status(500).json({\n                message: \"Failed to get leads\",\n                error: err.message\n            });\n        }\n    } else {\n        res.status(405).json({\n            message: \"Method not allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0TGVhZHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQzhDO0FBRTlDLE1BQU1DLFNBQVMsSUFBSUQsd0RBQVlBO0FBRWhCLGVBQWVFLFFBQVFDLEdBQW1CLEVBQUVDLEdBQW9CO0lBQzdFLElBQUlELElBQUlFLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLElBQUk7WUFDRixNQUFNQyxRQUFRLE1BQU1MLE9BQU9NLElBQUksQ0FBQ0MsUUFBUSxDQUFDO2dCQUN2Q0MsU0FBUztvQkFBRUMsV0FBVztnQkFBTztZQUMvQjtZQUNBTixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDTjtRQUN2QixFQUFFLE9BQU9PLEtBQVU7WUFDakJDLFFBQVFDLEtBQUssQ0FBQywyQkFBMkJGO1lBQ3pDVCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFSSxTQUFTO2dCQUF1QkQsT0FBT0YsSUFBSUcsT0FBTztZQUFDO1FBQzVFO0lBQ0YsT0FBTztRQUNMWixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVJLFNBQVM7UUFBcUI7SUFDdkQ7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2x1eHVyeS1jcm0vLi9wYWdlcy9hcGkvZ2V0TGVhZHMudHM/NTk1NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XHJcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiR0VUXCIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGxlYWRzID0gYXdhaXQgcHJpc21hLmxlYWQuZmluZE1hbnkoe1xyXG4gICAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24obGVhZHMpO1xyXG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBFcnJvciBmZXRjaGluZyBsZWFkczpcIiwgZXJyKTtcclxuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkZhaWxlZCB0byBnZXQgbGVhZHNcIiwgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7IG1lc3NhZ2U6IFwiTWV0aG9kIG5vdCBhbGxvd2VkXCIgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwibGVhZHMiLCJsZWFkIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwiY3JlYXRlZEF0Iiwic3RhdHVzIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/getLeads.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2FgetLeads&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5CgetLeads.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();