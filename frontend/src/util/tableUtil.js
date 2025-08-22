import { VARIABLES, REGIONS } from "../constants/data";

export function buildTableData() {
  const data = {};
  Object.keys(REGIONS).forEach(region => {
    VARIABLES.forEach(variable => {
      data[`${variable} (${region})`] = {
        variable,
        spatialRegion: region,
        ...REGIONS[region],
        spatialResolution: "0.25°, 0.5°, 1°",
        temporalRange: "2015-2024",
        temporalResolution: "hour, day, month, year",
      };
    });
  });
  return data;
}
