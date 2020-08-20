import React from 'react';
import {useField} from 'formik';

export default function MyTextField({...props}) {
    const [field] = useField(props);
    return (
        <textarea {...field} {...props}/>
    );
};