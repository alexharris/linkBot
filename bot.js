// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAWR5oRFAs6_B7FCr7A882Gf9R0dKGPK8o",
    authDomain: "musicrecs-d37a6.firebaseapp.com",
    databaseURL: "https://musicrecs-d37a6.firebaseio.com",
    projectId: "musicrecs-d37a6",
    storageBucket: "musicrecs-d37a6.appspot.com",
    messagingSenderId: "21696461868",
    appId: "1:21696461868:web:73476ee43763d343"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pongy');

       }

       firebase.firestore().collection("messages").add({
        message: message.content
    })       

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret