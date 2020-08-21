import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Loader from 'react-loader-spinner'

import useAbortableHttp from "../hooks/abortableHttp.hook";

export default function ShowPosts() {
    const history = useHistory();

    const {abort, loading, request} = useAbortableHttp();
    const [posts, setPosts] = useState(null);

    const getPosts = useCallback(async function () {
        const data = await request("/api/visitor/posts", {
            method: "GET"
        });
        if (data && data.result) {
            setPosts(data.result);
        }
    }, [])

    useEffect(() => {
        getPosts();
        return function () {
            abort();
        }
    }, [getPosts])

    return (
        <div className="container pt-2">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Loader type="ThreeDots"/>
                </div>
            ) : (
                posts?.length && posts.map((post) => {
                    return (
                        <div className="post_link" key={post.publication_date}
                             onClick={() => history.push(`/post/${post.id}`)}>
                            {post.title}
                        </div>
                    )
                })
            )}
        </div>
    );
}