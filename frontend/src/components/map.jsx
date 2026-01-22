import { useRef, useEffect, useState, useContext } from "react";
import { Map, TileLayer, FeatureGroup, ScaleControl, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import FullscreenControl from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";

import { BoundsContext } from "../util/context/BoundsContext";
import "../styles/map.css";

window.type = true;

const MyMap = ({ sidebarCollapsed, bottomBarCollapsed }) => {
  const { drawnShapeBounds, setDrawnShapeBounds } = useContext(BoundsContext);
  const [editableFG, setEditableFG] = useState(null);
  const mapRef = useRef(null);

  // Ensure map resizes correctly with containers
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.leafletElement) return;

    const map = mapRef.current.leafletElement;
    const container = map.getContainer();

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: true });
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Redraw rectangle whenever bounds in context change
  useEffect(() => {
    if (!drawnShapeBounds || !editableFG || !editableFG.leafletElement) return;

    const fg = editableFG.leafletElement;
    fg.clearLayers();

    const southWest = [
      drawnShapeBounds._southWest.lat,
      drawnShapeBounds._southWest.lng,
    ];
    const northEast = [
      drawnShapeBounds._northEast.lat,
      drawnShapeBounds._northEast.lng,
    ];

    const rectangle = L.rectangle([southWest, northEast], {
      color: "#6C88B8",
      weight: 3,
    });
    rectangle.addTo(fg);
  }, [drawnShapeBounds, editableFG]);

  // When a rectangle is drawn
  const onCreated = (e) => {
    if (!editableFG || !editableFG.leafletElement) return;

    const fg = editableFG.leafletElement;
    fg.clearLayers();

    const layer = e.layer;
    fg.addLayer(layer);

    const bounds = layer.getBounds();
    setDrawnShapeBounds(bounds);
  };

  const onFeatureGroupReady = (reactFGref) => {
    setEditableFG(reactFGref);
  };

  return (
    <Map
      ref={mapRef}
      center={[75, -40]}
      zoom={1.5}
      zoomControl={false}
      minZoom={1.5}
      maxZoom={12}
      className="map-container"
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      <ScaleControl position="bottomleft" imperial />
      <FullscreenControl position="topleft" title="Show full screen" />

      <FeatureGroup ref={onFeatureGroupReady}>
        {/* Initial static polygon */}
        <Polygon positions={[[84, -74], [84, -10], [59, -10], [59, -74]]} color="blue" weight={1} />

        <EditControl
          position="topleft"
          onCreated={onCreated}
          edit={{ edit: false, remove: false }}
          draw={{
            rectangle: { shapeOptions: { color: "blue", weight: 1 } },
            polyline: false,
            circlemarker: false,
            circle: false,
            polygon: false,
            marker: false,
          }}
        />
      </FeatureGroup>
    </Map>
  );
};

export default MyMap;


// import { useRef, useEffect, useState, useContext } from "react";
// import { Map, TileLayer, FeatureGroup, ScaleControl, Polygon } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-draw/dist/leaflet.draw.css";
// import FullscreenControl from "react-leaflet-fullscreen";
// import "react-leaflet-fullscreen/dist/styles.css";

// import { BoundsContext } from "../util/context/BoundsContext";
// import "../styles/map.css";

// window.type = true;

// const MyMap = ({ sidebarCollapsed, bottomBarCollapsed }) => {
//   const { drawnShapeBounds, setDrawnShapeBounds } = useContext(BoundsContext);
//   const [editableFG, setEditableFG] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current || !mapRef.current.leafletElement) return;

//     const map = mapRef.current.leafletElement;
//     const container = map.getContainer();

//     const resizeObserver = new ResizeObserver(() => {
//       map.invalidateSize({ animate: true });
//     });

//     resizeObserver.observe(container);

//     return () => resizeObserver.disconnect();
//   }, []);

//   const onCreated = () => {
//     const drawnItems = editableFG.leafletElement._layers;
//     let lastLayerID = Object.keys(drawnItems)[0];
//     const bounds = drawnItems[lastLayerID]._bounds;
//     setDrawnShapeBounds(bounds);
//   };

//   const onFeatureGroupReady = (reactFGref) => {
//     setEditableFG(reactFGref);
//   };

//   return (
//     <Map
//       ref={mapRef}
//       center={[75, -40]}
//       zoom={1.5}
//       zoomControl={false}
//       minZoom={1.5}
//       maxZoom={12}
//       className="map-container"
//       maxBounds={[[-90, -180], [90, 180]]}
//       maxBoundsViscosity={1.0}
//     >
//       <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
//       <ScaleControl position="bottomleft" imperial />
//       <FullscreenControl position="topleft" title="Show full screen" />

//       <FeatureGroup ref={onFeatureGroupReady}>
//         <Polygon positions={[[84, -74], [84, -10], [59, -10], [59, -74]]} color="blue" weight={1} />
//         <EditControl
//           position="topleft"
//           onCreated={onCreated}
//           edit={{ edit: false, remove: false }}
//           draw={{
//             rectangle: { shapeOptions: { color: "blue", weight: 1 } },
//             polyline: false,
//             circlemarker: false,
//             circle: false,
//             polygon: false,
//             marker: false,
//           }}
//         />
//       </FeatureGroup>
//     </Map>
//   );
// };

// export default MyMap;
