import React from "react";
import {useSelector} from "react-redux";

export default function AccountInfo() {
    const {id, nickname, email, creation_date} = useSelector(state => state.authReducer)["userData"];

    return (
        <div>
            <div className="account_data_container">
                id: {id}
            </div>
            <div className="account_data_container">
                nickname: {nickname}
            </div>
            <div className="account_data_container">
                email: {email}
            </div>
            <div className="account_data_container">
                creation_date: {new Date(creation_date).toUTCString()}
            </div>
        </div>
    );
}