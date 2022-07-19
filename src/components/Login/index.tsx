import React, { useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();

  const gooleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button onClick={signIn} variant="primary" value="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <Button onClick={gooleSignIn} variant="primary" value="Submit">
            Google Login
          </Button>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;