import { createTheme } from '@mui/material/styles';
import { Colors } from './colors';
import { darken, lighten } from 'polished';

export const DRAWER_WIDTH = 250;

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary
    },
    secondary: {
      main: Colors.secondary
    },
    error: {
      main: Colors.error
    },
    background: {
      default: '#F4F5FA'
    },
    text: {
      primary: '#3a3541'
    }
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiTooltip: {
      // defaultProps: {
      //   arrow: true
      // },
      styleOverrides: {
        tooltip: {
          background: Colors.primary
        }
        // arrow: {
        //   color: Colors.primary
        // }
      }
    },
    // MuiListItemText: {
    //   styleOverrides: {
    //     root: {
    //       padding: 0,
    //       margin: 0,
    //       borderColor: lighten(0.2, Colors.primary),
    //       color: 'red'
    //     }
    //   }
    // },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DRAWER_WIDTH,
          background: Colors.primary,
          color: Colors.secondary,
          //borderRadius: '0px 100px 0px 0px',
          borderRight: `1px solid ${Colors.primary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    }
  }
});

export default theme;
