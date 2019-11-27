

const admin = require('firebase-admin')

var serviceAccount = require("../../daBConnection/heartbeatapp7-firebase-adminsdk-gykhk-c5e64a1d2b.json");
admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://heartbeatapp7.firebaseio.com/'
});


const {Router} = require('express');
const router = Router();

const db = admin.database();
// pagina de inicio
router.get('/',(req,res)=>{
    db.ref('Usuario').once('value',(snapshot)=>{
        const usuarios = snapshot.numChildren();
        res.render('index', {cantidadDeUsuarios:usuarios});
    })
})

// ruta para registrar usuarios
router.get('/login',(req,res)=>{
    res.render('auth/login');
})
//ruta para el login
router.get('/registrar',(req,res)=>{
    res.render('auth/registrar');
})

// ruta para mostrar lista de usuarios
router.get('/listarUsuarios', (req,res)=>{
    db.ref('Usuario').once('value',(snapshot)=>{
            const data = snapshot.val()
            res.render('userLists', {usuarios:data})
    })
})

router.post('/registrarUsuario', (req,res)=>{
    const newUser = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo,
        password: req.body.password
    }

    //console.log(db.ref('usuariosWeb').isEqual(newUser).nombre);
    console.log(newUser);
    
    db.ref('usersWeb').push(newUser);
    res.render('index')
})

/**
router.get('/dashboard',(req,res)=>{
    res.render('dashboard');
})
*/

module.exports = router;