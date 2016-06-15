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

var scales = [.01, .02, .05, .1, .2, .5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2 * 1000, 5 * 1000, 10 * 1000];

var positions = {
  topRight: { top: 10, right: 10, bottom: "auto", left: "auto" },
  topLeft: { top: 10, left: 10, bottom: "auto", right: "auto" },
  bottomRight: { bottom: 10, right: 10, top: "auto", left: "auto" },
  bottomLeft: { bottom: 10, left: 10, top: "auto", right: "auto" }
};

var containerStyle = {
  position: "absolute",
  zIndex: 2,
  boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  right: 50,
  backgroundColor: "#fff",
  opacity: .85,
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  padding: "3px 7px"
};

var scaleStyle = {
  border: "2px solid #7e8490",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, .3)",
  borderTop: "none",
  height: 7,
  borderBottomLeftRadius: 1,
  borderBottomRightRadius: 1
};

var POSITIONS = Object.keys(positions);

var MEASUREMENTS = ["km", "mi"];

var MILE_IN_KILOMETERS = 1.60934;
var MILE_IN_FEET = 5280;
var KILOMETER_IN_METERS = 1000;

var MIN_WIDTH_SCALE = 40;

var ScaleControl = (_temp2 = _class = function (_Component) {
  _inherits(ScaleControl, _Component);

  function ScaleControl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ScaleControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      chosenScale: false,
      scaleWidth: MIN_WIDTH_SCALE
    }, _this._setScale = function (map) {
      var measurement = _this.props.measurement;

      var clientWidth = map._canvas.canvas.clientWidth;

      var _map$getBounds = map.getBounds();

      var _ne = _map$getBounds._ne;
      var _sw = _map$getBounds._sw;


      var totalWidth = _this._getDistanceTwoPoints([_sw.lng, _ne.lat], [_ne.lng, _ne.lat], measurement);
      var relativeWidth = totalWidth / clientWidth * MIN_WIDTH_SCALE;

      var chosenScale = scales.reduce(function (acc, curr) {
        return acc || curr > relativeWidth && curr;
      }, 0);
      var canvasWidth = map._canvas.canvas.width;
      var scaleWidth = chosenScale / totalWidth * map._canvas.canvas.width;

      _this.setState({
        chosenScale: chosenScale,
        scaleWidth: scaleWidth
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ScaleControl.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var map = this.context.map;

    this._setScale(map);

    map.on("zoomend", function () {
      _this2._setScale(map);
    });
  };

  ScaleControl.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.state.map) {
      this.state.map.off();
    }
  };

  ScaleControl.prototype._getDistanceTwoPoints = function _getDistanceTwoPoints(x, y) {
    var measurement = arguments.length <= 2 || arguments[2] === undefined ? "km" : arguments[2];
    var lng1 = x[0];
    var lat1 = x[1];
    var lng2 = y[0];
    var lat2 = y[1];

    // Radius of the earth in km or miles

    var R = measurement === "km" ? 6371 : 6371 / MILE_IN_KILOMETERS;
    var dLat = this._deg2rad(lat2 - lat1);
    var dLng = this._deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  };

  ScaleControl.prototype._deg2rad = function _deg2rad(deg) {
    return deg * (Math.PI / 180);
  };

  ScaleControl.prototype._displayMeasurement = function _displayMeasurement(measurement, chosenScale) {
    if (chosenScale >= 1) {
      return chosenScale + " " + measurement;
    }

    if (measurement === "mi") {
      return Math.floor(chosenScale * MILE_IN_FEET) + " ft";
    }

    return Math.floor(chosenScale * KILOMETER_IN_METERS) + " m";
  };

  ScaleControl.prototype.render = function render() {
    var _props = this.props;
    var measurement = _props.measurement;
    var style = _props.style;
    var position = _props.position;
    var _state = this.state;
    var chosenScale = _state.chosenScale;
    var scaleWidth = _state.scaleWidth;


    return _react2.default.createElement(
      "div",
      { style: _extends({}, containerStyle, positions[position], style) },
      _react2.default.createElement("div", {
        style: _extends({}, scaleStyle, {
          width: scaleWidth
        }) }),
      _react2.default.createElement(
        "div",
        { style: { paddingLeft: 10 } },
        this._displayMeasurement(measurement, chosenScale)
      )
    );
  };

  return ScaleControl;
}(_react.Component), _class.contextTypes = {
  map: _react.PropTypes.object
}, _class.propTypes = {
  measurement: _react.PropTypes.oneOf(MEASUREMENTS),
  style: _react.PropTypes.object,
  position: _react.PropTypes.string
}, _class.defaultProps = {
  measurement: MEASUREMENTS[0],
  position: POSITIONS[2]
}, _temp2);
exports.default = ScaleControl;