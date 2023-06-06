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
    margin-bottom: 20px;
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
  padding:70px;
  padding-top:10px;
  @media only screen and (max-width: 500px) {
    justify-content: baseline;
  }
`;

const GradesActions = ({ onSubmit, fetchData }) => {
  return (
    <Container>
      <ButtonFileChange onClick={onSubmit}>Submit to Database</ButtonFileChange>
      <ButtonFileChange onClick={fetchData} style={{ marginRight: "0px" }}>
        Fetch from Database
      </ButtonFileChange>
    </Container>
  );
};

export default GradesActions;
