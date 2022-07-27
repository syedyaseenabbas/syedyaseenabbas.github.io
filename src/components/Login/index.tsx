import React, { useState, MouseEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Alert,
} from "react-bootstrap";
import { auth } from "../../Firebase";
import { Formik } from "formik";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

interface Err {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

  const signIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand style={{ paddingLeft: "20px" }}>
          User Authentication
        </Navbar.Brand>
      </Navbar>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: Err = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (!/^.{8,32}$/i.test(values.password)) {
            errors.password = "Minimum length should be 8";
          }
          return errors;
        }}
        onSubmit={(values) => {
          signIn();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Container style={{ maxWidth: "500px" }} fluid>
            <Form className="mt-4">
              <Form.Group controlId="formEmail">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="email"
                />
                <div style={{ color: "red" }}>
                  {errors.email && touched.email && errors.email}
                </div>
              </Form.Group>
              <Form.Group
                style={{ marginBottom: "8px" }}
                controlId="formPassword"
              >
                <Form.Label style={{ marginTop: "0.8rem" }}>
                  Password
                </Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="password"
                />
                <div style={{ color: "red" }}>
                  {errors.password && touched.password && errors.password}
                </div>
              </Form.Group>
              <Row>
                <Col xs={4} style={{ width: "100px" }}>
                  <Button
                    onClick={() => handleSubmit()}
                    className="mt-10"
                    type="button"
                    style={{ background: "#2b8be5", marginTop: "10px" }}
                  >
                    Log In
                  </Button>
                </Col>
                <Button
                  className="mt-10"
                  onClick={gooleSignIn}
                  type="button"
                  style={{
                    background: "#2b8be5",
                    width: "130px",
                    marginTop: "10px",
                  }}
                >
                  Google Login
                </Button>
                <Col
                  style={{
                    marginTop: "11px",
                    width: "275px",
                    marginLeft: "250px",
                  }}
                  xs={8}
                  className="d-flex justify-content-end align-items-center"
                >
                  Don't have an account?{" "}
                  <Link style={{ paddingLeft: "5px" }} to="/SignUp">
                    SignUp
                  </Link>
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default Login;
