import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import RadioButtonsCol from "../RadioCol";

const TemporalPredicateControls = ({ startDate, endDate, setStartDate, setEndDate, formData, handleChange }) => (
  <div className="control_section">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date Time"
            ampm={false}
            value={startDate}
            minDateTime={dayjs("2015-01-01T00:00")}
            maxDateTime={dayjs("2024-12-31T23:00")}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DateTimePicker
            label="End Date Time"
            ampm={false}
            value={endDate}
            minDateTime={dayjs("2015-01-01T01:00")}
            maxDateTime={dayjs("2024-12-31T23:00")}
            onChange={(newValue) => setEndDate(newValue)}
          />
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
