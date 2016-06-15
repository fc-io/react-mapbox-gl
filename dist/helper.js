"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = undefined;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var diff = exports.diff = function diff(obj1, obj2) {
  return _lodash2.default.reduce(obj2, function (res, value, key) {
    if (_lodash2.default.find(obj1, function (v, k) {
      return key === k && value !== v;
    })) {
      res[key] = value;
    }
    return res;
  }, {});
};