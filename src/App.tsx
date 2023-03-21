import { SnackbarProvider } from 'notistack';
import Router from './Router';
import ThemeProvider from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
