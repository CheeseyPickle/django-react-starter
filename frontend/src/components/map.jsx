import { useState, useContext, useEffect, useRef } from "react";
import {
  Map,
  TileLayer,
  FeatureGroup,
  ScaleControl,
  Polygon
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw"; 
import "leaflet-draw/dist/leaflet.draw.css";
import FullscreenControl from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";

import { BoundsContext } from "../util/context/BoundsContext";
import "../styles/map.css";

window.type = true; // leaflet-draw quirk

const MyMap = ({ sidebarCollapsed, bottomBarCollapsed }) => {
  const { drawnShapeBounds, setDrawnShapeBounds } = useContext(BoundsContext);
  const [editableFG, setEditableFG] = useState(null);
  const mapRef = useRef(null);

  // Re-invalidate map size when sidebar/bottombar change
  useEffect(() => {
    if (mapRef.current && mapRef.current.leafletElement) {
      setTimeout(() => {
        mapRef.current.leafletElement.invalidateSize();
      }, 300);
    }
  }, [sidebarCollapsed, bottomBarCollapsed]);

  const onCreated = () => {
    const drawnItems = editableFG.leafletElement._layers;
    let lastLayerID = Object.keys(drawnItems)[0];
    const bounds = drawnItems[lastLayerID]._bounds;
    setDrawnShapeBounds(bounds);
  };

  const onFeatureGroupReady = (reactFGref) => {
    setEditableFG(reactFGref);
  };

  const bounds = [[-90, -180], [90, 180]];
  const initialRectangleBounds = [
    [84, -74],
    [84, -10],
    [59, -10],
    [59, -74],
  ];

  return (
    <Map
      ref={mapRef}
      center={[75, -40]}
      zoom={1.5}
      zoomControl={false}
      minZoom={1.5}
      maxZoom={12}
      className="map-container"
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <ScaleControl position="bottomleft" imperial />
      <FullscreenControl position="topleft" title="Show full screen" />

      <FeatureGroup ref={onFeatureGroupReady}>
        <Polygon positions={initialRectangleBounds} color="blue" weight={1} />

        <EditControl
          position="topleft"
          onCreated={onCreated}
          edit={{ edit: false, remove: false }}
          draw={{
            rectangle: {
              shapeOptions: { color: "blue", weight: 1 },
            },
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
