import MapboxGl from "mapbox-gl/dist/mapbox-gl";
import React, { Component, PropTypes } from "react";

export default class ReactMapboxGl extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    accessToken: PropTypes.string.isRequired,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    containerStyle: PropTypes.object,
    hash: PropTypes.bool,
    preserveDrawingBuffer: PropTypes.bool,
    onClick: PropTypes.func,
    onStyleLoad: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMoveStart: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
    onMouseUp: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    scrollZoom: PropTypes.bool,
    movingMethod: PropTypes.oneOf([
      "jumpTo",
      "easeTo",
      "flyTo"
    ])
  };

  static defaultProps = {
    hash: false,
    preserveDrawingBuffer: false,
    center: [
      -0.2416815,
      51.5285582
    ],
    zoom: 11,
    scrollZoom: true,
    movingMethod: "flyTo"
  };

  static childContextTypes = {
    map: React.PropTypes.object
  };

  state = {};

  getChildContext = () => ({
    map: this.state.map
  });

  state = {};

  componentDidMount() {
    const {
      style,
      hash,
      preserveDrawingBuffer,
      accessToken,
      center,
      zoom,
      onStyleLoad,
      onClick,
      onMouseMove,
      onDragStart,
      onDrag,
      onMouseUp,
      onMove,
      onMoveStart,
      onMoveEnd,
      scrollZoom
    } = this.props;

    MapboxGl.accessToken = accessToken;

    const map = new MapboxGl.Map({
      preserveDrawingBuffer,
      hash,
      zoom,
      container: this.refs.mapboxContainer,
      center,
      style,
      scrollZoom
    });

    map.on("style.load", (...args) => {
      this.setState({ map });

      if (onStyleLoad) {
        onStyleLoad(map, ...args);
      }
    });

    map.on("click", (...args) => {
      if (onClick) {
        onClick(map, ...args);
      }
    });

    map.on("mousemove", (...args) => {
      if (onMouseMove) {
        onMouseMove(map, ...args);
      }
    });

    map.on("dragstart", (...args) => {
      if (onDragStart) {
        onDragStart(map, ...args);
      }
    });

    map.on("drag", (...args) => {
      if (onDrag) {
        onDrag(map, ...args);
      }
    });

    map.on("mouseup", (...args) => {
      if (onMouseUp) {
        onMouseUp(map, ...args);
      }
    });

    map.on("movestart", (...args) => {
      if (onMoveStart) {
        onMoveStart(map, ...args);
      }
    });

    map.on("move", (...args) => {
      if (onMove) {
        onMove(map, ...args);
      }
    });

    map.on("moveend", (...args) => {
      if (onMoveEnd) {
        onMoveEnd(map, ...args);
      }
    });
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.off();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.containerStyle !== this.props.containerStyle ||
      nextState.map !== this.state.map
    );
  }

  componentWillReceiveProps(nextProps) {
    const { map } = this.state;
    if (!map) {
      return null;
    }

    const center = map.getCenter();
    const zoom = map.getZoom();

    const didZoomUpdate = (
      this.props.zoom !== nextProps.zoom &&
      nextProps.zoom !== map.getZoom()
    );

    const didCenterUpdate = (
      this.props.center !== nextProps.center &&
      nextProps.center !== map.getCenter()
    );

    if (didZoomUpdate || didCenterUpdate) {
      map[this.props.movingMethod]({
        zoom: didZoomUpdate ? nextProps.zoom : zoom,
        center: didCenterUpdate ? nextProps.center : center
      });
    }
  }

  render() {
    const { containerStyle, children } = this.props;
    const { map } = this.state;

    return (
      <div ref="mapboxContainer" style={containerStyle}>
        {
          map && children
        }
      </div>
    );
  }
}
