import {useState, useEffect} from 'react';

import useAuth, {userStorageName} from "./auth.hook";

export default function useAutoAuthenticate() {
    const {login, ready} = useAuth();

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setIsReady(ready);
    }, [ready])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(userStorageName));
        if (data && data.token) {
            login(data.token);
        } else {
            setIsReady(true);
        }
    }, [login]);

    return {isReady};
}