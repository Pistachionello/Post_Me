import {useCallback} from 'react';
import {useDispatch} from "react-redux";

import {createAuthObj, clearAuthObj} from "../redux/reducers/authReducer";
import useHttp from "./http.hook";
import {useToasts} from "react-toast-notifications";

export const userStorageName = "userData";

export default function useAuth() {
    const dispatch = useDispatch();
    const {addToast} = useToasts();

    const {request} = useHttp();

    const login = useCallback(async (tokenToCheck) => {
        //When try to login, first test if jwtToken is valid
        const data = await request("/api/auth/authorize", "POST", null, {Authorization: `Bearer ${tokenToCheck}`})
        if (data && data.verified) {
            const userData = data.user;
            localStorage.setItem(userStorageName, JSON.stringify({token: tokenToCheck}))
            dispatch(createAuthObj({userData, token: tokenToCheck, isAuthenticated: !!tokenToCheck}))
        }
    }, [request, dispatch]);

    const logout = useCallback(() => {
        addToast("You successfully logged out", {appearance: "success"});
        localStorage.removeItem(userStorageName);
        dispatch(clearAuthObj());
    }, [dispatch, addToast]);

    return {login, logout}
}