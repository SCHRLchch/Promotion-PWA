import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import themes from "../data/themes";
import styled from "styled-components";

const Page = styled.div`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
  box-shadow: 0px 0px 13.8px rgba(0, 0, 0, 0.02),
    0px 0px 33.3px rgba(0, 0, 0, 0.028), 0px 0px 62.6px rgba(0, 0, 0, 0.035),
    0px 0px 111.7px rgba(0, 0, 0, 0.042), 0px 0px 208.9px rgba(0, 0, 0, 0.05),
    0px 0px 500px rgba(0, 0, 0, 0.07);
  height: 110vh;
  border-radius: 20px;
  @media only screen and (max-width: 900px) {
    width: 80vw;
  }
`;

const Title = styled.h1`
  margin: 20px 10px 20px 10px;
  font-weight: bold;
`;

const Setting = ({ selectedTheme, onThemeChange }) => {
  return (
    <Page>
      <Title>Themes</Title>
      <ThemeSwitcher
        themes={themes}
        selectedTheme={selectedTheme}
        onThemeChange={onThemeChange}
      />
    </Page>
  );
};

export default Setting;
