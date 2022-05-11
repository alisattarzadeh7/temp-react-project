importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: 'AIzaSyDjpdtHvB46RIJTox-jE6z7gX-5iN29qlM',
    authDomain: 'satrexexchange.firebaseapp.com',
    projectId: 'satrexexchange',
    storageBucket: 'satrexexchange.appspot.com',
    messagingSenderId: '234416771430',
    appId: '1:234416771430:web:2c22916731b41c5e82b8a7',
    measurementId: 'G-3HE7MCDXSX',

});
const messaging = firebase.messaging();
