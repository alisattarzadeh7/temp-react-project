import React, { useState } from 'react';
import jMoment from 'jalali-moment';
import SatrexTable from '../../../../components/SatrexTable';
import { useMessages } from '../../../../utils/queries';
import convertTz from '../../../../components/convertTz';
import { transFn } from '../../../../components/Trans';

export default () => {
    const { data: messages } = useMessages();
    // const handleDismiss = () => {
    //     dismiss();
    // };
    // const [present, dismiss] = useIonModal(Chats, {
    //     messageId: selectedMessage.id,
    //     onDismiss: handleDismiss,
    // });

    return (
        <div className="section remainedHeight pageBottomArea">
            {
                messages
                && (
                    <SatrexTable
                        headerData={[transFn('code'), transFn('topic'), transFn('Time'), transFn('date'), '...']}
                        data={messages?.map((item) => ({
                            id: item.id,
                            title: item.title,
                            time: jMoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('HH:mm:ss'),
                            date: jMoment(convertTz(item.createdAtUtc, 'Asia/Tehran').getTime()).format('jYYYY/jMM/jDD'),
                            operation: '',
                        }))}
                    />
                )
            }

        </div>
    );
};
