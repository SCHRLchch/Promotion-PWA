import React, { useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 15vw;
  margin: auto;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 8px;
`;

const TableRow = styled.tr`
  width: 15vw;
`;

const TableCell = styled.td`
  border: none;
  padding: 8px;
  width: 15vw;
  border-radius: 20px;
`;

const Items = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 70px;
  @media only screen and (max-height: 1250px) {
    flex-direction: column;
  }
`;

const InputGrade = styled.input`
  width: 15vw;
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  font-size: 30px;
  color: white;
  text-align: center;
  padding-right: 5px;
  font-weight: bold;
  margin: auto;
  border-radius: 20px;
`;

const GradeTable = () => {
  const [grades, setGrades] = useState([]);
  const [weights, setWeights] = useState([]);
  const [desiredGrade, setDesiredGrade] = useState("");

  const calculateAverage = () => {
    let gradeSum = 0;
    let weightSum = 0;

    for (let i = 0; i < grades.length; i++) {
      gradeSum += grades[i] * weights[i];
      weightSum += weights[i];
    }

    const average = gradeSum / weightSum;
    return isNaN(average) ? 0 : average.toFixed(2);
  };

  const calculateRequiredGrade = () => {
    let gradeSum = 0;
    let weightSum = 0;

    for (let i = 0; i < grades.length; i++) {
      gradeSum += grades[i] * weights[i];
      weightSum += weights[i];
    }
    const requiredGrade = desiredGrade * (weightSum + 1) - gradeSum;
    if (requiredGrade.toFixed(3) > 6.0) {
      return "Impossible in one";
    }
    return requiredGrade.toFixed(3);
  };

  const handleGradeChange = (index, value) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = value || 1;
    setWeights(newWeights);
  };

  const addRow = () => {
    setGrades([...grades, 0]);
    setWeights([...weights, 1]);
  };

  const removeRow = (index) => {
    const newGrades = [...grades];
    const newWeights = [...weights];

    newGrades.splice(index, 1);
    newWeights.splice(index, 1);

    setGrades(newGrades);
    setWeights(newWeights);
  };

  const resetGrades = () => {
    const confirm = window.confirm("Reset Grades?");
    if (confirm) {
      setGrades([]);
      setWeights([]);
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <TableHeader>Grade</TableHeader>
            <TableHeader>Weight</TableHeader>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <TableRow key={index}>
              <TableCell>
                <InputGrade
                  type="text"
                  id="grade"
                  value={grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <InputGrade
                  type="text"
                  id="weight"
                  value={weights[index]}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <button onClick={() => removeRow(index)}>Remove</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Items>
        <button onClick={addRow} style={{ marginBottom: "10px" }}>
          Add Row
        </button>
        <button onClick={resetGrades} style={{ marginBottom: "10px" }}>
          Reset Grades
        </button>
        <h3 style={{ marginBottom: "10px" }}>Average: {calculateAverage()}</h3>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="desiredGrade">Desired Grade:</label>
          <input
            type="text"
            id="desiredGrade"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
          />
        </div>
        <h3 style={{ marginBottom: "10px" }}>
          Required Grade: {calculateRequiredGrade()}
        </h3>
      </Items>
    </div>
  );
};

export default GradeTable;
