import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/heatmap.css";

// TODO,bug with areas where the height is a bit larger than the width.
const HeatMap = ({ heatMapImage }) => {

  const heatmapLayout = {
    autosize: true,
    margin: { l: 0, r: 0, b: 25, t: 25 },
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
      scaleratio: 4,
      showgrid: false
    },
    hovermode: 'closest',
    showlegend: false
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
            config={heatmapConfig} />
      ) : (
        <div className="hm_plot">
          No Heat Map Data
        </div>
      )}
    </div>
  )
}

HeatMap.propTypes = {
  heatMapImage: PropTypes.object,
}

export default HeatMap;