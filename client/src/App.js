import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useToasts} from 'react-toast-notifications'

import VisitorRoutes from "./routes/visitor-routes";
import UserRoutes from "./routes/user-routes";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import useAutoAuthenticate from "./hooks/auto-authenticate.hook";

export default function App() {
    const {isReady} = useAutoAuthenticate();
    const {isAuthenticated} = useSelector(state => state.authReducer);

    const {toastStack, removeToast} = useToasts();
    useEffect(() => {
        if (toastStack.length > 5) {
            removeToast(toastStack[0].id);
        }
    }, [toastStack, toastStack.length, removeToast])

    if (!isReady) {
        return (<Loading/>);
    }

    return (
        <Router>
            <div className="App">
                <Navbar/>
                {isAuthenticated ? (
                    <UserRoutes/>
                ) : (
                    <VisitorRoutes/>
                )}
            </div>
        </Router>
    );
}
