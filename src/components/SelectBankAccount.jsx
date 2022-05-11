import React from 'react'
import {IonIcon, IonLabel, useIonPicker} from "@ionic/react";
import {chevronDownOutline} from "ionicons/icons";
import {satrexGray} from "../styles/colors";
import {useBankAccounts} from "../utils/queries";
import getBankName from "./getBankName";

const SelectCrypto = ({numType = 'number',bankAccount,setBankAccount,cssClass,dataTut}) => {
    const [present] = useIonPicker();
    const {data:bankAccounts,isLoading:loading} = useBankAccounts();
    const handleAccountsList = ()=>{
        present({
            cssClass,
            buttons: [
                {
                    text: 'تایید',
                    handler: (selected) => {
                        // if(onCoinChoose)
                        //     onCoinChoose(selected.coins.value)
                        setBankAccount(selected.accounts)
                        // setSelectedCrypto({
                        //     ...selected.coins,
                        //     id:selected.coins.value
                        // })
                    },
                },
            ],
            columns: [
                {
                    name:'accounts',
                    options:bankAccounts.map(item=>({text:numType === 'number' ? String(item.cardNumber)
                            .match(/.{1,4}/g)
                            .join("-")  +"    "+ getBankName(item.cardNumber)[0]  : (item.iban +"    "+ getBankName(item.cardNumber)[0]),value:item.id})),
                },
            ],
        })
    }


    return (
        <div style={{width:'100%',position:'relative'}} data-tut={dataTut}>
            <IonLabel><span>کارت بانکی</span></IonLabel>
            <div
                style={{padding:0,paddingRight:5,display: 'flex',alignItems: 'center',justifyContent: 'center'}}
                className="satrexInput"
                onClick={handleAccountsList}
            >
                {
                    bankAccount.value &&
                    <img src={getBankName(bankAccounts?.filter(item=>item.id === bankAccount.value)[0].cardNumber)[1]} style={{width:30,height:30}} alt=""/>
                }

                {
                    bankAccount.text
                }


            </div>
            <div style={{position: 'absolute',left:15,top:37}}>
                <IonIcon icon={chevronDownOutline} style={{color:satrexGray}} />
            </div>
        </div>
    )
}
export default SelectCrypto;