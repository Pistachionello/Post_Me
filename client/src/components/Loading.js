import React from "react";
import Loader from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <Loader type="ThreeDots"/>
        </div>
    );
}
