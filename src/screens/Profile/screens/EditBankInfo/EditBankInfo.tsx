import React, { useEffect, useState } from 'react';
import {
    IonLoading, IonSkeletonText, useIonActionSheet, useIonAlert,
} from '@ionic/react';
import { useQueryClient } from 'react-query';
import moment from 'moment';
import binImg from '../../../../images/profile/22.png';
import { satrexGray } from '../../../../styles/colors';
import Trans, { transFn } from '../../../../components/Trans';
import cardImg from '../../../../images/profile/12.png';
import BankRow from './BankRow';
import { useBankAccounts } from '../../../../utils/queries';
import { removingAccount } from '../../../../utils/apis';
import { bankAccountRowType, ProgressViewPropsTypes } from '../../../../utils/interfaces';

const index: React.FC<ProgressViewPropsTypes> = ({ setMaxAllowedStep, setStopStep }) => {
    const [present] = useIonAlert();
    const [mounted, setMounted] = useState(false);
    const { data: bankAccounts, isLoading: loading } = useBankAccounts();
    const [newBankAccounts, setNewBankAccounts] = useState<bankAccountRowType[]>([]);
    const [showLoading, setShowLoading] = useState(false);
    const queryClient = useQueryClient();
    const [presentPicker, dismiss] = useIonActionSheet();
    const deleteAccount = async (id: number) => {
        dismiss();
        setShowLoading(true);
        if (!String(id).split('-')[1]) {
            const result = await removingAccount(id);
            if (result) {
                // @ts-ignore
                queryClient.setQueryData('bankAccounts', queryClient.getQueryData('bankAccounts').filter((item: bankAccountRowType) => item.id !== id));
                setNewBankAccounts(newBankAccounts.filter((item: bankAccountRowType) => (item.id).toString() !== (id).toString()));
            }
            setShowLoading(false);
        } else {
            setNewBankAccounts(newBankAccounts.filter((item: bankAccountRowType) => (item.id).toString() !== (id).toString()));
            setShowLoading(false);
        }
    };

    const handleNewAccount = () => {
        // eslint-disable-next-line no-shadow
        setNewBankAccounts((newBankAccounts: bankAccountRowType[]) => [
            ...newBankAccounts, {
                cardNumber: '',
                iban: '',
                id: `${moment().format('x')}-temp`,
                notSent: true,
                lastConfirmationType: 'Editable',
            },
        ]);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setMounted(true);

            if (bankAccounts) {
                if (bankAccounts.filter((item: bankAccountRowType) => item.lastConfirmationType === 'Accepted').length > 0) {
                    if (setMaxAllowedStep) {
                        // @ts-ignore
                        setMaxAllowedStep(3);
                        if (setStopStep) {
                            setStopStep(3);
                        }
                    }
                }
            }
        }
        return () => {
            dismiss();
            isMounted = false;
        };
    }, [bankAccounts]);

    const handleDeleteAll = async () => {
        const remainingAccounts = bankAccounts.filter((item: any) => item.lastConfirmationType !== 'Accepted');
        if (newBankAccounts.length > 0 || remainingAccounts.length > 0) {
            present({
                header: transFn('Delete all accounts'),
                message: transFn('Are you sure you want to delete all accounts?'),
                buttons: [
                    'انصراف',
                    {
                        text: 'بله',
                        handler: () => {
                            let i = 0; //  set your counter to 1

                            function removingItem() { //  create a loop function
                                setTimeout(async () => { //  call a 3s setTimeout when the loop is called
                                    const result = await removingAccount(remainingAccounts[i].id);
                                    if (result) { // @ts-ignore
                                      await queryClient.setQueryData('bankAccounts', queryClient.getQueryData('bankAccounts').filter((item) => item.id !== remainingAccounts[i].id));
                                    }
                                    i++;
                                    if (i < remainingAccounts.length) {
                                        removingItem();
                                    }
                                }, 500);
                            }

                            let j = 0;

                            function removingNewItem() {
                                const newBankList = newBankAccounts;
                                setTimeout(async () => {
                                    if (newBankList[j].lastConfirmationType !== 'Editable') await removingAccount(newBankList[j].id);
                                    // eslint-disable-next-line no-shadow
                                    setNewBankAccounts((newBankAccounts) => newBankAccounts.filter((account) => account.id !== newBankList[j].id));
                                    j++;
                                    if (j < newBankAccounts.length) {
                                        removingNewItem();
                                    }
                                }, 500);
                            }

                            if (newBankAccounts.length > 0) removingNewItem();

                            const mustWait = newBankAccounts.length * 500;
                            if (remainingAccounts.length > 0) {
                                setTimeout(() => {
                                    removingItem();
                                }, mustWait);
                            }

                            // queryClient.setQueryData('bankAccounts',queryClient.getQueryData('bankAccounts'))
                        },
                    },
                ],
            });
        }
    };

    return (
        <>
            <div className="flex center column">
                <div className="bankInfoButtonsDiv" style={{ width: '100%' }}>

                    <div className="row center" style={{ width: '100%', paddingBottom: 5, paddingTop: 25 }}>

                        <div
                            style={{ width: '40%', paddingBottom: 10 }}
                            data-tut="deleteAll"
                            className="fadeGradientBtn row"
                            onClick={handleDeleteAll}
                        >
                            <div style={{ width: '100%' }}>
                                <img src={binImg} style={{ width: 27 }} alt="" />
                            </div>
                            <div style={{ width: '100%' }}>
                                <span style={{ fontSize: 10, color: satrexGray }}><Trans>Delete all</Trans></span>
                            </div>
                        </div>

                        <div
                            style={{ width: '40%', paddingBottom: 10 }}
                            data-tut="addBankrow"
                            className="fadeGradientBtn row"
                            onClick={handleNewAccount}
                        >
                            <div style={{ width: '100%' }}><img src={cardImg} style={{ width: 40 }} alt="" /></div>
                            <div style={{ width: '100%' }}>
                                    <span
                                        style={{ fontSize: 10, color: satrexGray }}
                                    >
                                    <Trans>addBankAccount</Trans>
                                    </span>
                            </div>
                        </div>

                    </div>

                </div>
                <div style={{ paddingBottom: 100, paddingTop: 30 }}>
                    {/* <div style={{ padding: 10 }}> */}
                    {/*    <div> */}
                    {/*        <span><Trans>Touch for a while to perform the desired bank account operation</Trans></span> */}
                    {/*    </div> */}
                    {/* </div> */}
                    {/* <div>{ */}
                    {/*    */}
                    {/* }</div> */}
                    {/* <img src={getBankName('6037 99')[1]} style={{width:50}} alt=""/> */}
                    <div style={{
                        width: '100%', height: '100%', paddingLeft: 30, paddingRight: 30,
                    }}
                    >
                        <div
                            className="bankSection"
                            data-tut="bankRows"
                            style={{ borderRadius: 5, padding: 15, paddingTop: 11 }}
                        >
                            {
                                bankAccounts && bankAccounts.map((item: any, i: number) => (
                                    <div style={{ width: '100%' }} key={i}>
                                        <BankRow
                                            setShowLoading={setShowLoading}
                                            item={item}
                                            deleteAccount={deleteAccount}
                                            present={presentPicker}
                                            dismiss={dismiss}
                                            setNewBankAccounts={undefined}
                                            animate={undefined}
                                        />
                                    </div>
                                ))
                            }
                            {

                                newBankAccounts
                                && newBankAccounts.map((item, i) => (
                                    <BankRow
                                        animate
                                        setShowLoading={setShowLoading}
                                        setNewBankAccounts={setNewBankAccounts}
                                        key={i}
                                        item={item}
                                        deleteAccount={deleteAccount}
                                        present={presentPicker}
                                        dismiss={dismiss}
                                    />
                                ))
                            }
                            {
                                loading && (
                                    <>
                                        <div
                                            className="row bankAccountRow"
                                            style={{
                                                backgroundColor: '#f8f8f8', padding: 12, marginTop: 4, direction: 'ltr',
                                            }}
                                        >
                                            <div style={{ width: '70%', textAlign: 'right', marginTop: 5 }}>
                                                <IonSkeletonText animated style={{ width: 150, height: 7, float: 'right' }} />
                                                <IonSkeletonText
                                                    animated
                                                    style={{
                                                        width: 150,
                                                        height: 7,
                                                        float: 'right',
                                                        marginTop: 10,
                                                    }}
                                                />

                                            </div>
                                            <IonSkeletonText animated style={{ width: 40, height: 40 }} />
                                        </div>
                                        <div
                                            className="row bankAccountRow"
                                            style={{
                                                backgroundColor: '#f8f8f8', padding: 12, marginTop: 4, direction: 'ltr',
                                            }}
                                        >
                                            <div style={{ width: '70%', textAlign: 'right', marginTop: 5 }}>
                                                <IonSkeletonText animated style={{ width: 150, height: 7, float: 'right' }} />
                                                <IonSkeletonText
                                                    animated
                                                    style={{
                                                        width: 150,
                                                        height: 7,
                                                        float: 'right',
                                                        marginTop: 10,
                                                    }}
                                                />

                                            </div>
                                            <IonSkeletonText animated style={{ width: 40, height: 40 }} />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <IonLoading
                // cssClass='my-custom-class'
                backdropDismiss
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={transFn('please wait...')}
                spinner="lines"
            />
        </>
    );
};

export default index;
