import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Loader from 'react-loader-spinner'

import useHttp from "../hooks/http.hook";

export default function ShowPosts() {
    const history = useHistory();

    const {loading, request} = useHttp();
    const [posts, setPosts] = useState(null);

    const getPosts = useCallback(async function () {
        const data = await request("/api/visitor/posts", "GET");
        if (data && data.result) {
            setPosts(data.result);
        }
    }, [request])
    useEffect(() => {
        getPosts();
    }, [getPosts])

    function handleRedirect(url) {
        history.push(url);
    }

    return (
        <div className="container pt-2">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <Loader type="ThreeDots"/>
                </div>
            ) : (
                posts?.length && posts.map((post) => {
                    return (
                        <div className="post_link" key={post.publication_date} onClick={() => handleRedirect(`/post/${post.id}`)}>
                            {post.title}
                        </div>
                    )
                })
            )}
        </div>
    );
}