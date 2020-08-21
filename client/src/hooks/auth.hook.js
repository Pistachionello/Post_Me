import {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";

import {createAuthObj, clearAuthObj} from "../redux/reducers/authReducer";
import useAbortableHttp from "./abortableHttp.hook";
import {useToasts} from "react-toast-notifications";

export const userStorageName = "userData";

export default function useAuth() {
    const dispatch = useDispatch();
    const {addToast} = useToasts();

    const {request} = useAbortableHttp();

    const [ready, setReady] = useState(false);

    const login = useCallback(async (tokenToCheck) => {
        //When try to login, first test if jwtToken is valid
        const data = await request("/api/auth/authorize", {
            method: "POST",
            body: null,
            headers: {Authorization: `Bearer ${tokenToCheck}`}
        });
        setReady(true);
        if (data && data.verified) {
            const userData = data.user;
            localStorage.setItem(userStorageName, JSON.stringify({token: tokenToCheck}))
            dispatch(createAuthObj({userData, token: tokenToCheck, isAuthenticated: !!tokenToCheck}))
        }
    }, [dispatch]);

    const logout = useCallback(() => {
        addToast("You successfully logged out", {appearance: "success"});
        localStorage.removeItem(userStorageName);
        dispatch(clearAuthObj());
        setReady(true);
    }, [dispatch, addToast]);

    return {login, logout, ready}
}