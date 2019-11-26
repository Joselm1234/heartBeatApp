

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
    res.render('index');
})

// ruta para registrar usuarios
router.get('/registrar',(req,res)=>{
    res.render('auth/registrar');
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