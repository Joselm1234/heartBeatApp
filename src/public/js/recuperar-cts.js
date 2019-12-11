var recorverPass = function(){
    console.log('hola');
    var auth = firebase.auth();
    var emailAddress = document.getElementsByName('basic-addon1').val();

    auth.sendPasswordResetEmail(emailAddress)
    .then(function(){
        alert('Se ha enviado un correo a su cuenta siga los paso');
    },function(error){
        console.log(error);
    })
};