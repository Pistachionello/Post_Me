import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import ShowPosts from "../components/ShowPosts";
import ShowPost from "../components/ShowPost";
import LoginComponent from "../components/LoginComponent";
import RegistrationComponent from "../components/RegistrationComponent";

export default function VisitorRoutes() {
    return (
        <Switch>
            <Route path="/" exact>
                <div className="container">
                    Hey you need to authenticate yourself!
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
            <Route path="/login" exact>
                <LoginComponent/>
            </Route>
            <Route path="/register" exact>
                <RegistrationComponent/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
}