import PropTypes from "prop-types";
import Plot from 'react-plotly.js';
import "../styles/timeseries.css"

const TimeSeries = ({ timeSeriesImage }) => {

  const defaultLayout = {
    ...timeSeriesImage.layout,
    autosize: true,
    margin: { l: 0, r: 0, b: 25, t: 25 },
    xaxis: {
      title: 'Time',
      automargin: true,
    },
    yaxis: {
      title: 'Value',
      automargin: true,
    }
  };

  const defaultConfig = {
    displayModeBar: true,
    responsive: true,
    displaylogo: false,
    toImageButtonOptions: {
      format: 'png',
      filename: 'plot_image'
    },
  modeBarButtonsToRemove: ["resetScale", "lasso2d", "select2d"],
  };

  // TODO: Add warning if temporal res is less than date start/end differences
  return (
    <div className="time_series">
      {timeSeriesImage && Object.keys(timeSeriesImage).length > 0 ? (
        <div className='ts_plot'>
          <Plot
            className='ts_plotly'
            data={timeSeriesImage.data}
            layout={defaultLayout}
            frames={timeSeriesImage.frames}
            config={defaultConfig} />
        </div>
      ) : (
        <div className='ts_plot'>No Time Series Data</div>
      )}
    </div>
  )
}

TimeSeries.propTypes = {
  timeSeriesImage: PropTypes.object,
}

export default TimeSeries