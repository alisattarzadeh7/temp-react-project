import React from 'react';

export default [
  {
    selector: '[data-tut="notifSection"]',
    content: () => (
      <div>
        <p>
          جدیدترین اعلان های شما در این مکان قرار میگیرد
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tut="menuButton"]',
    content: () => (
      <div>
        <p>با فشار دادن این بخش منو کنار ظاهر میشود</p>
      </div>
    ),
  },
];
