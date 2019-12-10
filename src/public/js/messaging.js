// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA_djeuNUIgtJ4tk5HQvXAk75woOILe1ts",
    authDomain: "heartbeatapp7.firebaseapp.com",
    databaseURL: "https://heartbeatapp7.firebaseio.com",
    projectId: "heartbeatapp7",
    storageBucket: "heartbeatapp7.appspot.com",
    messagingSenderId: "199806822412",
    appId: "1:199806822412:web:e7ac270d543ec9c4456629",
    measurementId: "G-3GWR0EL2DG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.initializeApp({ 'messagingSenderId': '199806822412' });
var messaging = firebase.messaging();

function initFirebaseMessagingRegistration() {
    messaging.requestPermission()
        .then(function() {
            //messageElement.innerHTML = "Got notification permission";
            console.log("Got notification permission");
            messaging.getToken().then(function(token) {
                console.log(token)
                document.getElementById("token").value = token;
            });
            return messaging.getToken();
        })
        .then(function(token) {
            // print the token on the HTML page
            //console.log(token)
            document.getElementById("btnSubmit").type = "submit";
            document.getElementById("btnSubmit").click();
            tokenElement.innerHTML = "Token is " + token;
        })
        .catch(function(err) {
            //errorElement.innerHTML = "Error: " + err;
            console.log("Didn't get notification permission", err);
        });
}

messaging.onMessage(function(payload) {
    // console.log("Message received. ", JSON.stringify(payload));
    // const notification = JSON.stringify(payload);
    console.log(payload.data.situacion);
    if (payload.data.situacion === "'Normal'") {

        var delay = alertify.get('notifier', 'delay');
        alertify.set('notifier', 'delay', 15);
        alertify.warning('========Precaucion========  El usuario: ' + payload.data.nombre + ' està presentando anomalìas cardiacas');
        alertify.set('notifier', 'delay', delay);

        var userAlert = document.getElementById('userAlert');
        var newElment = document.createElement("button");
        newElment = document.appendChild( payload.data.nombre );
        userAlert.innerHTML = newElment;


    } else if (payload.data.situacion === "'Peligro") {

        var delay1 = alertify.get('notifier', 'delay');
        alertify.set('notifier', 'delay1', 15);
        alertify.error('=========Preligro=========  El usuario: ' + payload.data.nombre + ' està presentando anomalìas cardiacas');
        alertify.set('notifier', 'delay1', delay1);

    }



    notificationElement.innerHTML = notificationElement.innerHTML + " " + payload.nombre;

});

messaging.onTokenRefresh(function() {
    messaging.getToken()
        .then(function(refreshedToken) {
            console.log('Token refreshed.');
            tokenElement.innerHTML = "Token is " + refreshedToken;
        }).catch(function(err) {
            errorElement.innerHTML = "Error: " + err;
            console.log('Unable to retrieve refreshed token ', err);
        });
});


function clicked(l,l1){
    console.log(l +' '+l1)
}