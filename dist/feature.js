"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feature = function Feature() {
  return null;
};

Feature.propTypes = {
  coordinates: _react.PropTypes.array.isRequired,
  onClick: _react.PropTypes.func,
  onHover: _react.PropTypes.func,
  onEndHover: _react.PropTypes.func,
  properties: _react.PropTypes.object
};

exports.default = Feature;