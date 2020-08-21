import React, {useEffect} from "react";
import Button from "@material-ui/core/Button";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";
import * as Yup from "yup";

import TextAreaField from "./FormikComponents/TextAreaField";
import useAbortableHttp from "../hooks/abortableHttp.hook";

export default function WritePost() {
    const {token} = useSelector(state => state.authReducer);

    const {abort, request, loading} = useAbortableHttp();

    const initialValues = {
        title: "",
        description: ""
    };
    const validationSchema = Yup.object({
        title: Yup.string()
            .max(255, "Must be 255 characters or less")
            .required('This field is required'),
        description: Yup.string()
            .max(5000, "Must be 5000 characters or less")
            .required('This field is required')
    });

    async function onSubmit(values) {
        await request("/api/user/post/create", {
            method: "POST",
            body: values,
            headers: {Authorization: `Bearer ${token}`}
        });
    }

    useEffect(() => {
        return function () {
            abort();
        }
    }, [])

    return (
        <div>
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
                                    <label htmlFor={"title"}>Title:</label>
                                </div>
                                <div className="input">
                                    <Field className="w-100" id={"title"} name={"title"} type="text"/>
                                </div>
                                <div className="errors_container">
                                    <ErrorMessage name={"title"}/>
                                </div>
                            </div>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"description"}>Description:</label>
                                </div>
                                <div className="input">
                                    <TextAreaField
                                        className="w-100"
                                        id={"description"}
                                        name={"description"}
                                        rows={"10"}
                                    />
                                </div>
                                <div className="errors_container">
                                    <ErrorMessage name={"description"}/>
                                </div>
                            </div>
                            <Button variant="contained" color="secondary" type="submit" disabled={loading}>
                                Create post
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}