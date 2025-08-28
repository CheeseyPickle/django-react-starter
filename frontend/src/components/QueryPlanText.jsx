import PropTypes from "prop-types";


const QueryPlanText = ({ timeseriesTextOut, heatmapTextOut }) => {

    // Combine two lists stored in "local" value of dicts
    // local_files_list = timeseriesTextOut.local + heatmapTextOut.local

    // Get number of unique strings in local_files_list
    // num_unique_files = 

    // Combine two lists stored in "api" value of dicts
    // api_list = timeseriesTextOut.api + heatmapTextOut.api

    // Get number of years, months, days, hours in respective ranges. If range = [], return 0
    // year range in heatmapTextOut.year in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
    // num_years = end year - start year
    // month range in heatmapTextOut.month in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
    // num_months = end month - start month
    // day range in heatmapTextOut.day in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
    // num_days = end day - start day
    // hour range in heatmapTextOut.hour in [Timestamp('YYYY-MM-DD 00:00:00'), Timestamp('YYYY-MM-DD 23:00:00')] form
    // num_hours = end hour - start hour

    // Get total number of hours in years, months, days, and hours (round to the nearest hour)
    // total_hours = 8766*num_years + 730.001*num_months + 24*num_days + num_hours

    // Create and format text to the following:
    /*
    1. from local data read {num_years} yearly {num_months} monthy {num_days} daily {num_hours} hourly values for each spatial resolution.
            {num_years + num_months + num_days + num_hours} aggregate values read instead of {total_hours} unprocessed values
            {num_unique_files} files queried

    (if api_list = []:
    2. all data in local storage, no API calls
    )
    (if api_list != []:
    2. from remote repository request remaining data: {api_list}
            aggregate to desired resolutions
    )

    3. **Heatmap Query:** for each region aggregate all data over time
    4. **Timeseries Query:** for each time interval, aggregate all data over region

    5. **Find Area Query:** filter heatmap query result by filter predicate and value
    6. **Find Time Query:** filter timeseries query result by filter predicate and value
    */


}

export default QueryPlanText