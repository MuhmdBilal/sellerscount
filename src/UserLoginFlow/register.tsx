import React, { useState } from "react";
import { Form, Container, Row, Col, FormLabel, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registeration } from "../Service/services";
import LoginSlider from "../Components/LoginSlider";
import "./index.css";

type Inputs = {
  email: string;
  password: string;
  userName: string;
};
const Register: React.FunctionComponent = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<any>(false);
  const [redirectToMain, setRedirectToMain] = useState<any>(false);
  const [iscustomerror, setIsCustomError] = useState<any>(false);
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
      const response = await registeration(data);
      if (response.status === 200) {
        const accessTokenId = response.data.accessToken;
        localStorage.setItem("accessToken", accessTokenId);
        window.location.href = "/overview";
      } else {
        setIsCustomError("Try again");
      }
    } catch (error: any) {
      setIsCustomError(error.response.data.ErrorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      {redirectToMain && <Navigate to="/overview" />}
      <Row>
        <Col lg={5} md={12} xs={12} className="p-0">
          <LoginSlider />
        </Col>
        <Col lg={7} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
          <div className="login-form-section">
            <div className="login-form-content">
              <h1 className="mb-2">Sign Up at <span> SellerScout</span></h1>
              <p>Empower your experience, Sign up for a account today</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {iscustomerror ? (
                <span className="error-message text-danger sapn-text-error">{iscustomerror}</span>
              ) : null}
              <Form.Group className="mb-3">
                <FormLabel className="label-text">Work email*</FormLabel>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form-input-text"
                  {...register("email", {
                    required: "*Please enter your email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid @ email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message text-danger sapn-text-error mt-1">
                    {errors.email.message}
                  </span>
                )}
              </Form.Group>
              <div className="mb-0 password-cont">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FormLabel className="label-text">Username*</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    className="form-input-text"
                    {...register("userName", {
                      required: "*Please enter username",
                    })}
                  />
                  {errors.userName && (
                    <span className="error-message text-danger sapn-text-error">
                      {errors.userName.message}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="mb-0 password-cont">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FormLabel className="label-text">Password*</FormLabel>
                  <Form.Control
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    className="form-input-text"
                    {...register("password", {
                      required: "*Please enter your password",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]{12,}$/,
                        message:
                          "Password must be at least 12 characters with one uppercase , one lowercase , one special character, and one digit",
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
                  </span>{" "}
                  {errors.password && (
                    <span className="error-message text-danger sapn-text-error">
                      {errors.password.message}
                    </span>
                  )}
                </Form.Group>
              </div>
              <div className="mt-4">
                <button type="submit" className="login-btn">
                  {!loading ? (
                    "Create account"
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
                Already have an account? <span onClick={() => navigate("/")}>Sign In </span>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
