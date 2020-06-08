var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

/* "querySelector" functions returns only a single element, even if the expected result should be multiple values. */ 
// var paciente = document.querySelector("#primeiro-paciente");

/* "querySelectorAll" function returns multiple elements. */
var pacientes = document.querySelectorAll(".paciente")

for (var i=0; i< pacientes.length; i++) {
    var paciente = pacientes[i];
    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;
    
    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;
    
    var tdImc = paciente.querySelector(".info-imc");
    
    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);
    
    if (!pesoEhValido) {
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido!";
        paciente.classList.add("paciente-invalido");
    }
    
    if (!validaAltura) {
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida!";
        paciente.classList.add("paciente-invalido");
    }
    
    if (pesoEhValido && alturaEhValida) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc.toFixed(2);
    }
}

function validaPeso(peso) {
    if (peso > 0 && peso <= 1000) {
        return true;
    }
    return false;
}

function validaAltura(altura) {
    if (altura > 0 && altura <= 3.0) {
        return true;
    }
    return false;
}

function calculaImc(peso, altura) {
    var imc = 0;
    imc = peso / (altura * altura);
    return imc;
}