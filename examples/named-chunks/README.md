# example.js

```javascript
var a = require("a");

require.ensure(["b"], function(require) {
	// a named chunk
	var c = require("c");
}, "my own chunk");

require.ensure(["b"], function(require) {
	// another chunk with the same name
	var d = require("d");
}, "my own chunk");

require.ensure([], function(require) {
	// the same again
}, "my own chunk");

require.ensure(["b"], function(require) {
	// chunk without name
	var d = require("d");
});
```

# dist/output.js

```javascript
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!***************************!*\
  !*** ./node_modules/a.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module a

/***/ })
/******/ 	]);
```

<details><summary><code>/* webpack runtime code */</code></summary>

``` js
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".output.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
```

</details>

``` js
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, __webpack_require__.e, __webpack_require__.* */
var a = __webpack_require__(/*! a */ 1);

__webpack_require__.e(/*! require.ensure | my own chunk */ "my own chunk").then((function(require) {
	// a named chunk
	var c = __webpack_require__(/*! c */ 3);
}).bind(null, __webpack_require__))['catch'](__webpack_require__.oe);

__webpack_require__.e(/*! require.ensure | my own chunk */ "my own chunk").then((function(require) {
	// another chunk with the same name
	var d = __webpack_require__(/*! d */ 4);
}).bind(null, __webpack_require__))['catch'](__webpack_require__.oe);

__webpack_require__.e(/*! require.ensure | my own chunk */ "my own chunk").then((function(require) {
	// the same again
}).bind(null, __webpack_require__))['catch'](__webpack_require__.oe);

__webpack_require__.e(/*! require.ensure */ "node_modules_b_js-node_modules_d_js").then((function(require) {
	// chunk without name
	var d = __webpack_require__(/*! d */ 4);
}).bind(null, __webpack_require__))['catch'](__webpack_require__.oe);

})();

/******/ })()
;
```

# dist/my own chunk.output.js

```javascript
(self["webpackChunk"] = self["webpackChunk"] || []).push([["my own chunk"],[
/* 0 */,
/* 1 */,
/* 2 */
/*!***************************!*\
  !*** ./node_modules/b.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module b

/***/ }),
/* 3 */
/*!***************************!*\
  !*** ./node_modules/c.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module c

/***/ }),
/* 4 */
/*!***************************!*\
  !*** ./node_modules/d.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module d

/***/ })
]]);
```

# dist/node_modules_b_js-node_modules_d_js.output.js

```javascript
(self["webpackChunk"] = self["webpackChunk"] || []).push([["node_modules_b_js-node_modules_d_js"],[
/* 0 */,
/* 1 */,
/* 2 */
/*!***************************!*\
  !*** ./node_modules/b.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module b

/***/ }),
/* 3 */,
/* 4 */
/*!***************************!*\
  !*** ./node_modules/d.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

// module d

/***/ })
]]);
```

# Info

## Unoptimized

```
asset output.js 9.85 KiB [emitted] (name: main)
asset my own chunk.output.js 746 bytes [emitted] (name: my own chunk)
asset node_modules_b_js-node_modules_d_js.output.js 562 bytes [emitted]
chunk (runtime: main) output.js (main) 432 bytes (javascript) 4.94 KiB (runtime) [entry] [rendered]
  > ./example.js main
  runtime modules 4.94 KiB 6 modules
  dependent modules 11 bytes [dependent] 1 module
  ./example.js 421 bytes [built] [code generated]
    [used exports unknown]
    entry ./example.js main
chunk (runtime: main) my own chunk.output.js (my own chunk) 33 bytes [rendered]
  > ./example.js 13:0-15:18
  > ./example.js 3:0-6:18
  > ./example.js 8:0-11:18
  ./node_modules/b.js 11 bytes [built] [code generated]
    [used exports unknown]
    require.ensure item b ./example.js 3:0-6:18
    require.ensure item b ./example.js 8:0-11:18
    require.ensure item b ./example.js 17:0-20:2
  ./node_modules/c.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require c ./example.js 5:9-21
  ./node_modules/d.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require d ./example.js 10:9-21
    cjs require d ./example.js 19:9-21
chunk (runtime: main) node_modules_b_js-node_modules_d_js.output.js 22 bytes [rendered]
  > ./example.js 17:0-20:2
  ./node_modules/b.js 11 bytes [built] [code generated]
    [used exports unknown]
    require.ensure item b ./example.js 3:0-6:18
    require.ensure item b ./example.js 8:0-11:18
    require.ensure item b ./example.js 17:0-20:2
  ./node_modules/d.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require d ./example.js 10:9-21
    cjs require d ./example.js 19:9-21
webpack X.X.X compiled successfully
```

## Production mode

```
asset output.js 1.94 KiB [emitted] [minimized] (name: main)
asset my own chunk.output.js 140 bytes [emitted] [minimized] (name: my own chunk)
asset node_modules_b_js-node_modules_d_js.output.js 114 bytes [emitted] [minimized]
chunk (runtime: main) output.js (main) 432 bytes (javascript) 4.94 KiB (runtime) [entry] [rendered]
  > ./example.js main
  runtime modules 4.94 KiB 6 modules
  dependent modules 11 bytes [dependent] 1 module
  ./example.js 421 bytes [built] [code generated]
    [no exports used]
    entry ./example.js main
chunk (runtime: main) my own chunk.output.js (my own chunk) 33 bytes [rendered]
  > ./example.js 13:0-15:18
  > ./example.js 3:0-6:18
  > ./example.js 8:0-11:18
  ./node_modules/b.js 11 bytes [built] [code generated]
    [used exports unknown]
    require.ensure item b ./example.js 3:0-6:18
    require.ensure item b ./example.js 8:0-11:18
    require.ensure item b ./example.js 17:0-20:2
  ./node_modules/c.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require c ./example.js 5:9-21
  ./node_modules/d.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require d ./example.js 10:9-21
    cjs require d ./example.js 19:9-21
chunk (runtime: main) node_modules_b_js-node_modules_d_js.output.js 22 bytes [rendered]
  > ./example.js 17:0-20:2
  ./node_modules/b.js 11 bytes [built] [code generated]
    [used exports unknown]
    require.ensure item b ./example.js 3:0-6:18
    require.ensure item b ./example.js 8:0-11:18
    require.ensure item b ./example.js 17:0-20:2
  ./node_modules/d.js 11 bytes [built] [code generated]
    [used exports unknown]
    cjs require d ./example.js 10:9-21
    cjs require d ./example.js 19:9-21
webpack X.X.X compiled successfully
```
