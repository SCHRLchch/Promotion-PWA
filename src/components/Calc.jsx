import React, { useState, useEffect } from "react";
import rule from "../rule";
import subjects from "../data/subjects";
import { getColorFromValue } from "./ColorCalc";
import styled from "styled-components";
import GradesActions from "./GradesActions";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PageBackground = styled.div`
  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

// Styled Components
const StyledDiv = styled.div`
  opacity: 0.7;
  background-color: ${({ theme }) => theme.cardBackground};
  margin: 30px 10px 30px 20px;
  color: ${({ theme }) => theme.text};
  flex-basis: 40%;
  height: 100px;
  text-align: center;
  vertical-align: middle;
  line-height: 35px;
  border-radius: 10px;
  font-size: 20px;
  box-shadow: 0px 0px 26.3px rgba(0, 0, 0, 0.024),
    0px 0px 29px rgba(0, 0, 0, 0.047), 0px 0px 27.8px rgba(0, 0, 0, 0.072),
    0px 0px 25px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 300px) {
    display: none;
  }
  @media only screen and (max-width: 800px) {
    flex-basis: 35%;
    margin: 20px 15px 20px 15px;
  }
  @media only screen and (min-width: 1500px) {
    margin: 50px;
    flex-basis: 25%;
    height: 120px;
    line-height: 50px;
  }
`;

const InputGrade = styled.input`
  width: 15vw;
  background-color: ${({ theme }) => theme.cardBackground};
  border: none;
  border-bottom: ${({ value }) => (value ? "none" : "2px solid white")};
  font-size: 30px;
  color: ${({ grade }) => getColorFromValue(grade)};
  text-align: center;
  padding-right: 5px;
  font-weight: bold;
  margin: auto;
  @media only screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const TotalGrade = styled.h1`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  height: 100px;
  background-color: ${({ theme }) => theme.cardBackground};
  font-size: 70px;
  text-align: center;
  vertical-align: middle;
  line-height: 100px;
  border-radius: 0px 0px 20px 20px;
  width: 100%;
  box-shadow: 0px 19.7px 29px rgba(0, 0, 0, 0.048),
    0px 43px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .plus {
    color: green;
    opacity: 1;
    @media only screen and (max-width: 800px) {
      font-size: 25px;
    }
  }
  .minus {
    color: red;
    opacity: 1;
    @media only screen and (max-width: 800px) {
      font-size: 25px;
    }
  }
`;

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
`;

const Page = styled.div`
  height: auto;
`;

const GradeName = styled.label`
  font-weight: bold;
  text-transform: capitalize;
  opacity: 1;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.Background};
`;

const Calc = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);
  const UID = auth.currentUser.uid;

  const [grades, setGrades] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  const gradeRef = collection(db, "users", UID, "grades");
  const deleteAllExceptLast = async () => {
    try {
      const snapshot = await getDocs(gradeRef);

      if (snapshot.size <= 1) {
        console.log("No documents to delete or only one document exists.");
        return;
      }

      const documents = snapshot.docs;
      const lastDocument = documents[documents.length - 1];

      const batch = writeBatch(db);
      documents.forEach((doc) => {
        if (doc.id !== lastDocument.id) {
          batch.delete(doc.ref);
        }
      });

      await batch.commit();
      console.log("Documents deleted successfully except for the last one.");
    } catch (err) {
      console.error("Error deleting documents:", err);
    }
  };

  useEffect(() => {
    const getGrade = async () => {
      try {
        const data = await getDocs(gradeRef);
        const timestamp = Timestamp.now();
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          timestamp: timestamp,
          id: doc.id,
        }));
        localStorage.setItem(
          "grades",
          JSON.stringify(filteredData[filteredData.length - 1])
        );
      } catch (err) {
        console.error(err);
      }
    };

    getGrade();
  }, [grades]);

  useEffect(() => {
    const storedGrades = localStorage.getItem("grades");
    if (storedGrades) {
      setGrades(JSON.parse(storedGrades));
    }
  }, []);

  useEffect(() => {
    const storedImage = localStorage.getItem("backgroundImage");
    if (storedImage) {
      setBackgroundImage(storedImage);
    }
  }, []);

  const handleGradeChange = (subject, grade) => {
    const parsedGrade = grade;
    if (!isNaN(parsedGrade)) {
      let ruleValue = rule(parsedGrade) || 0;
      setGrades((prevGrades) => ({
        ...prevGrades,
        [subject]: {
          grade: parsedGrade,
          ruleValue,
        },
      }));
    } else {
      setGrades((prevGrades) => {
        const updatedGrades = { ...prevGrades };
        delete updatedGrades[subject];
        return updatedGrades;
      });
    }
  };

  //Import, Reset, Export
  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedGrades = JSON.parse(e.target.result);
        setGrades(importedGrades);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  };
  const onSubmit = async () => {
    try {
      await addDoc(gradeRef, grades);
      deleteAllExceptLast();
    } catch (err) {
      console.error(err);
    }
  };
  function handleReset() {
    setGrades({});
  }

  function exportGrades() {
    const storedGrades = localStorage.getItem("grades");
    if (storedGrades) {
      const gradesJson = JSON.stringify(JSON.parse(storedGrades), null, 2);
      const blob = new Blob([gradesJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "grades.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <PageBackground backgroundImage={backgroundImage}>
      <Page>
        <TotalGradeCalculator grades={grades} />

        <Container>
          {subjects.map((subject) => (
            <StyledDiv key={subject.name}>
              <GradeName htmlFor={subject.name}>{subject.name}</GradeName>
              <div className="grade">
                <InputGrade
                  type="text"
                  id={subject.name}
                  value={grades[subject.name]?.grade || ""}
                  grade={grades[subject.name]?.ruleValue || 0}
                  onChange={(e) =>
                    handleGradeChange(subject.name, e.target.value)
                  }
                  active={grades[subject.name]?.grade ? 1 : 0}
                />
              </div>
            </StyledDiv>
          ))}
        </Container>

        <GradesActions
          exportGrades={exportGrades}
          handleImport={handleImport}
          handleReset={handleReset}
          onSubmit={onSubmit}
        />
      </Page>
    </PageBackground>
  );
};

const TotalGradeCalculator = ({ grades }) => {
  const calculateTotalPoints = (grades) => {
    let totalPoints = 0;
    let totalPlusPoints = 0;
    let totalMinusPoints = 0;

    for (const grade of Object.values(grades)) {
      if (grade.ruleValue > 0) {
        totalPlusPoints += grade.ruleValue;
      } else if (grade.ruleValue < 0) {
        totalMinusPoints += grade.ruleValue;
      }
    }
    totalPoints = totalMinusPoints + totalPlusPoints;
    return {
      totalPoints,
      totalPlusPoints,
      totalMinusPoints,
    };
  };

  const { totalPoints, totalPlusPoints, totalMinusPoints } =
    calculateTotalPoints(Object.values(grades || {}));

  return (
    <TotalGrade className="main">
      {totalMinusPoints !== 0 ? (
        <span className="minus">{totalMinusPoints}</span>
      ) : (
        <span className="minus">-0</span>
      )}
      <span>{totalPoints}</span>
      {totalPlusPoints !== 0 ? (
        <span className="plus">+{totalPlusPoints}</span>
      ) : (
        <span className="plus">+0</span>
      )}
    </TotalGrade>
  );
};

export default Calc;
