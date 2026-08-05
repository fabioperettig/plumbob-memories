const alerta = document.getElementById('alerta');
const alertBorder = document.getElementById('alert-border');
const closeAlertButton = document.querySelector('.btnCloseAlert');
let isExibirAlertaAtivo = true;
let alertCoolDownTimer = null;

function exibirAlerta() {
    if (!isExibirAlertaAtivo || !alerta || !alertBorder) {
        return;
    }

    alerta.style.display = 'flex';
    alertBorder.style.display = 'block';
    document.body.classList.add('alerta-exibido');

    const audio = new Audio('assets/audio/achievement01.mp3');
    audio.volume = 1;
    audio.play().catch(() => {
        console.warn('O navegador bloqueou a reprodução do áudio.');
    });
}

function fecharAlerta() {
    if (!alerta || !alertBorder) {
        return;
    }

    alerta.style.display = 'none';
    alertBorder.style.display = 'none';
    document.body.classList.remove('alerta-exibido');
    isExibirAlertaAtivo = false;

    if (alertCoolDownTimer !== null) {
        clearTimeout(alertCoolDownTimer);
    }

    alertCoolDownTimer = setTimeout(() => {
        isExibirAlertaAtivo = true;
        alertCoolDownTimer = null;
    }, 10000);
}

if (closeAlertButton) {
    closeAlertButton.addEventListener('click', fecharAlerta);
}
