import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import UserAccountPage from "../components/pages/UserAccountPage";
import ShowPosts from "../components/ShowPosts";
import ShowPost from "../components/ShowPost";

export default function UserRoutes() {
    const {nickname} = useSelector(state => state.authReducer)["userData"];

    return (
        <Switch>
            <Route path="/" exact>
                <div className="container p-2">
                    Welcome {nickname}!
                    <hr/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, consectetur, rerum! Delectus esse et
                    facilis, iusto maxime quae reprehenderit soluta voluptates? Accusamus laboriosam nulla quas sunt
                    voluptates? Ad alias amet eligendi fugiat, illum iure iusto, labore officia quas reprehenderit
                    similique.
                </div>
            </Route>
            <Route path="/posts" exact>
                <ShowPosts/>
            </Route>
            <Route path="/post/:postId" exact>
                <ShowPost/>
            </Route>
            <Route path="/user/account">
                <UserAccountPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}