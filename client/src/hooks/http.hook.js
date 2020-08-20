import {useState, useCallback} from "react";
import {useToasts} from 'react-toast-notifications'

export default function useHttp() {
    const {addToast} = useToasts();

    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            //todo: make beautiful
            if (data && data.success) {
                addToast(data.success, {appearance: "success"});
            }
            if (data && data.message) {
                addToast(data.message, {appearance: "info"});
            }
            if (data && data.warning) {
                addToast(data.warning, {appearance: "warning"});
            }
            if (data && data.error) {
                addToast(data.error, {appearance: "error"});
            }

            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [addToast]);

    return {loading, request};
}