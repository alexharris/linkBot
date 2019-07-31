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
    // Send "pong" to the same channel
        message.channel.send('pong1');
        console.log('pong: ' + Date.now())
    } else if (message.content.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)) {
    
        message.react("🤖")
        console.log('link received')
    if (message.content.includes('youtube') === true || message.content.includes('youtu.be') === true ) {
        console.log('youtube received')
        // message.channel.send('youtube')
        var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        var url = message.content.match(validUrlRegex)
        console.log(url)
        // Get youtube id from url
        
        var youtubeId;
        if (url[0].split('v=')[1] != undefined) {
            youtubeId = url[0].split('v=')[1];
            var ampersandPosition = youtubeId.indexOf('&');
            if(ampersandPosition != -1) {
                youtubeId = youtubeId.substring(0, ampersandPosition);
            }
        } else if (url[0].substring(url[0].lastIndexOf('/') + 1) != undefined) {
            youtubeId = url[0].substring(url[0].lastIndexOf('/') + 1)
        }
        firebase.firestore().collection("messages").add({
            message: message.content,
            user: message.author.username,
            createdTimestamp: message.createdTimestamp,
            youtubeId: youtubeId,
            type: 'youtube'
        })
    } else if (message.content.includes('spotify') === true) {
        console.log('spotify received')
        var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        var url = message.content.match(validUrlRegex)

        // Get spotify id from url
        var spotifyId = url[0].substring(url[0].lastIndexOf('/') + 1)
        // check to see if this is an album
        if(url[0].includes('album')) {
            //then write the data
            firebase.firestore().collection("messages").add({
                message: message.content,
                user: message.author.username,
                createdTimestamp: message.createdTimestamp,
                url: url[0],
                type: 'spotify',
                spotifyId: spotifyId,
                spotifyTrackOrAlbum: 'album'
            })          
        // or if it is a track
        } else if (url[0].includes('track')) {
            // then write the data
            firebase.firestore().collection("messages").add({
                message: message.content,
                user: message.author.username,
                createdTimestamp: message.createdTimestamp,
                url: url[0],
                type: 'spotify',
                spotifyId: spotifyId,
                spotifyTrackOrAlbum: 'track'
            })    
        } else {
            console.log('Not a valid Spotify link')
        }
    }    
    else if (message.content.includes('soundcloud') === true) {
        console.log('soundcloud received')
        var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        var url = message.content.match(validUrlRegex)
        
        firebase.firestore().collection("messages").add({
            message: message.content,
            user: message.author.username,
            createdTimestamp: message.createdTimestamp,
            url: url[0],
            type: 'soundcloud'
        })
    }   
    else if (message.content.includes('bandcamp') === true) {
        console.log('bandcamp received')
        var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        var url = message.content.match(validUrlRegex)
        console.log(url)
        firebase.firestore().collection("messages").add({
            message: message.content,
            user: message.author.username,
            createdTimestamp: message.createdTimestamp,
            url: url[0],
            type: 'bandcamp'
        })
    } else {
        console.log('other link received')
        var validUrlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        var url = message.content.match(validUrlRegex)
        firebase.firestore().collection("messages").add({
            message: message.content,
            user: message.author.username,
            createdTimestamp: message.createdTimestamp,
            url: url[0],
            type: 'other'
        })        
    }  
    }     

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret