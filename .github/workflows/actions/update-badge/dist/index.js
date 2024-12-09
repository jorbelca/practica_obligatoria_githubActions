/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 665:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const fs = __nccwpck_require__(896);
const core = __nccwpck_require__(665);

try {
  const testResult = core.getInput("test_result");
  let badge;

  // Badge según el resultado
  if (testResult === "success") {
    badge =
      "[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)";
  } else {
    badge =
      "[![Failure](https://img.shields.io/badge/test-failure-red)](https://www.cypress.io/)";
  }

  // Leer el archivo README.md
  const readmePath = "README.md";
  const readmeContent = fs.readFileSync(readmePath, "utf-8");

  // Modificar la sección entre los comentarios
  const updatedContent = readmeContent.replace(
    /(<!---Start place for the badge -->)([\s\S]*?)(<!---End place for the badge -->)/,
    `$1\n${badge}\n$3`
  );

  // Sobrescribir el archivo README.md
  fs.writeFileSync(readmePath, updatedContent);

  console.log("README.md actualizado con el badge correspondiente.");
} catch (error) {
  core.setFailed(`Error actualizando el README.md: ${error.message}`);
}

module.exports = __webpack_exports__;
/******/ })()
;