import React from "react";
import {Switch, Link, Route, Redirect, useRouteMatch} from "react-router-dom";

import WritePost from "../WritePost";
import ShowUserPosts from "../ShowUserPosts";
import UserPost from "../UserPost";
import AccountInfo from "../AccountInfo";
import AccountSettings from "../AccountSettings";
import useAuth from "../../hooks/auth.hook";
import useConfirmation from "../../hooks/confirmation.hook";

export default function UserAccountPage() {
    const match = useRouteMatch();

    const {logout} = useAuth();
    const {modal, handleShowChange, handleMessageChange} = useConfirmation(handleLogout, false);

    function handleLogout() {
        logout();
    }

    return (
        <div className="container">
            <div className="row pt-4">
                <ul className="account_navbar col-2">
                    <li>
                        <Link to={match.url}>Account info</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/settings`}>Settings</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/post/create`}>Write post</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/my_posts`}>My posts</Link>
                    </li>
                    <li>
                        <a
                            href="/"
                            onClick={(event) => {
                                event.preventDefault();
                                handleMessageChange(
                                    <div>
                                        Are you sure you want to logout?
                                    </div>
                                );
                                handleShowChange();
                            }}
                        >
                            Logout
                        </a>
                        {modal}
                    </li>
                </ul>
                <div className="account_content col-10">
                    <Switch>
                        <Route path={match.path} exact>
                            <AccountInfo/>
                        </Route>
                        <Route path={`${match.path}/settings`} exact>
                            <AccountSettings/>
                        </Route>
                        <Route path={`${match.path}/post/create`} exact>
                            <WritePost/>
                        </Route>
                        <Route path={`${match.url}/my_posts`} exact>
                            <ShowUserPosts/>
                        </Route>
                        <Route path={`${match.url}/my_posts/:postId`} exact>
                            <UserPost/>
                        </Route>
                        <Redirect to={match.path}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}