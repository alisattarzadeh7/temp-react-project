import React from 'react'
import {IonLoading} from "@ionic/react";

const SatrexLoading = ({loading,setLoading}) => {



    return (
        <>
            <IonLoading
                // cssClass='my-custom-class'
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'لطفا منتظر بمانید ...'}
                spinner="lines"
            />
        </>
    )
}
export default SatrexLoading;