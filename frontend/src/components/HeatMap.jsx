import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/heatmap.css";

// TODO,bug with areas where the height is a bit larger than the width.
const HeatMap = ({ heatMapImage }) => {

  const heatmapLayout = {
    autosize: true,
    margin: { l: 10, r: 10, b: 40, t: 25 },
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
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
    showlegend: false,
  };

  const heatmapConfig = {
    // displayModeBar: true,
    // responsive: true,
    // responsive: false,
    displaylogo: false,
    scrollZoom: false,
    toImageButtonOptions: { format: 'png', filename: 'polaris_heatmap' },
    modeBarButtonsToRemove: ["resetScale",],
  };

//   const styledData = heatMapImage.data.map(trace => ({
//   ...trace,
//   zmin: 180, 
//   zmax: 330,
// }));
  // 95C = 368.15K
  // 56.7C = 329.85K  <-- highest temperature ever recorded
  // -90C = 183.15K   <-- lowest temperature ever recorded

  return (
    <div className="heat_map">
      {heatMapImage && Object.keys(heatMapImage).length > 0 ? (
        <div classname="hm_plotly">
          <Plot
            className="hm_plotly"
            data={heatMapImage.data}
            layout={heatmapLayout}
            frames={heatMapImage.frames}
            config={heatmapConfig} 
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
            />
        </div>
      ) : (
        <div className="hm_plotly">
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