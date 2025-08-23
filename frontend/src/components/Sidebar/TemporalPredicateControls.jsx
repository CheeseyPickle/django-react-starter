import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import RadioButtonsCol from "../RadioCol";

const TemporalPredicateControls = ({ startDate, endDate, setStartDate, setEndDate, formData, handleChange }) => (
  <div className="control_section">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="row_wrapper">
          <DateTimePicker
            label="Start Date"
            ampm={false}
            value={startDate ? dayjs(startDate) : null}
            minDateTime={dayjs("2015-01-01T00:00")}
            maxDateTime={dayjs("2024-12-31T23:00")}
            onChange={(newValue) => setStartDate(newValue ? newValue.format("YYYY-MM-DD HH:mm") : null)}
          />
          <DateTimePicker
            label="End Date"
            ampm={false}
            value={endDate ? dayjs(endDate) : null}
            minDateTime={dayjs("2015-01-01T01:00")}
            maxDateTime={dayjs("2024-12-31T23:00")}
            onChange={(newValue) => setEndDate(newValue ? newValue.format("YYYY-MM-DD HH:mm") : null)}
          />
        </div>
      </LocalizationProvider>
      <RadioButtonsCol
        label="Resolution"
        options={["hour", "day", "month", "year"]}
        var={formData.temporalResolution}
        setVal={handleChange}
        subLabel="temporalResolution"
        defaultValue="year"
      />
    </div>
);

export default TemporalPredicateControls;
