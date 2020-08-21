import {useState, useCallback} from "react";
import {useToasts} from 'react-toast-notifications'

export default function useAbortableHttp() {
    const {addToast} = useToasts();

    const [loading, setLoading] = useState(false);

    const controller = new AbortController();
    const {signal} = controller;

    const request = useCallback(async (url, opts) => {
        setLoading(true);

        if (opts && opts.body) {
            opts.body = JSON.stringify(opts.body);
            opts["headers"] = {};
            opts["headers"]["Content-Type"] = "application/json";
        }

        try {
            const response = await fetch(url, {...opts, signal});
            const data = await response.json();

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
        } catch (err) {
            if (err.name === 'AbortError') {
                addToast("Request was aborted", {appearance: "warning"});
                return;
            }
            setLoading(false);
            console.log(err);
        }
    }, [addToast, signal]);

    return {abort: () => controller.abort(), loading, request};
}