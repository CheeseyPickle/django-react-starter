import PropTypes from "prop-types";
import { parseISO, differenceInYears, differenceInMonths, differenceInDays, differenceInHours } from "date-fns";

const QueryPlanText = ({ timeseriesTextOut, heatmapTextOut }) => {
  // Combine local lists
  const localFilesList = [
    ...(timeseriesTextOut.local || []),
    ...(heatmapTextOut.local || []),
  ];
  const numUniqueFiles = new Set(localFilesList).size;

  // Combine api lists
  const apiList = [
    ...(timeseriesTextOut.api || []),
    ...(heatmapTextOut.api || []),
  ];

  // Helper to calculate range count (return 0 if empty)
  const calcRange = (range, unit) => {
    if (!range || range.length < 2) return 0;
    const [start, end] = range.map((t) => parseISO(t));
    switch (unit) {
      case "years":
        return differenceInYears(end, start) || 0;
      case "months":
        return differenceInMonths(end, start) || 0;
      case "days":
        return differenceInDays(end, start) || 0;
      case "hours":
        return differenceInHours(end, start) || 0;
      default:
        return 0;
    }
  };

  // Calculate ranges from heatmapTextOut
  const numYears = calcRange(heatmapTextOut.year, "years");
  const numMonths = calcRange(heatmapTextOut.month, "months");
  const numDays = calcRange(heatmapTextOut.day, "days");
  const numHours = calcRange(heatmapTextOut.hour, "hours");

  // Total hours (rounded)
  const totalHours = Math.round(
    8766 * numYears + 730.001 * numMonths + 24 * numDays + numHours
  );

  // Build output text
  const textLines = [];
  textLines.push(
    `1. from local data read ${numYears} yearly ${numMonths} monthly ${numDays} daily ${numHours} hourly values for each spatial resolution.`
  );
  textLines.push(
    `   ${numYears + numMonths + numDays + numHours} aggregate values read instead of ${totalHours} unprocessed values`
  );
  textLines.push(`   ${numUniqueFiles} files queried`);

  if (apiList.length === 0) {
    textLines.push(`\n2. all data in local storage, no API calls`);
  } else {
    textLines.push(
      `\n2. from remote repository request remaining data: ${apiList.join(", ")}`
    );
    textLines.push(`   aggregate to desired resolutions`);
  }

  textLines.push("\n3. **Heatmap Query:** for each region aggregate all data over time");
  textLines.push(
    "4. **Timeseries Query:** for each time interval, aggregate all data over region"
  );
  textLines.push(
    "\n5. **Find Area Query:** filter heatmap query result by filter predicate and value"
  );
  textLines.push(
    "6. **Find Time Query:** filter timeseries query result by filter predicate and value"
  );

  return <pre>{textLines.join("\n")}</pre>;
};

QueryPlanText.propTypes = {
  timeseriesTextOut: PropTypes.shape({
    local: PropTypes.arrayOf(PropTypes.string),
    api: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  heatmapTextOut: PropTypes.shape({
    local: PropTypes.arrayOf(PropTypes.string),
    api: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.arrayOf(PropTypes.string),
    month: PropTypes.arrayOf(PropTypes.string),
    day: PropTypes.arrayOf(PropTypes.string),
    hour: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default QueryPlanText;


// import PropTypes from "prop-types";


// const QueryPlanText = ({ timeseriesTextOut, heatmapTextOut }) => {

//     // Combine two lists stored in "local" value of dicts
//     // local_files_list = timeseriesTextOut.local + heatmapTextOut.local

//     // Get number of unique strings in local_files_list
//     // num_unique_files = 

//     // Combine two lists stored in "api" value of dicts
//     // api_list = timeseriesTextOut.api + heatmapTextOut.api

//     // Get number of years, months, days, hours in respective ranges. If range = [], return 0
//     // year range in heatmapTextOut.year in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
//     // num_years = end year - start year
//     // month range in heatmapTextOut.month in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
//     // num_months = end month - start month
//     // day range in heatmapTextOut.day in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
//     // num_days = end day - start day
//     // hour range in heatmapTextOut.hour in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
//     // num_hours = end hour - start hour

//     // Get total number of hours in years, months, days, and hours (round to the nearest hour)
//     // total_hours = 8766*num_years + 730.001*num_months + 24*num_days + num_hours

//     // Create and format text to the following:
//     /*
//     1. from local data read {num_years} yearly {num_months} monthy {num_days} daily {num_hours} hourly values for each spatial resolution.
//             {num_years + num_months + num_days + num_hours} aggregate values read instead of {total_hours} unprocessed values
//             {num_unique_files} files queried

//     (if api_list = []:
//     2. all data in local storage, no API calls
//     )
//     (if api_list != []:
//     2. from remote repository request remaining data: {api_list}
//             aggregate to desired resolutions
//     )

//     3. **Heatmap Query:** for each region aggregate all data over time
//     4. **Timeseries Query:** for each time interval, aggregate all data over region

//     5. **Find Area Query:** filter heatmap query result by filter predicate and value
//     6. **Find Time Query:** filter timeseries query result by filter predicate and value
//     */


// }

// export default QueryPlanText