import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/heatmap.css";

// TODO,bug with areas where the height is a bit larger than the width.
const HeatMap = ({ heatMapImage }) => {

  const heatmapLayout = {
    autosize: true,
    margin: { l: 10, r: 10, b: 40, t: 25 },
    xaxis: {
      title: { text: 'Longitude' },
      automargin: true,
      constrain: 'domain',
      showgrid: false
    },
    yaxis: {
      title: { text: 'Latitude' },
      automargin: true,
      scaleanchor: "x",
      scaleratio: 5,
      showgrid: false
    },
    hovermode: 'closest',
    showlegend: true,
    legend: {
      font: { size: 12 },
      x: 0.02,
      y:0.02,
      xanchor: "left",
      yanchor: "bottom",
    },
  };

  const heatmapConfig = {
    displayModeBar: true,
    responsive: true,
    displaylogo: false,
    scrollZoom: false,
    toImageButtonOptions: {
      format: 'png',
      filename: 'heatmap_image'
    },
    modeBarButtonsToRemove: ["resetScale"],
  };

  return (
    <div className="heat_map">
      {heatMapImage && Object.keys(heatMapImage).length > 0 ? (
          <Plot
            className="hm_plotly"
            data={heatMapImage.data}
            layout={heatmapLayout}
            frames={heatMapImage.frames}
            config={heatmapConfig} 
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
            />
      ) : (
        <div className="hm_plot">
          Values aggregated over time.
        </div>
      )}
    </div>
  )
}

HeatMap.propTypes = {
  heatMapImage: PropTypes.object,
}

export default HeatMap;