"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _mapboxGl = require("mapbox-gl/dist/mapbox-gl");

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require("./helper");

var _feature = require("./feature");

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var index = 0;
var generateID = function generateID() {
  return index++;
};

var Layer = (_temp2 = _class = function (_Component) {
  _inherits(Layer, _Component);

  function Layer() {
    var _temp, _this, _ret;

    _classCallCheck(this, Layer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.hover = [], _this.id = _this.props.id || "layer-" + generateID(), _this.source = new _mapboxGl2.default.GeoJSONSource(_extends({}, _this.props.sourceOptions, {
      data: {
        type: "FeatureCollection",
        features: []
      }
    })), _this.geometry = function (coordinates) {
      switch (_this.props.type) {
        case "symbol":
        case "circle":
          return {
            type: "Point",
            coordinates: coordinates
          };

        case "fill":
          return {
            type: coordinates.length > 1 ? "MultiPolygon" : "Polygon",
            coordinates: coordinates
          };

        case "line":
          return {
            type: "LineString",
            coordinates: coordinates
          };

        default:
          return null;
      }
    }, _this.feature = function (props, id) {
      return {
        type: "Feature",
        geometry: _this.geometry(props.coordinates),
        properties: _extends({}, props.properties, {
          id: id
        })
      };
    }, _this.onClick = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this2 = _this;
      var id = _this2.id;


      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      for (var _iterator = features, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var feature = _ref;
        var properties = feature.properties;

        var child = children[properties.id];

        var onClick = child && child.props.onClick;
        onClick && onClick(_extends({}, evt, {
          feature: feature,
          map: map
        }));
      }
    }, _this.onMouseMove = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this3 = _this;
      var id = _this3.id;


      var oldHover = _this.hover;
      var hover = [];

      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      for (var _iterator2 = features, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var feature = _ref2;
        var properties = feature.properties;

        var child = children[properties.id];
        hover.push(properties.id);

        var onHover = child && child.props.onHover;
        onHover && onHover(_extends({}, evt, {
          feature: feature,
          map: map
        }));
      }

      oldHover.filter(function (prevHoverId) {
        return hover.indexOf(prevHoverId) === -1;
      }).forEach(function (id) {
        var onEndHover = children[id] && children[id].props.onEndHover;
        onEndHover && onEndHover(_extends({}, evt, {
          map: map
        }));
      });

      _this.hover = hover;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Layer.prototype.componentWillMount = function componentWillMount() {
    var id = this.id;
    var source = this.source;
    var _props = this.props;
    var type = _props.type;
    var layout = _props.layout;
    var paint = _props.paint;
    var layerOptions = _props.layerOptions;
    var sourceId = _props.sourceId;
    var map = this.context.map;


    var layer = _extends({
      id: id,
      source: sourceId || id,
      type: type,
      layout: layout,
      paint: paint
    }, layerOptions);

    if (!sourceId) {
      map.addSource(id, source);
    }

    map.addLayer(layer);

    map.on("click", this.onClick);
    map.on("mousemove", this.onMouseMove);
  };

  Layer.prototype.componentWillUnmount = function componentWillUnmount() {
    var id = this.id;
    var map = this.context.map;


    map.removeLayer(id);
    map.removeSource(id);

    map.off("click", this.onClick);
    map.off("mousemove", this.onMouseMove);
  };

  Layer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _this4 = this;

    var _props2 = this.props;
    var paint = _props2.paint;
    var layout = _props2.layout;


    if (!_lodash2.default.isEqual(props.paint, paint)) {
      _lodash2.default.forEach((0, _helper.diff)(paint, props.paint), function (val, key) {
        _this4.context.map.setPaintProperty(_this4.id, key, val);
      });
    }

    if (!_lodash2.default.isEqual(props.layout, layout)) {
      _lodash2.default.forEach((0, _helper.diff)(layout, props.layout), function (val, key) {
        _this4.context.map.setLayoutProperty(_this4.id, key, val);
      });
    }
  };

  Layer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !_lodash2.default.isEqual(nextProps.children, this.props.children) || !_lodash2.default.isEqual(nextProps.paint, this.props.paint) || !_lodash2.default.isEqual(nextProps.layout, this.props.layout);
  };

  Layer.prototype.render = function render() {
    var _this5 = this;

    if (this.props.children) {
      var children = [].concat(this.props.children);

      var features = children.map(function (_ref3, id) {
        var props = _ref3.props;
        return _this5.feature(props, id);
      }).filter(Boolean);

      console.log('test', this.source);
      this.source.setData({
        type: "FeatureCollection",
        features: features
      });
    }

    return null;
  };

  return Layer;
}(_react.Component), _class.contextTypes = {
  map: _react.PropTypes.object
}, _class.propTypes = {
  id: _react.PropTypes.string,

  type: _react.PropTypes.oneOf(["symbol", "line", "fill", "circle"]),

  layout: _react.PropTypes.object,
  paint: _react.PropTypes.object,
  sourceOptions: _react.PropTypes.object,
  layerOptions: _react.PropTypes.object,
  sourceId: _react.PropTypes.string
}, _class.defaultProps = {
  type: "symbol",
  layout: {},
  paint: {}
}, _temp2);
exports.default = Layer;