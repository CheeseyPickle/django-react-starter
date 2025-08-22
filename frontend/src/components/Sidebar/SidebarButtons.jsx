import { Button } from "@mui/material";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#BAD4DC',
      light: '#F4F7F0',
      dark: '#4999BB',
      contrastText: '#242105',
    },
  },
});


const SidebarButtons = ({ isLoading, queryData, showInfo, setShowInfo }) => (
  <div className="half_column_wrapper">
    <Button
      onClick={queryData}
      variant="contained"
      color="custom"
      disabled={isLoading}
      className="query_button"
    >
      <div className="button-content">
        {isLoading && <div className="loading-spinner" />}
        Query Data
      </div>
    </Button>
    <Button
      variant="outlined"
      color="custom"
      onClick={() => setShowInfo(!showInfo)}
    >
      Available Data
    </Button>
  </div>
);

export default SidebarButtons;
