const url = "144.22.56.156";//cambiar esta url por la url de tu instancia oracle

const username = document.getElementById("username");
const email1 = document.getElementById("email1");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const submit1 = document.getElementById("submit1")

let respuesta;
let arrayEmailExistente = []


submit1.addEventListener("click", function () {
    const ajax = $.ajax({
        method: "GET",
        url: "http://" + url + ":8080/api/user/all"
    })
    ajax.done(function (datosDB) {

        if(datosDB.length < 1){

            if (email1.value && password1.value && password2.value && username.value) {
                
                if (password1.value == password2.value) {
                    realiceAjax()
                    respuesta ="Usuario registrado con exito"
                }else{
                    respuesta ="contraseñas no coinciden"
                }

            }else{
                respuesta ="rellene campos sin usuarios en el sistema"
            }

        }
        else{
            if (email1.value && password1.value && password2.value && username.value) {
                
                for (dato of datosDB){

                    if (dato.email !== email1.value) {
                        validatePassword()
                    }
                    else {
                        arrayEmailExistente.push(dato)
                        validatePassword()
                    }

                }
            } else {
                respuesta = "Rellene los campos vacios"
            }

    }
        alert(respuesta)
    })
    ajax.fail(function (err) {
        console.log(err)
    })
})


function validatePassword(){
    if (password1.value == password2.value) {

        if (arrayEmailExistente.length < 1) {
                realiceAjax()
            respuesta = "Usuario registrado con exito"
        } else {
            respuesta = "Usuario ya existe"
        }

    }
    else {
        respuesta = "Contraseñas no coinciden"
    }
}


function realiceAjax (){
    let ajax = $.ajax({
        method: "POST",
        url: "http://" + url + ":8080/api/user/new",
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(
            {
                "name": username.value.toString(),
                "email": email1.value.toString(),
                "password": password1.value.toString()
            })
    })
    ajax.done(function(res){
        console.log(res)
    })
    ajax.fail(function(err){
        console.log(err)
    })
} 