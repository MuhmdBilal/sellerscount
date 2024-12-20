import React, { useState } from "react";
import { Form, Container, Row, Col, FormLabel, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginSlider from "../Components/LoginSlider";
import "./index.css";

type Inputs = {
  email: string;
};

const ResetPassword: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<any>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    setLoading(true);
    console.log("Form Submitted:", data);
    setLoading(false);
    navigate("/confirm-password");
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={5} md={12} xs={12} className="p-0">
          <LoginSlider />
        </Col>
        <Col lg={7} md={12} xs={12} className="p-0 d-flex justify-content-center align-items-center">
          <div className="login-form-section">
            <div className="login-form-content">
              <h1 className="mb-2">Forgot Password?</h1>
              <p>Enter your email address and we’ll send you a link to reset your password.</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-0 password-cont">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FormLabel className="label-text">Email Address*</FormLabel>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
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
                    <span className="error-message text-danger sapn-text-error mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </Form.Group>
              </div>
              <button
                type="submit"
                className="login-btn mt-3"
                disabled={loading}
              >
                {!loading ? (
                  "Send Link"
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
            </Form>
            <p className="create-account text-center">
              Back to <span onClick={() => navigate("/")}>Login</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
