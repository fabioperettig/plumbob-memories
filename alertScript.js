var alerta = document.getElementById("alerta");
var alertBorder = document.getElementById("alert-border");
let isExibirAlertaAtivo = true;

function exibirAlerta() {

    if (isExibirAlertaAtivo) {
        alerta.style.display = "block";
        alertBorder.style.display = "block";
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("alerta-exibido");
        var audio = new Audio('_elements/achievement01.mp3');
        audio.volume = 0.5;
        audio.play();
    }

}

document.querySelector('.btnCloseAlert').addEventListener('click', () => {
    alerta.style.display = "none";
    alertBorder.style.display = "none";
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("alerta-exibido");
    
    isExibirAlertaAtivo = false

    setTimeout(() => {
        isExibirAlertaAtivo = true
    }, 10000);

})
