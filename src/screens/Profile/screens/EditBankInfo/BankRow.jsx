import React, { useEffect, useState } from 'react';
import { IonChip, IonLabel } from '@ionic/react';
import InputMask from 'react-input-mask';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import getBankName from '../../../../components/getBankName';
import SessionInput from '../../../Session/SessionInput';
import Trans, { transFn } from '../../../../components/Trans';
import { savingBankAccount, cancelAccount, sendBankAccountToAdmin } from '../../../../utils/apis';
import { satrexGreen, satrexRed } from '../../../../styles/colors';

const BankRow = ({
                     item, deleteAccount, setShowLoading, setNewBankAccounts, present, dismiss, animate,
                 }) => {
    const savingAccount = async () => {
        dismiss();
        setShowLoading(true);
        if (bankRow.lastConfirmationType === 'Rejected') {
            await sendBankAccountToAdmin({id:bankRow.id});
            return setShowLoading(false);
        }
        const result = await savingBankAccount({
            iban:bankRow.iban,
            cardNumber: bankRow.cardNumber.toString().replace(/ /g, ''),
        });
        if (result) {
            const sendToAdminResult = await sendBankAccountToAdmin({id:result});
            if(sendToAdminResult){
                setBankRow((bankRow) => ({ ...bankRow, ...result }));
                if (setNewBankAccounts) {
                    setNewBankAccounts((newBankAccounts) => newBankAccounts.map((account) => {
                        if (account.id === item.id) {
                            return { ...bankRow, ...result };
                        }
                        return account;
                    }));
                }
            }
        }
        setShowLoading(false);
    };

    const cancelConfirmRequest = async (id) => {
        setShowLoading(true);
        const result = await cancelAccount({id});
        if (result) setBankRow((bankRow) => ({ ...bankRow, lastConfirmationType: 'Editable' }));
        setShowLoading(false);
    };

    const [bankRow, setBankRow] = useState({
        cardNumber: '',
        iban: '',
        id: `${moment().format('x')}-temp`,
        notSent: true,
        lastConfirmationType: 'Editable',
    });

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setBankRow(item);
        }
        return () => {
            isMounted = false;
        };
    }, [item]);

    return (
        <>
            <div
                className={`row bankAccountRow ${animate && 'animate__animated animate__slideInDown'}`}
                style={{
                    backgroundColor: '#f8f8f8', padding: 12, marginTop: 4, direction: 'ltr',
                }}
            >
                {
                    bankRow.lastConfirmationType === 'Editable' ? (
                            <>
                                <div style={{ width: '70%', textAlign: 'right', position: 'relative' }}>
                                    <div style={{ fontSize: 12, position: 'relative' }}>
                                        <div className="row flex">
                                            <Tooltip
                                                title={transFn('SaveAndSubmitForAdminApproval')}
                                                aria-label={transFn('SaveAndSubmitForAdminApproval')}
                                            >
                                                <IconButton
                                                    className="rounded-9 bankInfoStyle"
                                                    aria-label="delete"
                                                    onClick={savingAccount}
                                                >
                                                    <SaveIcon
                                                        style={{ color: satrexGreen }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title={transFn('delete')}
                                                aria-label={transFn('delete')}
                                            >
                                                <IconButton
                                                    className="rounded-9 bankInfoStyle"
                                                    aria-label="delete"
                                                    onClick={() => deleteAccount(bankRow.id)}
                                                >
                                                    <DeleteIcon
                                                        style={{ color: satrexRed }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <div style={{ width: '60%', fontSize: 14 }}>
                                                {
                                                    getBankName(bankRow.cardNumber)[0]
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ width: '110%' }}>

                                        <InputMask
                                            value={bankRow.cardNumber}
                                            onChange={(e) => {
                                                const newVal = e.target.value;
                                                setBankRow((bankRow) => ({ ...bankRow, cardNumber: newVal }));
                                            }}
                                            maskChar=""
                                            placeholder={transFn('bankCardNumber')}
                                            mask="**** **** **** ****"
                                            formatChars={{ '*': '[A-Za-z0-9]' }}
                                        >
                                            {(inputProps) => (
                                                <SessionInput
                                                    {...inputProps}
                                                    style={{ marginTop: 10, width: '80%' }}
                                                    className="bankRowStyle"
                                                />
                                            )}
                                        </InputMask>
                                    </div>

                                    <div className="row" style={{ width: '140%' }}>

                                        <InputMask
                                            value={bankRow.iban}
                                            onChange={(e) => {
                                                const newVal = e.target.value;
                                                setBankRow((bankRow) => ({ ...bankRow, iban: newVal }));
                                            }}
                                            maskChar=""
                                            placeholder={transFn('bankIbanNumber')}
                                            mask="IR************************"
                                            formatChars={{ '*': '[A-Za-z0-9]' }}
                                        >
                                            {(inputProps) => (
                                                <SessionInput
                                                    {...inputProps}
                                                    style={{ marginTop: 10, width: '80%' }}
                                                    className="bankRowStyle shebaInput"
                                                />
                                            )}
                                        </InputMask>

                                    </div>
                                </div>
                                <div
                                    className="bankLogoDiv"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        padding: 2,
                                        boxShadow: '#d3d2d2 0px 1px 2px 0px',
                                        borderRadius: 4,
                                    }}
                                >
                                    <img
                                        src={getBankName(bankRow.cardNumber)[1]}
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        alt=""
                                    />
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div style={{ width: '70%', textAlign: 'right' }}>
                                    <div style={{ fontSize: 12, position: 'relative' }}>
                                        <IonChip
                                            color={bankRow.lastConfirmationType === 'ConfirmRequest' ? 'warning' : (bankRow.lastConfirmationType === 'Accepted' ? 'success' : 'danger')}
                                            style={{
                                                position: 'absolute',
                                                top: -5,
                                                left: 0,
                                                height: 25,
                                                width: 'fit-content',
                                                padding: 5,
                                            }}
                                        >
                                            <IonLabel style={{
                                                fontFamily: 'YekanRegular',
                                                letterSpacing: '0px',
                                                fontSize: 8,
                                            }}
                                            >
                                                <Trans>{bankRow.lastConfirmationType}</Trans>
                                            </IonLabel>
                                        </IonChip>

                                        {
                                            getBankName(bankRow.cardNumber)[0]
                                        }
                                    </div>
                                    <div className="flex space-between row-reverse" style={{ marginTop: 10, alignItems: 'flex-end' }}>

                                        <span style={{ fontSize: 12 }}>
                                            {
                                                String(bankRow.cardNumber)
                                                    .match(/.{1,4}/g)
                                                    .join('-')
                                            }
                                        </span>
                                        {
                                            bankRow.lastConfirmationType === 'ConfirmRequest' && (
                                                <Tooltip
                                                    title={transFn('Cancel review request')}
                                                    aria-label={transFn('Cancel review request')}
                                                >
                                                    <IconButton
                                                        onClick={async () => {
                                                            await cancelConfirmRequest(bankRow.id);
                                                        }}
                                                        style={{ position: 'relative', top: 9 }}
                                                    >
                                                        <HighlightOffIcon
                                                            style={{ color: satrexRed }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }
                                        {' '}
                                    </div>

                                </div>
                                <div
                                    className="bankLogoDiv"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        padding: 2,
                                        boxShadow: '#d3d2d2 0px 1px 2px 0px',
                                        borderRadius: 4,
                                    }}
                                >
                                    <img
                                        src={getBankName(item.cardNumber)[1]}
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        alt=""
                                    />
                                </div>
                            </>
                        )
                }

            </div>
        </>
    );
};
export default BankRow;
