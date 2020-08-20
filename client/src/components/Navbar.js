import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navbar() {
    const {isAuthenticated} = useSelector(state => state.authReducer)

    return (
        <div className="p-2 bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <div className="logo">
                    POST ME
                </div>
                <div className="navbar d-flex">
                    <Link to="/" className="mr-2">Home</Link>
                    <Link to="/posts" className="mr-2">Posts</Link>
                    <Link to={isAuthenticated? "/user/account" : "/login"}>Account</Link>
                </div>
            </div>
        </div>
    );
}