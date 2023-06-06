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
  query,
  orderBy,
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center; /* Add this line to vertically align the content */

  vertical-align: middle;
  line-height: 100px;
  border-radius: 0px 0px 20px 20px;
  width: 100%;
  box-shadow: 0px 19.7px 29px rgba(0, 0, 0, 0.048),
    0px 43px 25px rgba(0, 0, 0, 0.1);

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
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line
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
      const snapshot = await getDocs(
        query(collection(db, "users", UID, "grades"), orderBy("timestamp"))
      );

      if (snapshot.size <= 1) {
        console.log("No documents to delete or only one document exists.");
        return;
      }

      const documents = snapshot.docs;
      const lastDocument = documents[documents.length - 1];

      const batch = writeBatch(db);
      documents.forEach((doc) => {
        if (doc.data().timestamp !== lastDocument.data().timestamp) {
          batch.delete(doc.ref);
        }
      });

      await batch.commit();
      console.log("Documents deleted successfully except for the last one.");
    } catch (err) {
      console.error("Error deleting documents:", err);
    }
  };
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
      const storedGrades = localStorage.getItem("grades");
      if (storedGrades) {
        setGrades(JSON.parse(storedGrades));
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getGrade();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onSubmit = async () => {
    try {
      deleteAllExceptLast();
      await addDoc(gradeRef, grades);
      await addDoc(gradeRef, grades);
    } catch (err) {
      console.error(err);
    }
  };

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
                  active={grades[subject.name]?.grade ? 1 : undefined}
                />
              </div>
            </StyledDiv>
          ))}
        </Container>

        <GradesActions onSubmit={onSubmit} fetchData={getGrade} />
      </Page>
    </PageBackground>
  );
};

const TotalGradeCalculator = ({ grades }) => {
  const calculateTotalPoints = (grades) => {
    let totalPoints = 0.0;
    let totalPlusPoints = 0.0;
    let totalMinusPoints = 0.0;

    for (const grade of Object.values(grades)) {
      if (grade.ruleValue > 0) {
        totalPlusPoints += grade.ruleValue;
      } else if (grade.ruleValue < 0) {
        totalMinusPoints += grade.ruleValue;
      }
    }
    totalPoints = totalMinusPoints + totalPlusPoints;
    totalMinusPoints = Number(totalMinusPoints).toFixed(1);
    totalPlusPoints = Number(totalPlusPoints).toFixed(1);
    totalPoints = Number(totalPoints).toFixed(1);
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
        <span className="minus">-0.0</span>
      )}
      <span>{totalPoints}</span>
      {totalPlusPoints !== 0 ? (
        <span className="plus">+{totalPlusPoints}</span>
      ) : (
        <span className="plus">+0.0</span>
      )}
    </TotalGrade>
  );
};

export default Calc;
