import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Error from "./Pages/Error";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppPage from "./Pages/AppPage";
import { AnimatePresence } from "framer-motion";
import { SnackbarProvider } from "notistack";
import ChangePassword from "./Pages/ChangePassword";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

export const UserContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const theme = useTheme();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3333}
        hideIconVariant
        dense
        preventDuplicate
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <Box
            sx={{
              marginTop: 6,
              background: theme.palette.mode === 'dark' ? 'url(/images/blob-scene-2.svg)' : 'url(/images/blob-scene-2-l.svg)',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 'calc(100vh - 134px)',
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="wait">
              <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Box>
          <Footer />
        </div>
      </SnackbarProvider>
    </UserContext.Provider>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
