import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { buildTableData } from "../../util/tableUtil";

const DataInfoDisplay = ({ showInfo, setShowInfo }) => {
  if (!showInfo) return null;

  const tableData = buildTableData();

  return (
    <div className="data-info-overlay">
      <div className="data-info-content">
        <div className="data-info-header">
          <h2>Available Data</h2>
          <Button onClick={() => setShowInfo(false)}>Close</Button>
        </div>
        <TableContainer component={Paper} style={{ maxHeight: "70vh", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Variable</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>North</TableCell>
                <TableCell>South</TableCell>
                <TableCell>East</TableCell>
                <TableCell>West</TableCell>
                <TableCell>Spatial Resolution</TableCell>
                <TableCell>Temporal Range</TableCell>
                <TableCell>Temporal Resolution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(tableData).map(([key, data], index) => (
                <TableRow key={index}>
                  <TableCell>{data.variable}</TableCell>
                  <TableCell>{data.spatialRegion}</TableCell>
                  <TableCell>{data.North}</TableCell>
                  <TableCell>{data.South}</TableCell>
                  <TableCell>{data.East}</TableCell>
                  <TableCell>{data.West}</TableCell>
                  <TableCell>{data.spatialResolution}</TableCell>
                  <TableCell>{data.temporalRange}</TableCell>
                  <TableCell>{data.temporalResolution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DataInfoDisplay;
