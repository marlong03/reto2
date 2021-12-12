const url = "144.22.56.156";//cambiar esta url por la url de tu instancia oracle

const email = document.getElementById("email")
const password = document.getElementById("password")
const submit = document.getElementById("submit")

let respuesta;

submit.addEventListener("click",function(){
    const ajax = $.ajax({
        method:"GET",
        url:"http://" + url + ":8080/api/user/all"
    })
    ajax.done(function(datosDB){
        if(email.value && password.value){

            if(datosDB.length < 1){

                respuesta = "Usuario no existe"

            }else{
                
                for(dato of datosDB){

                    if(dato.email == email.value){

                        if(dato.password == password.value){
                            respuesta = "Bienvenido " + dato.name
                            window.location="productos.html";
                        }
                        else{
                            respuesta = "Contraseña incorrecta"
                        }

                    }else{
                        respuesta = "Usuario no existe"
                    }

                }
            }

        }else{
            respuesta = "Rellene los campos vacios"
        }
        
        alert(respuesta)
    })
    ajax.fail(function(err){
        console.log(err)
    })

})
