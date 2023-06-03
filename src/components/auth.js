import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { BsFillPersonFill } from "react-icons/bs";

const FormContainer = styled.div`
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.042),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.061),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.075),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.089),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.108),
    100px 100px 80px rgba(0, 0, 0, 0.15);
  padding: 50px;
  backdrop-filter: blur(20px);
  border-radius: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const signInAnonymouslya = async () => {
    try {
      const confirmation = window.confirm(
        "If Annonymous, the data will not be synced. After a log out, the data will be deleted"
      );

      if (confirmation) {
        await signInAnonymously(auth);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <FormContainer>
        <h1
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            marginBottom: "20px",
          }}
        >
          Login
        </h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Input
            type="text"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={signIn}>Sign In</Button>
          <Button onClick={signInWithGoogle}>
            <FcGoogle />
          </Button>
          <Button onClick={signInAnonymouslya}>
            <BsFillPersonFill />
          </Button>
        </div>
      </FormContainer>
    </Card>
  );
};
