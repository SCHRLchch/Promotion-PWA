import React from "react";
import styled from "styled-components";

const ButtonFileChange = styled.button`
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
  &:active {
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
      100px 100px 80px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
      100px 100px 80px rgba(0, 0, 0, 0.15);
  }
`;

const ImportInput = styled.input`
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

  &:active {
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
      100px 100px 80px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
      100px 100px 80px rgba(0, 0, 0, 0.15);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: auto
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.Background};
`;

const GradesActions = ({
  exportGrades,
  handleImport,
  handleReset,
  onSubmit,
}) => {
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
    <Container style={{ padding: "70px" }}>
      <ButtonFileChange onClick={handleExport}>Exportieren</ButtonFileChange>
      <ButtonFileChange onClick={onSubmit}>Submit to Database</ButtonFileChange>
      <ImportInput type="file" id="json" onChange={handleImport} />
      <Label htmlFor="json">Hochladen</Label>
      <ButtonFileChange
        onClick={handleResetConfirmation}
        style={{ margin: "0px" }}
      >
        Zurücksetzen
      </ButtonFileChange>
    </Container>
  );
};

export default GradesActions;
