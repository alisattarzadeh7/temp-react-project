import React from 'react';
import Trans from '../../../../components/Trans';

export default [
  {
    selector: '[data-tut="deleteAll"]',
    content: () => (
      <div>
        <p>
          برای پاک کردن تمامی اکانت های بانکی از این گزینه استفاده کنید
        </p>
        <p>
<span style={{ color: 'red' }}>نکته:</span>
<span>با فشار دادن این دکمه اکانت های تایید شده شما نیز حذف میشود</span>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tut="addBankrow"]',
    content: () => (
      <div>
        <p>
          برای اضافه کردن اکانت جدید از این گزینه استفاده کنید
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tut="bankRows"]',
    content: () => (
      <div>
        <p>
          <Trans>Touch for a while to perform the desired bank account operation</Trans>
        </p>
      </div>
    ),
  },
];
