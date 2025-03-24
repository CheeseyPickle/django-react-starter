import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/findtime.css";

const FindTime = ({ findTimeImage }) => {

  const findTimeLayout = {
    xaxis: {
      title: "Time",
      showgrid: true,
    },
    yaxis: {
      title: "Filter",
      showgrid: true,
    },
    showlegend: false,
    margin: { t: 10, l: 50, r: 0, b: 50 },
    plot_bgcolor: "#ffffff",
    paper_bgcolor: "#ffffff",
  };

  const findTimeConfig = {
    responsive: false,
    scrollZoom: false,
    displaylogo: false,
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
            config={findTimeConfig} />
        </div>
      ) : (
        <div className="ft_plot">
          No Find Time Data
        </div>
      )}
    </div>
  )
}

FindTime.propTypes = {
  findTimeImage: PropTypes.object,
}

export default FindTime;