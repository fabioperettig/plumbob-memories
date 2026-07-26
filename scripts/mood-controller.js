function setupMood({
    barId,
    buttonClass,
    decreaseInterval,
    decreaseAmount,
    increaseAmount,
    coolDown,
    onValueChange = () => {}
}) {
    const progress = document.getElementById(barId);
    const button = document.querySelector(`.${buttonClass}`);

    if (!progress || !button) {
        console.warn(`Não foi possível inicializar a necessidade "${barId}".`);
        return null;
    }

    const maximumValue = 100;
    const increaseInterval = 100;
    let currentValue = maximumValue;
    let decreaseTimer = null;
    let increaseTimer = null;
    let coolDownTimer = null;

    function render() {
        progress.style.width = `${currentValue}%`;
        progress.setAttribute('aria-valuenow', currentValue);
        progress.classList.remove('full', 'high', 'medium', 'low');

        if (currentValue >= 80) {
            progress.classList.add('full');
        } else if (currentValue > 40) {
            progress.classList.add('high');
        } else if (currentValue > 20) {
            progress.classList.add('medium');
        } else {
            progress.classList.add('low');
        }

        onValueChange(currentValue);
    }

    function stopDecrease() {
        if (decreaseTimer !== null) {
            clearInterval(decreaseTimer);
            decreaseTimer = null;
        }
    }

    function stopIncrease() {
        if (increaseTimer !== null) {
            clearInterval(increaseTimer);
            increaseTimer = null;
        }
    }

    function startDecrease() {
        stopDecrease();

        decreaseTimer = setInterval(() => {
            currentValue = Math.max(0, currentValue - decreaseAmount);
            render();

            if (currentValue === 0) {
                stopDecrease();
            }
        }, decreaseInterval);
    }

    function startIncrease() {
        stopDecrease();
        stopIncrease();

        increaseTimer = setInterval(() => {
            currentValue = Math.min(maximumValue, currentValue + increaseAmount);
            render();

            if (currentValue === maximumValue) {
                stopIncrease();
                startDecrease();
            }
        }, increaseInterval);
    }

    function handleClick() {
        if (button.disabled || currentValue === maximumValue) {
            return;
        }

        button.disabled = true;
        startIncrease();

        coolDownTimer = setTimeout(() => {
            button.disabled = false;
            coolDownTimer = null;
        }, coolDown);
    }

    button.addEventListener('click', handleClick);
    render();
    startDecrease();

    return {
        destroy() {
            stopDecrease();
            stopIncrease();

            if (coolDownTimer !== null) {
                clearTimeout(coolDownTimer);
            }

            button.removeEventListener('click', handleClick);
        }
    };
}
