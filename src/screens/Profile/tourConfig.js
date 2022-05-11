import React from 'react';
import sliderTourConfig from '../../components/slider/tourConfig';

export default [
  ...sliderTourConfig,
  {
    selector: '[data-tut="editBankInfo"]',
    content: () => (
      <div>
        <p>تمامی فرایند های مربوط به کارت بانکی در این قسمت انجام میشود </p>
      </div>
    ),
  },
  {
    selector: '[data-tut="editProfile"]',
    content: () => (
      <div>
        <p>تمامی فرایند های مربوط به احراز هویت در این قسمت انجام میشود </p>
      </div>
    ),
  },
{
    selector: '[data-tut="messages"]',
    content: () => (
      <div>
        <p>لیست تمامی پیام ها را در این قسمت میتوانید مشاهده کنید</p>
      </div>
    ),
  },
];
