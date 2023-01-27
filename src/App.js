import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Error from "./Pages/Error";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppPage from "./Pages/AppPage";
import Account from "./Pages/Account";
import { AnimatePresence } from "framer-motion";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3333}
          hideIconVariant
          dense
          preventDuplicate
        >
          <Navbar />
          <div style={{ marginTop: 60, overflowX: "hidden" }}>
            <AnimatePresence mode="wait">
              <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/account" element={<Account />} />
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </SnackbarProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
