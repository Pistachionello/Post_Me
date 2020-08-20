import React, {useCallback, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import {useParams, useHistory} from "react-router-dom"
import {useSelector} from "react-redux";
import {isEqual} from "lodash";
import {useFormik} from "formik";
import * as Yup from "yup";

import useHttp from "../hooks/http.hook";
import useConfirmation from "../hooks/confirmation.hook";

export default function UserPost() {
    const history = useHistory();

    const [post, setPost] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [initialValues, setInitialValues] = useState({
        title: post?.title || "",
        description: post?.description || ""
    });

    const {request, loading} = useHttp();
    const {modal, handleShowChange, handleMessageChange} = useConfirmation(handleDeleting);
    const {token} = useSelector(state => state.authReducer);
    const {postId} = useParams();
    const getPosts = useCallback(async function () {
        const data = await request(`/api/user/post/${postId}`, "GET", null, {Authorization: `Bearer ${token}`});
        setData(data)
    }, [postId, request, token])
    useEffect(() => {
        getPosts();
    }, [getPosts])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string()
                .max(255, "Must be 255 characters or less")
                .required('This field is required'),
            description: Yup.string()
                .max(5000, "Must be 5000 characters or less")
                .required('This field is required')
        }),
        onSubmit: async function (values) {
            const data = await request(`/api/user/post/${postId}`, "PUT", values, {Authorization: `Bearer ${token}`});
            setData(data)
        }
    });

    useEffect(() => {
        if (!isEqual(formik.initialValues, formik.values)) {
            setIsChanged(true);
        } else {
            setIsChanged(false)
        }
    }, [formik.initialValues, formik.values])

    async function handleDeleting() {
        await request(`/api/user/post/${postId}`, "DELETE", null, {Authorization: `Bearer ${token}`});
        history.push("/user/account/my_posts");
    }

    function setData(data) {
        if (data && data.result) {
            setPost(data.result);
            setInitialValues({
                title: data.result.title,
                description: data.result.description
            })
        }
    }

    return (
        <div>
            <div>
                {post && (
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"title"}>Title:</label>
                                </div>
                                <div className="input">
                                    <input id="title" type="text" {...formik.getFieldProps("title")}/>
                                </div>
                                <div className="errors_container">
                                    {formik.touched.title && formik.errors.title ? (
                                        <>{formik.errors.title}</>
                                    ) : null}
                                </div>
                            </div>
                            <div className="input_container mb-2">
                                <div className="label_container">
                                    <label htmlFor={"description"}>Description:</label>
                                </div>
                                <div className="input">
                                        <textarea className="w-100"
                                                  id="description"
                                                  rows="10"
                                                  {...formik.getFieldProps("description")}
                                        />
                                </div>
                                <div className="errors_container">
                                    {formik.touched.description && formik.errors.description ? (
                                        <>{formik.errors.description}</>
                                    ) : null}
                                </div>
                            </div>
                            <div className="publication_date">
                                Publication date: <br/>
                                {(new Date(post.publication_date).toUTCString())}
                            </div>
                            <div className="last_update_date">
                                Last time updated: <br/>
                                {(new Date(post.last_update_date).toUTCString())}
                            </div>
                            <div className="d-flex buttons_container mt-2">
                                <Button className="mr-2" variant="contained" color="secondary" type="submit"
                                        disabled={loading ? true : !isChanged}>
                                    Update
                                </Button>
                                <Button variant="contained" color="secondary" type="button"
                                        disabled={loading}
                                        onClick={() => {
                                            handleShowChange();
                                            handleMessageChange(
                                                <div>
                                                    Are you sure you want to delete this post?
                                                </div>
                                            );
                                        }}
                                >
                                    Delete Post
                                </Button>
                                {modal}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}