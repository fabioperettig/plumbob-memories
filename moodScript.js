

function setupMood({
    barId,
    buttonClass,
    decreaseInterval,
    decreaseAmount,
    increaseAmount,
    coolDown,
    
})

{
    const progress = document.getElementById(barId);
    const button = document.querySelector(`.${buttonClass}`);
    const originalWidth = 100;
    progress.style.width = originalWidth + '%';

    let timeDecrease = setInterval(decreaseMood, decreaseInterval);
    let timeIncrease;

    function decreaseMood() {
        let currentWidth = parseInt(progress.style.width);
        if (currentWidth > 0) {
            let newWidth = currentWidth - decreaseAmount;
            if (newWidth < 0) newWidth = 0;
            progress.style.width = newWidth + '%';
            updateProgressColor();
        } else {
            clearInterval(timeDecrease);
        }
    }

    button.addEventListener('click', () => {
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
        }, coolDown);

        if (timeIncrease) clearInterval(timeIncrease);

        let currentWidth = parseInt(progress.style.width);
        if (currentWidth < originalWidth) {
            timeIncrease = setInterval(increaseMood, 200);
        }
    });

    function increaseMood() {
        let currentWidth = parseInt(progress.style.width);
        if (currentWidth < originalWidth) {
            let newWidth = currentWidth + increaseAmount;
            if (newWidth >= originalWidth){
                newWidth = originalWidth;
                clearInterval(timeIncrease);

                timeDecrease = setInterval(decreaseMood, decreaseInterval);
            }
            progress.style.width = newWidth + '%';
            updateProgressColor();
        }
    }

        function updateProgressColor() {
        let currentWidth = parseInt(progress.style.width);

        progress.classList.remove('full', 'high', 'medium', 'low');
        if (currentWidth >= 80 || currentWidth === originalWidth) {
            progress.classList.add('full');
        } else if (currentWidth > 40) {
            progress.classList.add('high');
        } else if (currentWidth > 20) {
            progress.classList.add('medium');
        } else {
            progress.classList.add('low');
        }
    }

}