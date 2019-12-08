
const { Router } = require('express');
const router = Router();
var firebase = require("firebase");

require("firebase/messaging");
require("firebase/auth");
require("firebase/firestore");


// configuracion de la conecsion con firebase
const firebaseConfig = {
    apiKey: "AIzaSyA_djeuNUIgtJ4tk5HQvXAk75woOILe1ts",
    authDomain: "heartbeatapp7.firebaseapp.com",
    databaseURL: "https://heartbeatapp7.firebaseio.com",
    projectId: "heartbeatapp7",
    storageBucket: "heartbeatapp7.appspot.com",
    messagingSenderId: "199806822412",
    appId: "1:199806822412:web:e7ac270d543ec9c4456629",
    measurementId: "G-3GWR0EL2DG"
};

// Inicializando base de datos
firebase.initializeApp(firebaseConfig);

// variable para consultas de la bese de datos
const db = firebase.database()


// verifica si hay un logeado
var user;
firebase.auth().onAuthStateChanged((data) => {
    user = data
    // console.log(user);
})

// pagina de inicio
router.get('/', (req, res) => {
    // console.log(user)
    if (user) {
        //extrae de la base de datos los usuarios moviles y los cuenta
        db.ref('Usuario').once('value', (snapshot) => {
            const usuarios = snapshot.numChildren();
            res.render('index', { cantidadDeUsuarios: usuarios });
        })
    } else {
        res.redirect('login')
    }

    // console.log(user)

});

// mostrar formulario registro de usuarios
router.get('/registrar', (req, res) => {
    if (user) {

        res.render('auth/registrar');
    } else {

        res.redirect('login')

    }
});


// registrar un usuario web
router.post('/registrarUsuario', (req, res) => {
    const newUser = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    };


    firebase.auth().createUserWithEmailAndPassword(newUser.correo, req.body.password).then((res) => {
        console.log(res)
        db.ref('usersWeb').push(newUser);
    }).catch((err) => {
        console.error(err)
    })
    res.render('auth/registrar')
})

// mostrar el login 
router.get('/login', (req, res) => {
    if (user) {
        res.redirect('/');
    } else {

        res.render('auth/login')
    }
})


// login auth

router.post('/auth', (req, res) => {
    var email = req.body.email;
    var pass = req.body.password;
    var error;
        
   let userFetch = false;
    db.ref('usersWeb').orderByChild('correo').equalTo(email).on('child_added',(snapshot)=>{
            userFetch = true
    });

    if(userFetch){

        firebase.auth().signInWithEmailAndPassword(email, pass).then((data)=>{
            console.log(data)
            res.redirect('/');
        }).catch((err)=> {
            error = err.code;
            res.render('auth/login',{error:'Usuario o Contraseña incorrecta'}); 
            error  = ''
          });
      
    } else {

        res.render('auth/login',{error:'Usuario o Contraseña incorrecta'}); 
        error = ''
      
    }
});


// cerrar sesion
router.get('/salir', (req, res) => {

    firebase.auth().signOut().then((data) => {
        res.redirect('login')
    }).catch((error) => {
        console.error(error);
        var errorCode = error.code;
        var errorMessage = error.message;
    })
})


// lista usuarios de la app movil

router.get('/listarUsuarios', (req, res) => {
    if (user) {
        db.ref('Usuario').once('value', (snapshot) => {
            const data = snapshot.val()
            res.render('userLists', { usuarios: data })
        });
    } else {
        res.redirect('login')
    }
});




module.exports = router;