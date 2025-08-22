import { TextField } from "@mui/material";
import RadioButtonsRow from "../RadioRow";

const SpatialPredicateControls = ({ formData, handleChange }) => (
  <div className="control_section">
    <p className="section_title">Spatial Predicate</p>
    <div className="pred_value">
      {["north", "south", "east", "west"].map((dir) => (
        <TextField
          key={dir}
          label={dir.charAt(0).toUpperCase() + dir.slice(1)}
          size="small"
          type="number"
          value={formData[dir]}
          name={dir}
          onChange={handleChange}
        />
      ))}
    </div>
    <RadioButtonsRow
      label="Resolution (degree)"
      options={[0.25, 0.5, 1]}
      var={formData.spatialResolution}
      setVal={handleChange}
      subLabel="spatialResolution"
      defaultValue={1}
    />
  </div>
);

export default SpatialPredicateControls;
