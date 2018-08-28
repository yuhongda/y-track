"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enableTrack;

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _coreDecorators = require("core-decorators");

var _mobxReact = require("mobx-react");

var _analysis = _interopRequireDefault(require("./analysis"));

var _defaultTrackMethods = _interopRequireDefault(require("./defaultTrackMethods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {Array<{
            methodName: 'componentDidMount',
            description: 'pageload'
        }>} trackItems 
 * 
 * @param {{
        app : "y-saas-pbs",
        version : "1.0",
        loginUser : window.userPin,
        funcPath : ""
    }} trackPattern 
 * 
 */
function enableTrack(trackItems, trackPattern) {
  return function EnableTrackDecorator(component) {
    function getDisplayName(comp) {
      return comp.displayName || comp.name || 'Component';
    }

    function attachTrack(item) {
      const func = component.prototype[item.methodName];
      if (!func) return;

      component.prototype[item.methodName] = (...args) => {
        trackPattern.funcPath = item.description ? `${getDisplayName(component)}-${item.description}` : `${getDisplayName(component)}-${item.methodName}`;
        (0, _analysis.default)(trackPattern);
        func.apply(component, ...args);
      };
    }

    let methods = [];

    _defaultTrackMethods.default.concat(trackItems).forEach(item => {
      if (methods.findIndex(m => m.methodName == item.methodName) == -1) {
        methods.push(item);
      }
    });

    for (let item of methods) {
      attachTrack(item);
    }

    return component;
  };
}