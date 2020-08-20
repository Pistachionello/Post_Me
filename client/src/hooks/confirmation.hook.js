import React, {useEffect, useState} from "react";
import {Button, Checkbox, FormControlLabel} from "@material-ui/core";

const NO_OP = () => {
};

export default function useConfirmation(onSubmit = NO_OP, useAgreement = true, onCancel = NO_OP) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [checkMark, setCheckMark] = useState(!useAgreement)

    function handleMessageChange(message = "") {
        setMessage(message);
    }

    function handleShowChange() {
        setShow(!show);
    }

    function handleSubmit() {
        onSubmit();
        setShow(false);
    }

    function handleCancel() {
        onCancel();
        setShow(false);
    }

    useEffect(() => {
        if (show) {
            document.body.classList.add("confirm");
        } else {
            document.body.classList.remove("confirm");
        }
        return () => {
            document.body.classList.remove("confirm");
        }
    }, [show])

    const modal = show ? (
        <div className="confirmation_container">
            <div className="confirmation_content">
                <div className="confirmation_message">
                    {message}
                </div>
                {useAgreement ? (
                    <div className="check_mark">
                        <FormControlLabel
                            label="I agree"
                            control={<Checkbox onChange={() => setCheckMark(!checkMark)} color="primary"/>}/>
                    </div>
                ) : null}
                <div className="buttons_container mt-3">
                    <Button className="mr-2" variant="contained" color="primary" onClick={handleSubmit}
                            disabled={!checkMark}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    ) : null;

    return {modal, handleShowChange, handleMessageChange};
}