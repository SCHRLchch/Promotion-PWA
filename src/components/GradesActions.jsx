import React from "react";

import styled from "styled-components";

const Button_File_Change = styled.button`
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  color: ${({ theme }) => theme.text};
  margin-right: 20px;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 100px 100px 80px rgba(0, 0, 0, 0.07);
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Import_Input = styled.input`
  display: none;
`;

const Label = styled.label`
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  font-weight: bold;
  margin: 0px 20px 0px 0px;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 100px 100px 80px rgba(0, 0, 0, 0.07);
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const GradesActions = ({ exportGrades, handleImport, handleReset }) => {
  function handleExport() {
    exportGrades();
  }

  function handleResetConfirmation() {
    const confirmed = window.confirm("Reset?");

    if (confirmed) {
      handleReset();
    }
  }

  return (
    <div className="flex-container" style={{ marginTop: "10px" }}>
      <Button_File_Change onClick={handleExport}>Export</Button_File_Change>
      <Import_Input type="file" id="json" onChange={handleImport} />
      <Label htmlFor="json">Upload</Label>
      <Button_File_Change onClick={handleResetConfirmation}>
        Reset
      </Button_File_Change>
    </div>
  );
};

export default GradesActions;
