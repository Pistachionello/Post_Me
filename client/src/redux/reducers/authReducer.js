import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    token: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        createAuthObj: {
            reducer: (state, {payload}) => {
                return payload;
            },
            prepare: authObj => ({payload: authObj})
        },
        updateUserData: {
            reducer: (state, {payload}) => {
                const newState = {...state};
                newState["userData"] = payload;
                return newState;
            },
            prepare: userData => ({payload: userData})
        },
        clearAuthObj: () => {
            return initialState;
        }
    }
});

export const {createAuthObj, clearAuthObj, updateUserData} = authSlice.actions;
export const authReducer = authSlice.reducer;