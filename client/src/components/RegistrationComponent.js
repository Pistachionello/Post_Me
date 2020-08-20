import React from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

import useHttp from "../hooks/http.hook";

export default function RegistrationComponent() {
    const {loading, request} = useHttp();

    const initialValues = {
        nickname: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        nickname: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required('This field is required'),
        email: Yup.string()
            .max(255, "Must be 255 characters or less")
            .email("Enter please valid email")
            .required('This field is required'),
        password: Yup.string()
            .max(255, "Must be 255 characters or less")
            .min(8, "Must be 8 characters or more")
            .required('This field is required')
    });

    async function onSubmit(values) {
        await request("/api/auth/register", "POST", {user: values})
    }

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(props) => {
                    return (
                        <Form>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"nickname"}>Nickname:</label>
                                </div>
                                <div className="input">
                                    <Field className="w-100" id={"nickname"} name={"nickname"} type="text"/>
                                </div>
                                <div className="errors_container">
                                    <ErrorMessage name={"nickname"}/>
                                </div>
                            </div>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"email"}>Email:</label>
                                </div>
                                <div className="input">
                                    <Field className="w-100" id={"email"} name={"email"} type={"text"}/>
                                </div>
                                <div className="errors_container">
                                    <ErrorMessage name={"email"}/>
                                </div>
                            </div>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"password"}>Password:</label>
                                </div>
                                <div className="input">
                                    <Field className="w-100" id={"password"} name={"password"} type={"text"}/>
                                </div>
                                <div className="errors_container">
                                    <ErrorMessage name={"password"}/>
                                </div>
                            </div>
                            <div className="helpful_container">
                                Already have an account? Login <Link to="/login">Here.</Link>
                            </div>
                            <Button variant="contained" color="secondary" type="submit" disabled={loading}>
                                Register
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}