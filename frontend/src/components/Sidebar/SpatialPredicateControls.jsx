import { TextField } from "@mui/material";
import RadioButtonsRow from "../RadioRow";
const SpatialPredicateControls = ({ formData, handleChange }) => (
  <div className="control_section">
    <div className="pred_value" >
      <TextField
        id="outlined-number"
        label="North"
        size={"small"}
        // sx={{ width: "25%",}}
        type="number"
        value={formData.north}
        name="north"
        onChange={handleChange}
        max="90"
        min="-90" 
      />
      <TextField
        id="outlined-number"
        label="South"
        size={"small"}
        // sx={{ width: "25%",}}
        type="number"
        value={formData.south}
        name="south"
        onChange={handleChange}
        max="90"
        min="-90" 
      />
      <TextField
        id="outlined-number"
        label="East"
        size={"small"}
        // sx={{ width: "25%",}}
        type="number"
        value={formData.east}
        name="east"
        onChange={handleChange}
        max="180"
        min="-180"
      />
      <TextField
        id="outlined-number"
        label="West"
        size={"small"}
        // sx={{ width: "25%",}}
        type="number"
        value={formData.west}
        name="west"
        onChange={handleChange}
        max="180"
        min="-180" 
      />
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


// import { TextField } from "@mui/material";
// import RadioButtonsRow from "../RadioRow";

// const SpatialPredicateControls = ({ formData, handleChange }) => (
//   <div className="control_section">
//   <div className="pred_value">
//       {["north", "south", "east", "west"].map((dir) => (
//         <TextField
//           key={dir}
//           label={dir.charAt(0).toUpperCase() + dir.slice(1)}
//           size="small"
//           type="number"
//           value={formData[dir]}
//           name={dir}
//           onChange={handleChange}
//         />
//       ))}
//     </div>
//     <RadioButtonsRow
//       label="Resolution (degree)"
//       options={[0.25, 0.5, 1]}
//       var={formData.spatialResolution}
//       setVal={handleChange}
//       subLabel="spatialResolution"
//       defaultValue={1}
//     />
//   </div>
// );

// export default SpatialPredicateControls;
