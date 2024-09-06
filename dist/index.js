/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 654:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 374:
/***/ ((module) => {

module.exports = eval("require")("axios");


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(654);
const axios = __nccwpck_require__(374);

async function run() {
  try {
    // Inputs
    const scheduleId = core.getInput('schedule_id');
    const startTime = core.getInput('start_time');
    const endTime = core.getInput('end_time');
    const pagerdutyToken = core.getInput('pagerduty_token');

    // Set the headers
    const headers = {
      'Authorization': `Token token=${pagerdutyToken}`,
      'Accept': 'application/vnd.pagerduty+json;version=2'
    };

    // Get incidents from PagerDuty
    const incidents = await fetchIncidents(scheduleId, startTime, endTime, headers);
    
    if (incidents.length === 0) {
      core.info('No incidents found for the given schedule and time range.');
    } else {
      core.info(`Found ${incidents.length} incidents:`);
      incidents.forEach(incident => {
        core.info(`- Incident ID: ${incident.id}, Description: ${incident.description}`);
      });
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function fetchIncidents(scheduleId, startTime, endTime, headers) {
  try {
    const response = await axios.get(`https://api.pagerduty.com/incidents`, {
      headers,
      params: {
        'since': startTime,
        'until': endTime,
        'schedule_ids[]': scheduleId
      }
    });
    
    return response.data.incidents;
  } catch (error) {
    throw new Error(`Failed to fetch incidents: ${error.message}`);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;