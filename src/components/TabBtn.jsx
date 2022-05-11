import React, {useState} from 'react';
import {IonButton, IonIcon} from "@ionic/react";
import {satrexGreen} from "../styles/colors";


export default (props) => {

    return (
        <IonButton color="light"
                   style={{width: '100%',margin:0,height:'100%'}}
                   {...props}
                >
            <div className="btnContent">
                <div style={{width: '100%'}}><IonIcon icon={props.icon}
                                                      style={{color: satrexGreen, fontSize: 25}}/></div>
                <div style={{width: '100%',marginTop:6}}><span>{props.children}</span></div>

            </div>
        </IonButton>
    )

}
