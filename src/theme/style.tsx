import { lightGreen } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500],
      contrastText: '#fff',
    },
  },
});

export default theme;
