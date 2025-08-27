import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/findtime.css";

const FindTime = ({ findTimeImage }) => {
  // const fig = findTimeImage?.figure ? findTimeImage.figure : findTimeImage || {};
  // const layoutFromServer = fig?.layout || {};

  const findTimeLayout = {
    // ...layoutFromServer,
    xaxis: {
      title: "Time",
      showgrid: true,
    },
    yaxis: {
      visible: false
    },
    showlegend: true,
    legend: {
      font: { size: 12 },
      x: 0.02,
      y: 0.02,
      xanchor: "left",
      yanchor: "bottom",
    },
    margin: { t: 25, l: 10, r: 10, b: 40 },
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
  };

  const findTimeConfig = {
    responsive: false,
    scrollZoom: false,
    displaylogo: false,
    toImageButtonOptions: { format: "png", filename: "polaris_findtime" },
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomOut2d', 'zoomIn2d'],
  };

  return (
    <div className="find_time">
      {findTimeImage && Object.keys(findTimeImage).length > 0 ? (
        <div className="ft_plot">
          <Plot
            className="ft_plotly"
            data={findTimeImage.data}
            layout={findTimeLayout}
            frames={findTimeImage.frames}
            config={findTimeConfig}
            useResizeHandler
            style={{ width: "100%", height: "100%" }} 
            />
        </div>
      ) : (
        <div className="ft_plot">
          Boolean of values with respect to the Find Control Value and Predicate.
        </div>
      )}
    </div>
  )
}

FindTime.propTypes = {
  findTimeImage: PropTypes.object,
}

export default FindTime;