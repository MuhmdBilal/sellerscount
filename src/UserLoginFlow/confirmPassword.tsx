import React, { useState } from "react";
import { Form, Container, Row, Col, FormLabel, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginSlider from "../Components/LoginSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

type Inputs = {
    newpassword: string;
    confirmpassword: string;
};

const ConfirmPassword: React.FunctionComponent = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        newpassword: false,
        confirmpassword: false,
    });
    const [loading, setLoading] = useState<any>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const navigate = useNavigate();
    const togglePasswordVisibility = (field: "newpassword" | "confirmpassword") => {
        setIsPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const onSubmit = (data: Inputs) => {
        setLoading(true);

        console.log("Form Submitted Data:", data);
        setLoading(false);
        navigate("/");
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
                            <h1 className="mb-2">Enter New Password</h1>
                            <p>You have successfully verified your account via email.</p>
                        </div>

                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-0 password-cont">
                                <Form.Group className="mb-3 relative" controlId="formNewPassword">
                                    <FormLabel className="label-text">New Password*</FormLabel>
                                    <Form.Control
                                        type={isPasswordVisible.newpassword ? "text" : "password"}
                                        placeholder="New Password"
                                        className="form-input-text"
                                        {...register("newpassword", {
                                            required: "*Please enter your password",
                                            pattern: {
                                                value:
                                                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?])[A-Za-z\d!@#$%^&*()_+{}|:"<>?]{12,}$/,
                                                message:
                                                    "Password must be at least 12 characters with one uppercase, one lowercase, one special character, and one digit",
                                            },
                                        })}
                                    />
                                    <span
                                        className="show-password"
                                        onClick={() => togglePasswordVisibility("newpassword")}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                isPasswordVisible.newpassword ? faEyeSlash : faEye
                                            }
                                        />
                                    </span>
                                    {errors.newpassword && (
                                        <span className="error-message text-danger span-text-error">
                                            {errors.newpassword.message}
                                        </span>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="mb-0 password-cont">
                                <Form.Group className="mb-3 relative" controlId="formConfirmPassword">
                                    <FormLabel className="label-text">Confirm Password*</FormLabel>
                                    <Form.Control
                                        type={isPasswordVisible.confirmpassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className="form-input-text"
                                        {...register("confirmpassword", {
                                            required: "*Please confirm your password",
                                            validate: (value) =>
                                                value === watch("newpassword") ||
                                                "Passwords do not match",
                                        })}
                                    />
                                    <span
                                        className="show-password"
                                        onClick={() => togglePasswordVisibility("confirmpassword")}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                isPasswordVisible.confirmpassword ? faEyeSlash : faEye
                                            }
                                        />
                                    </span>
                                    {errors.confirmpassword && (
                                        <span className="error-message text-danger span-text-error">
                                            {errors.confirmpassword.message}
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
                                    "Save"
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

export default ConfirmPassword;
