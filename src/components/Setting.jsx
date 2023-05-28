import React, { useState, useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import themes from "../data/themes";
import styled from "styled-components";
import GradeTable from "./GradeTable";
const PageBackground = styled.div`
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: auto;
  height: 100vh;
  border-radius: 20px;
  opacity: 0.7;
  box-shadow: ${({ backgroundImage }) =>
    backgroundImage
      ? "none"
      : "0px 0px 13.8px rgba(0, 0, 0, 0.02), 0px 0px 33.3px rgba(0, 0, 0, 0.028), 0px 0px 62.6px rgba(0, 0, 0, 0.035), 0px 0px 111.7px rgba(0, 0, 0, 0.042), 0px 0px 208.9px rgba(0, 0, 0, 0.05), 0px 0px 500px rgba(0, 0, 0, 0.07)"};

  @media only screen and (max-height: 1250px) {
    height: 100%;
  }
`;

const Label = styled.label`
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  font-weight: bold;
  margin: 0px 20px 0px 0px;
  font-size: 15px;
  border-radius: 20px;
  box-shadow: 100px 100px 80px rgba(0, 0, 0, 0.07);
  margin: 5px;
  width: 130px;
`;

const Title = styled.h1`
  margin: 20px 10px 20px 10px;
  font-weight: bold;
  color: white;
  opacity: 1;
  @media only screen and (max-height: 1250px) {
    font-size: 30px;
  }
`;

const SubTitle = styled.h2`
  margin: 20px 10px 20px 10px;
  font-weight: bold;
  color: white;
  opacity: 1;
  @media only screen and (max-height: 1250px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  font-weight: bold;
  margin: 0px 20px 0px 0px;
  font-size: 15px;
  border-radius: 20px;
  box-shadow: 100px 100px 80px rgba(0, 0, 0, 0.07);
  margin: 5px;
  width: 180px;
`;

const Setting = ({ selectedTheme, onThemeChange }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("backgroundImage");
    if (storedImage) {
      setBackgroundImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file && file.size > maxSize) {
      alert("The selected image exceeds the maximum size of 5MB.");
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;
      setBackgroundImage(imageData);
      localStorage.setItem("backgroundImage", imageData);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundReset = () => {
    const confirmed = window.confirm("Reset Background?");
    if (confirmed) {
      setBackgroundImage();
      localStorage.removeItem("backgroundImage");
    }
  };
  return (
    <PageBackground backgroundImage={backgroundImage}>
      <Page backgroundImage={backgroundImage}>
        <Title>Themes</Title>
        <ThemeSwitcher
          themes={themes}
          selectedTheme={selectedTheme}
          onThemeChange={onThemeChange}
        />
        <SubTitle>Define you Background</SubTitle>
        <Label htmlFor="pics">Upload your image</Label>
        <input
          id="pics"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <Button onClick={handleBackgroundReset}>Reset Background</Button>
        <Title>Grade Calculator</Title>
        <GradeTable />
      </Page>
    </PageBackground>
  );
};

export default Setting;
