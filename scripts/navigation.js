let navigationController = null;

function initializeNavigation() {
    if (navigationController) {
        navigationController.abort();
    }

    navigationController = new AbortController();
    const listenerOptions = { signal: navigationController.signal };

    function addClickListener(selector, callback) {
        const element = document.querySelector(selector);

        if (!element) {
            console.warn(`O elemento "${selector}" não foi encontrado.`);
            return;
        }

        element.addEventListener('click', callback, listenerOptions);
    }

    function scrollToElement(selector, offset) {
        const targetElement = document.querySelector(selector);

        if (!targetElement) {
            console.warn(`O destino "${selector}" não foi encontrado.`);
            return;
        }

        const top = window.scrollY
            + targetElement.getBoundingClientRect().top
            - offset;

        window.scrollTo({ top, behavior: 'smooth' });
    }

    addClickListener('.btn1', () => scrollToElement('.modWhats', 150));
    addClickListener('.btn5', () => scrollToElement('.modWhats', 150));
    addClickListener('.btn2', () => scrollToElement('.modWright', 50));
    addClickListener('.btn3', () => {exibirAlerta(); scrollToElement('.modMaslow', 150)});
}
