import React, {useState, useEffect} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

import Loading from "./Loading";
import useAbortableHttp from "../hooks/abortableHttp.hook";

export default function ShowUserPosts() {
    const match = useRouteMatch();
    const {token} = useSelector(state => state.authReducer);

    const {abort, request, loading} = useAbortableHttp();

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        request("/api/user/posts", {
            method: "GET",
            body: null,
            headers: {Authorization: `Bearer ${token}`}
        }).then(data => {
            if (data && data.result) {
                setPosts(data.result);
            }
        });

        return function () {
            abort();
        }
    }, [token])

    return (
        <div>
            {loading ? (<Loading/>) : (
                <div>
                    {posts && posts.length ? posts.map((post) => {
                        return (
                            <div key={post.publication_date}>
                                <Link to={`${match.path}/${post.id}`}>{post.title}</Link>
                            </div>
                        );
                    }) : (<div>You dont have posts</div>)}
                </div>
            )}
        </div>
    );
}