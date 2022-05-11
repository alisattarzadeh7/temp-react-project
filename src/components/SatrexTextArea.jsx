import React, {useState} from 'react';
import Trans from "./Trans";
import {TextareaAutosize,} from "@material-ui/core";

export default (props) => {

    const randNum = Math.random();

    return (
        <div>
            <label htmlFor={randNum}><Trans>{props.label}</Trans></label>
            <TextareaAutosize {...props} id={randNum} className="satrexTextArea"/>
        </div>
    )

}
