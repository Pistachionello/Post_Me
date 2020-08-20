import {useEffect} from 'react';

import useAuth, {userStorageName} from "./auth.hook";

export default function useAutoAuthenticate() {
    const {login} = useAuth();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userStorageName));
        
        if (data && data.token) {
            const {token} = data;
            login(token);
        }
    }, [login]);
}