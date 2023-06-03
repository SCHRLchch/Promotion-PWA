import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Calc from "./components/Calc";
import themes from "./data/themes";
import Setting from "./components/Setting";
import NavBar from "./components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Auth } from "./components/auth";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

function App() {
  const [theme, setTheme] = useState("materialDark");
  const [user, loading] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && themes[storedTheme]) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  useEffect(() => {
    localStorage.setItem("grades", []);
  }, []);

  const toggleTheme = (selectedTheme) => {
    if (themes[selectedTheme]) {
      setTheme(selectedTheme);
      localStorage.setItem("theme", selectedTheme);
    }
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        {isLoggedIn ? (
          <>
            <Routes>
              <Route exact path="/" element={<Calc />} />
              <Route
                path="/settings"
                element={
                  <Setting selectedTheme={theme} onThemeChange={toggleTheme} />
                }
              />
            </Routes>
            <NavBar />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
