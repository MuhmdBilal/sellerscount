import React, { useState } from "react";
import { Form, Container, Row, Col, Spinner, FormLabel } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "../Service/services";
import LoginSlider from "../Components/LoginSlider";
import "./index.css";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FunctionComponent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data: any, event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        const accessTokenId = response.data.accessToken;
        const userProfile = JSON.stringify(response.data.userProfile);
        localStorage.setItem("accessToken", accessTokenId);
        localStorage.setItem("userProfile", userProfile);
        window.location.href = "/overview";
      }
    } catch (error: any) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={5} md={12} xs={12} className="p-0">
          <LoginSlider />
        </Col>
        <Col
          lg={7}
          md={12}
          xs={12}
          className="p-0 d-flex justify-content-center align-items-center"
        >
          <div className="login-form-section">
            <div className="login-form-content">
              <h1 className="mb-2">
                Sign in at <span>SellerScout</span>
              </h1>
              <p>Empower your experience, sign in for a account today</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <FormLabel className="label-text">Work email*</FormLabel>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="form-input-text"
                  {...register("email", {
                    required: "*Please enter your email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message text-danger sapn-text-error ">
                    {errors.email.message}
                  </span>
                )}
              </Form.Group>
              <div className="mb-0 password-cont">
                <Form.Group
                  className="mb-3 relative"
                  controlId="formBasicPassword"
                >
                  <FormLabel className="label-text">Password*</FormLabel>
                  <Form.Control
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="form-input-text"
                    {...register("password", {
                      required: "*Please enter your password",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]+$/,
                        message: "Password is incorrect",
                      },
                    })}
                  />
                  <span
                    className="show-password"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                    />
                  </span>
                  {errors.password && (
                    <span className="error-message text-danger sapn-text-error ">
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex justify-content-end align-items-end mt-2 mb-3">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="forgot-password"
                >
                  Forgot Password?
                </span>
              </div>
              <div>
                <button type="submit" className="login-btn" disabled={loading}>
                  {!loading ? (
                    "Log in"
                  ) : (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="loader"
                    />
                  )}
                </button>
              </div>
              <p className="create-account text-center">
                Don’t have an account?{" "}
                <span onClick={() => navigate("/signup")}>Sign Up</span>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
