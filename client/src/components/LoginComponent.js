import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

import useAbortableHttp from "../hooks/abortableHttp.hook";
import useAuth from "../hooks/auth.hook";

export default function LoginComponent() {
    const {login} = useAuth();
    const {abort, request, loading} = useAbortableHttp();

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
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
        const data = await request("/api/auth/login", {
            method: "POST",
            body: {user: values},
        })
        if (data && data.token) {
            await login(data.token);
        }
    }

    useEffect(() => {
        return function () {
            abort();
        }
    }, [])

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {() => {
                    return (
                        <Form>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"email"}>Email:</label>
                                </div>
                                <div className="input">
                                    <Field className="w-100" id={"email"} name={"email"} type="text"/>
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
                                Don't have an account? Register <Link to="/register">Here.</Link>
                            </div>
                            <Button variant="contained" color="secondary" type="submit" disabled={loading}>
                                Login
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}