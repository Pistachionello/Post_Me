import React, {useState, useEffect, useCallback} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

import useHttp from "../hooks/http.hook";

export default function ShowUserPosts() {
    const match = useRouteMatch();
    const {token} = useSelector(state => state.authReducer);

    const {request, loading} = useHttp();

    const [posts, setPosts] = useState(null);

    const getPosts = useCallback(async function () {
        const data = await request("/api/user/posts", "GET", null, {Authorization: `Bearer ${token}`});
        if (data && data.result) {
            setPosts(data.result);
        }
    }, [request, token])

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <div>
            {loading ? (
                <div>
                    loading
                </div>
            ) : (
                <div>
                    {posts && posts.length ? posts.map((post) => {
                        return (
                            <div key={post.publication_date}>
                                <Link to={`${match.path}/${post.id}`}>{post.title}</Link>
                            </div>
                        );
                    }) : (
                        <div>
                            You dont have posts
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}