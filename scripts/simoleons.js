const SIMOLEON_MINIMUM = 0;
const SIMOLEON_MAXIMUM = 999999999;
const INITIAL_SIMOLEON_BALANCE = 0;

let currentSimoleonBalance = INITIAL_SIMOLEON_BALANCE;
let simoleonFeedbackTimer = null;

function normalizeSimoleonValue(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return null;
    }

    return Math.trunc(number);
}

function formatSimoleonBalance(value) {
    const language = document.documentElement.lang || 'pt-BR';

    return new Intl.NumberFormat(language, {
        maximumFractionDigits: 0,
        useGrouping: true
    }).format(value);
}

function renderSimoleonBalance() {
    const output = document.getElementById('simoleonAmount');

    if (!output) {
        return;
    }

    output.value = formatSimoleonBalance(currentSimoleonBalance);
    output.dataset.value = String(currentSimoleonBalance);
}

function showSimoleonFeedback(previousBalance, nextBalance) {
    const wallet = document.querySelector('.simoleon-wallet');

    if (!wallet || previousBalance === nextBalance) {
        return;
    }

    const feedbackClass = nextBalance > previousBalance
        ? 'is-gaining'
        : 'is-losing';

    wallet.classList.remove('is-gaining', 'is-losing');
    void wallet.offsetWidth;
    wallet.classList.add(feedbackClass);

    if (simoleonFeedbackTimer !== null) {
        clearTimeout(simoleonFeedbackTimer);
    }

    simoleonFeedbackTimer = setTimeout(() => {
        wallet.classList.remove(feedbackClass);
        simoleonFeedbackTimer = null;
    }, 450);
}

function setSimoleons(value) {
    const normalizedValue = normalizeSimoleonValue(value);

    if (normalizedValue === null) {
        console.warn('O saldo de Simoleons precisa ser um número válido.');
        return currentSimoleonBalance;
    }

    const previousBalance = currentSimoleonBalance;
    currentSimoleonBalance = Math.min(
        SIMOLEON_MAXIMUM,
        Math.max(SIMOLEON_MINIMUM, normalizedValue)
    );

    renderSimoleonBalance();
    showSimoleonFeedback(previousBalance, currentSimoleonBalance);

    if (previousBalance !== currentSimoleonBalance) {
        document.dispatchEvent(new CustomEvent('simoleonschange', {
            detail: {
                previousBalance,
                balance: currentSimoleonBalance,
                difference: currentSimoleonBalance - previousBalance
            }
        }));
    }

    return currentSimoleonBalance;
}

function addSimoleons(amount) {
    const normalizedAmount = normalizeSimoleonValue(amount);

    if (normalizedAmount === null) {
        console.warn('O valor a adicionar precisa ser um número válido.');
        return currentSimoleonBalance;
    }

    return setSimoleons(currentSimoleonBalance + normalizedAmount);
}

function removeSimoleons(amount) {
    const normalizedAmount = normalizeSimoleonValue(amount);

    if (normalizedAmount === null) {
        console.warn('O valor a remover precisa ser um número válido.');
        return currentSimoleonBalance;
    }

    return setSimoleons(currentSimoleonBalance - Math.abs(normalizedAmount));
}

function initializeSimoleons() {
    renderSimoleonBalance();
}

document.addEventListener('languagechange', renderSimoleonBalance);

window.simoleons = Object.freeze({
    get balance() {
        return currentSimoleonBalance;
    },
    maximum: SIMOLEON_MAXIMUM,
    set: setSimoleons,
    add: addSimoleons,
    remove: removeSimoleons
});
