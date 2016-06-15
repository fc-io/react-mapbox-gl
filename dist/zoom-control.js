"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerStyle = {
  position: "absolute",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
  border: "1px solid rgba(0, 0, 0, 0.1)"
};

var positions = {
  topRight: { top: 10, right: 10, bottom: "auto", left: "auto" },
  topLeft: { top: 10, left: 10, bottom: "auto", right: "auto" },
  bottomRight: { bottom: 10, right: 10, top: "auto", left: "auto" },
  bottomLeft: { bottom: 10, left: 10, top: "auto", right: "auto" }
};

var buttonStyle = {
  backgroundColor: "#f9f9f9",
  opacity: .95,
  transition: "background-color 0.16s ease-out",
  cursor: "pointer",
  border: 0,
  height: 26,
  width: 26,
  backgroundImage: "url('https://api.mapbox.com/mapbox.js/v2.4.0/images/icons-000000@2x.png')",
  backgroundPosition: "0px 0px",
  backgroundSize: "26px 260px",
  outline: 0
};

var buttonStyleHovered = {
  backgroundColor: "#fff",
  opacity: 1
};

var buttonStylePlus = {
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2
};

var buttonStyleMinus = {
  backgroundPosition: "0px -26px",
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2
};

var PLUS = 0;
var MINUS = 1;

var POSITIONS = Object.keys(positions);

var ZoomControl = (_temp2 = _class = function (_Component) {
  _inherits(ZoomControl, _Component);

  function ZoomControl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ZoomControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      hover: undefined
    }, _this._onMouse = function (hover) {
      if (hover !== _this.state.hover) {
        _this.setState({ hover: hover });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ZoomControl.prototype.render = function render() {
    var _props = this.props;
    var onControlClick = _props.onControlClick;
    var zoomDiff = _props.zoomDiff;
    var position = _props.position;
    var style = _props.style;
    var hover = this.state.hover;
    var map = this.context.map;


    return _react2.default.createElement(
      "div",
      {
        style: _extends({}, containerStyle, positions[position], style) },
      _react2.default.createElement("button", {
        style: _extends({}, buttonStyle, buttonStylePlus, hover === PLUS && buttonStyleHovered),
        onMouseOver: this._onMouse.bind(this, PLUS),
        onMouseOut: this._onMouse,
        onClick: onControlClick.bind(this, map, zoomDiff) }),
      _react2.default.createElement("button", {
        style: _extends({}, buttonStyle, buttonStyleMinus, hover === MINUS && buttonStyleHovered),
        onMouseOver: this._onMouse.bind(this, MINUS),
        onMouseOut: this._onMouse,
        onClick: onControlClick.bind(this, map, -zoomDiff) })
    );
  };

  return ZoomControl;
}(_react.Component), _class.propTypes = {
  zoomDiff: _react.PropTypes.number,
  onControlClick: _react.PropTypes.func,
  position: _react.PropTypes.oneOf(POSITIONS),
  style: _react.PropTypes.object
}, _class.defaultProps = {
  position: POSITIONS[0],
  zoomDiff: 0.5,
  onControlClick: function onControlClick(map, zoomDiff) {
    map.setZoom(map.getZoom() + zoomDiff);
  }
}, _class.contextTypes = {
  map: _react.PropTypes.object
}, _temp2);
exports.default = ZoomControl;