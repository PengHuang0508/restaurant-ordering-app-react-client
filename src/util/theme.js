export default {
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: 'rgba(185, 235, 225, 1)',
      main: 'rgba(149, 225, 211, 1)',
      dark: 'rgba(115, 210, 190, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(245, 165, 165, 1)',
      main: 'rgba(243, 129, 129, 1)',
      dark: 'rgba(225, 100, 100, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  form: {
    formContainer: {
      backgroundColor: '#eee',
      padding: '50px',
      textAlign: 'center'
    },
    image: {
      borderRadius: '50%',
      maxWidth: 100
    },
    pageTitle: {
      margin: '10px auto'
    },
    textField: {
      margin: '10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    generalError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    }
  }
};
