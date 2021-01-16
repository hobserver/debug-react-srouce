/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
// module.paths.unshift(path.join(__dirname, '../react/packages'));
// console.log(module);
const obj = {
  'object-assign': 'shared/forks/object-assign.inline-umd.js',
  // 'react-shallow-renderer': 'react-shallow-renderer/esm/index.js',
  'shared/ReactSharedInternals': 'react/src/ReactSharedInternals',
  'scheduler/src/SchedulerFeatureFlags': 'scheduler/src/SchedulerFeatureFlags',
  'scheduler/src/SchedulerHostConfig': 'scheduler/src/forks/SchedulerHostConfig.default',
  'react/src/ReactSharedInternals.js': 'react/src/forks/ReactSharedInternals.umd.js',
  'react-reconciler/src/ReactFiberReconciler': 'react-reconciler/src/ReactFiberReconciler.old.js',
  'react-reconciler/src/ReactFiberHotReloading': 'react-reconciler/src/ReactFiberHotReloading.old.js',
  'object-assign': 'shared/forks/object-assign.umd.js',
  // 'react-shallow-renderer': 'react-shallow-renderer/esm/index.js',
  // scheduler: 'shared/forks/Scheduler.umd.js',
  // 'scheduler/tracing': 'shared/forks/SchedulerTracing.umd.js',
  'scheduler/src/SchedulerFeatureFlags': 'scheduler/src/SchedulerFeatureFlags',
  'scheduler/src/SchedulerHostConfig': 'scheduler/src/forks/SchedulerHostConfig.default',
  'react/src/ReactSharedInternals.js': 'react/src/forks/ReactSharedInternals.umd.js',
  'react-reconciler/src/ReactFiberReconciler': 'react-reconciler/src/ReactFiberReconciler.old.js',
  'react-reconciler/src/ReactFiberHotReloading': 'react-reconciler/src/ReactFiberHotReloading.old.js',
  'react-reconciler/src/ReactFiberHostConfig': 'react-reconciler/src/forks/ReactFiberHostConfig.dom.js',
  'react-server/src/ReactServerStreamConfig': 'react-server/src/forks/ReactServerStreamConfig.dom.js',
  'react-server/src/ReactServerFormatConfig': 'react-server/src/forks/ReactServerFormatConfig.dom.js',
  'react-server/src/ReactFlightServerConfig': 'react-server/src/forks/ReactFlightServerConfig.dom.js',
  'react-client/src/ReactFlightClientHostConfig': 'react-client/src/forks/ReactFlightClientHostConfig.dom.js'
}
class ReactRuntimeReplace {
	constructor(resourceRegExp, newResource) {
        this.moduleMap = new Map();
        Object.keys(obj).forEach((srcModule) => {
            this.moduleMap.set(require.resolve(srcModule), require.resolve(obj[srcModule]));
        });
	}
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap(
			"react-runtime-replace",
			nmf => {
				nmf.hooks.afterResolve.tap("react-runtime-replace", result => {
					if (!result) return;
                    if (this.moduleMap.has(result.resource)) {
                        result.resource = this.moduleMap.get(result.resource);
                    }
				});
			}
		);
	}
}
module.exports = ReactRuntimeReplace;

