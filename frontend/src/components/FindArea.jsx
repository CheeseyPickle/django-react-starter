import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/findarea.css";

const FindArea = ({ findAreaImage, formData }) => {

  const bounds = [
    (formData.north + formData.south) / 2,
    (formData.east + formData.west) / 2,
  ]

  const findAreaLayout = {
    mapbox: {
      style: "white-bg",
      // TODO: Mess with these bounds a bit, right now it will update on any change on the main map.
      // Change this so that they only get updated on find area query. 
      center: { lat: bounds[0], lon: bounds[1] },
      zoom: 1,
      bounds: {
        east: 180,
        north: 90,
        west: -180,
        south: -90,
      },
      layers: [
        {
          below: "traces",
          sourcetype: "raster",
          source: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
          sourceattribution: "United States Geological Survey",
        }
      ],
    },
    margin: { r: 1, t: 5, l: 1, b: 10 },
    plot_bgcolor: "#BAD4DC",
    paper_bgcolor: "#BAD4DC",
    showlegend: true,
    legend: {
      font: { size: 12 },
      x: 0.02,
      y: 0.02,
      xanchor: "left",
      yanchor: "bottom",
    },
  };

  const findAreaConfig = {
    responsive: true,
    scrollZoom: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomOut2d', 'zoomIn2d'],
  };


  return (
    <div className="find_area">
      {findAreaImage && Object.keys(findAreaImage).length > 0 ? (
        <div className="fa_plot">
          <Plot
            className="fa_plotly"
            data={findAreaImage.data}
            layout={findAreaLayout}
            frames={findAreaImage.frames}
            config={findAreaConfig} 
            useResizeHandler
            style={{ width: "100%", height: "100%" }} 
            />
        </div>
      ) : (
        <div className="fa_plot">
          Boolean of values with respect to the Find Control Value and Predicate.
        </div>
      )}
    </div>
  )
}

FindArea.propTypes = {
  findAreaImage: PropTypes.object,
}

export default FindArea