import React, { useState } from "react";
import styled from "styled-components";
import { LineChart, XAxis, YAxis, CartesianGrid, Legend, Line } from "recharts";
import createTrend from "trendline";

const Table = styled.table`
  border-collapse: collapse;
  width: 15vw;
  margin: auto;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 8px;
  border-radius: 20px;
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
  border-radius: 10px;
  text-align: center;
  flex-direction: column;
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
  width: 216px;
`;

const ChartContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media only screen and (max-width: 800px) {
    display: none;
  }
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
    const requiredGrade =
      Number(desiredGrade) * (Number(weightSum) + 1) - Number(gradeSum);

    if (requiredGrade.toFixed(3) > 6.0) {
      return "Impossible";
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
    const confirm = window.confirm("Noten rücksetzen?");
    if (confirm) {
      setGrades([]);
      setWeights([]);
    }
  };
  const data = grades.map((grade, index) => ({
    subject: `Note ${index + 1}`,
    grade: Number(grade),
  }));

  const numericData = data.map((item, index) => ({
    subject: index + 1,
    grade: item.grade,
  }));

  const trend = createTrend(numericData, "subject", "grade");

  const regressionLineData = [
    { subject: 1, regression: trend.calcY(1) },
    {
      subject: numericData.length,
      regression: trend.calcY(numericData.length),
    },
  ];

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <TableHeader>Noten</TableHeader>
            <TableHeader>Gewicht</TableHeader>
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
                <Button onClick={() => removeRow(index)}>Entfernen</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Items>
        <Button onClick={addRow} style={{ marginBottom: "10px" }}>
          Reihe adden
        </Button>
        <Button onClick={resetGrades} style={{ marginBottom: "10px" }}>
          Noten zurücksetzen
        </Button>

        <h3 style={{ marginBottom: "10px" }}>
          Durchschnitt: {calculateAverage()}
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="desiredGrade">Gewünschte Note:</label>
          <input
            type="text"
            id="desiredGrade"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
          />
        </div>

        <h3 style={{ marginBottom: "10px" }}>
          Benötigte Note:
          <span style={{ color: "red" }}> {calculateRequiredGrade()}</span>
        </h3>
        <ChartContainer>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 6]} />
            <Legend />
            <Line dataKey="grade" fill="#8884d8" />
          </LineChart>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3 " />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 6]} />
            <Legend />
            <Line
              type="monotone"
              data={regressionLineData}
              dataKey="regression"
              stroke="#ff7300"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Items>
    </div>
  );
};

export default GradeTable;
