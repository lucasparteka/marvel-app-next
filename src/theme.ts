import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        border: 'none',
      },

    },
    MuiInput: {
      root: {
        color: 'white',
        borderBottom: '3px solid white',
        '&:hover:not($disabled)': {
          borderColor: 'white',
          borderBottom: '3px solid white',
        },
        '& > svg': {
          color: 'white',
        },
      }
    },
    //@ts-ignore
    MuiAutocomplete: {
      root: {
        border: 'none'
      },
      endAdornment: {
        display: 'none'
      }
    },
    MuiTabs: {
      flexContainer: {
        display: 'list-item',
        whiteSpace: 'pre-line'
      }
    }
  },

  palette: {
    secondary: {
      main: '#FFF',

    },
    background: {
      default: '#202020',
    },
  },

});

export default theme;
