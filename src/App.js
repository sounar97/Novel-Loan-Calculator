import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";
import { AppProvider, AppContext } from "./context/AppContext";
import { useContext } from "react";

// Create a component that wraps the theme provider
function ThemeWrapper({ children }) {
  const { theme } = useContext(AppContext);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      ...(theme === 'dark' ? {
        // Dark mode overrides
        primary: { main: '#90caf9' },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      } : {
        // Light mode overrides
        primary: { main: '#1976d2' },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5',
        },
      }),
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeWrapper>
    </AppProvider>
  );
}

export default App;