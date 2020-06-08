var botaoAdicionar = document.querySelector("#buscar-pacientes");
botaoAdicionar.addEventListener("click", function() {
    

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function() {
    var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {

            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);
            console.log(pacientes);

            pacientes.forEach(function(paciente){
                adicionarPacienteNaTabela(paciente);
            });
            erroAjax.classList.add("invisivel");
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    })
    xhr.send();
})
