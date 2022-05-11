import React from 'react';

export default [
  {
    selector: '[data-tut="tabRowSecrtion"]',
    content: () => (
      <div>
        <p> با کلیک بر روی هر کدام از این قسمت ها میتوانید به تب های متفاوت دسترسی داشته باشید</p>
        <p>
<span style={{ color: 'red' }}> نکته:</span>
<span>در صورتی که تبی مشاهده نمیشود میتوانید بخش را به سمت چپ و یا راست بکشید</span>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tut="tabBodySection"]',
    content: () => (
      <div>
        <p>همچنین برای جابه جایی بین تب ها میتوانید این قسمت را به سمت راست یا چپ بکشید </p>
      </div>
    ),
  },

];
