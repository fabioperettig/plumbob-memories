// Seleciona os elementos do DOM
const progress = document.getElementById("progress");
const comer = document.querySelector('.btnHunger');
progress.style.width = '100%';
const originalWidth = 100;// 100%

let timeHunger = setInterval(moodHunger, 1000); // Fome diminui com o tempo
let timeEating;

// Função para diminuir a fome com o tempo
function moodHunger() {
    let hunger = parseInt(progress.style.width);
    if (hunger > 0) {
        let newWidth = hunger - 5;
        progress.style.width = newWidth + '%';
    } else {
        clearInterval(timeHunger);
    }    
}


comer.addEventListener('click', () => {
    comer.disabled = true; // desativa o botão
    setTimeout(() => {
        comer.disabled = false; // reativa o botão após 10 segundos
    }, 10000); // 10 segundos em milissegundos

    clearInterval(timeHunger); // Para o intervalo de diminuição da largura, se estiver ativo
    
    let currentWidth = parseFloat(window.getComputedStyle(progress, null).getPropertyValue("width")); // Obtém a largura atual como um número
    if (currentWidth < originalWidth) {
        timeEating = setInterval(increaseWidth, 200); // Inicia o intervalo para aumentar a largura
    }
});

// Função para aumentar a largura
function increaseWidth() {
    let currentWidth = parseInt(progress.style.width);
    if (currentWidth < parseInt(originalWidth)) {
        let newWidth = currentWidth + 10; // Aumenta a largura em 10 pixels
        if (newWidth >= originalWidth) {
            newWidth = originalWidth; 
            clearInterval(timeEating);
            timeHunger = setInterval(moodHunger, 1000);
        }
        progress.style.width = newWidth + '%';
    }
}