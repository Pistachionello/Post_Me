import React, {useEffect, useState} from "react";
import {Collapse, Button} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";

import useAbortableHttp from "../hooks/abortableHttp.hook";
import {updateUserData} from "../redux/reducers/authReducer";

export default function AccountSettings() {
    const {token, userData} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const {abort, request, loading} = useAbortableHttp();
    const {id, nickname, email} = userData;

    const [open, setOpen] = useState(0)

    const emailFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(255, "Must be 255 characters or less")
                .email("Enter please valid email")
                .required('This field is required')
        }),
        onSubmit: async (values) => {
            const data = await request(`/api/user/${id}/email`, {
                method: "PUT",
                body: {changes: values},
                headers: {Authorization: `Bearer ${token}`}
            });
            if (data && data.result) {
                dispatch(updateUserData(data.result));
            }
        }
    })

    const nicknameFormik = useFormik({
        initialValues: {
            nickname: "",
        },
        validationSchema: Yup.object({
            nickname: Yup.string()
                .max(30, "Must be 30 characters or less")
                .required('This field is required')
        }),
        onSubmit: async (values) => {
            const data = await request(`/api/user/${id}/nickname`, {
                method: "PUT",
                body: {changes: values},
                headers: {Authorization: `Bearer ${token}`}
            });
            if (data && data.result) {
                dispatch(updateUserData(data.result));
            }
        }
    })

    useEffect(() => {
        return function () {
            abort();
        }
    }, [])

    return (
        <div className="account_setting_container">
            <div className="setting_data_container border-top border-bottom">
                {open === 1 && emailFormik.errors.email ? (
                    <div className="errors_container">
                        <Alert severity="error">{emailFormik.errors.email}</Alert>
                    </div>
                ) : null}
                <div className="data_container p-2">
                    <div className="row mb-2">
                        <div className="label col-3">
                            Email:
                        </div>
                        <div className="value col-9">
                            {email}
                        </div>
                    </div>
                    <Collapse in={open === 1}>
                        <div className="row">
                            <div className="label col-3">
                                new Email:
                            </div>
                            <div className="value col-9">
                                <form onSubmit={emailFormik.handleSubmit}>
                                    <input id="email" type="text" {...emailFormik.getFieldProps("email")}/>
                                    <div className="mt-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                    <div className="collapse_opener">
                        <a
                            href="/"
                            onClick={(event) => {
                                event.preventDefault();
                                setOpen(open === 1 ? 0 : 1);
                            }}
                        >
                            Show
                        </a>
                    </div>
                </div>
            </div>
            <div className="setting_data_container border-top border-bottom">
                {open === 2 && nicknameFormik.errors.nickname ? (
                    <div className="errors_container">
                        <Alert severity="error">{nicknameFormik.errors.nickname}</Alert>
                    </div>
                ) : null}
                <div className="data_container p-2">
                    <div className="row mb-2">
                        <div className="label col-3">
                            nickname:
                        </div>
                        <div className="value col-9">
                            {nickname}
                        </div>
                    </div>
                    <Collapse in={open === 2}>
                        <div className="row">
                            <div className="label col-3">
                                new Nickname:
                            </div>
                            <div className="value col-9">
                                <form onSubmit={nicknameFormik.handleSubmit}>
                                    <input id="nickname" type="text" {...nicknameFormik.getFieldProps("nickname")}/>
                                    <div className="mt-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                    <div className="collapse_opener">
                        <a
                            href="/"
                            onClick={(event) => {
                                event.preventDefault();
                                setOpen(open === 2 ? 0 : 2);
                            }}
                        >
                            Show
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}