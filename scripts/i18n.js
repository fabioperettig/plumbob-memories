const SUPPORTED_LANGUAGES = Object.freeze(['pt-BR', 'en']);
const DEFAULT_LANGUAGE = 'pt-BR';
const LANGUAGE_STORAGE_KEY = 'the-sims-1-language';

let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};
let languageMenuController = null;

function parseTranslations(source) {
    return source.split(/\r?\n/).reduce((messages, line, index) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            return messages;
        }

        const separatorIndex = line.indexOf('=');

        if (separatorIndex === -1) {
            console.warn(`Linha ${index + 1} do arquivo de idioma foi ignorada.`);
            return messages;
        }

        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();

        if (key) {
            messages[key] = value.replaceAll('\\n', '\n');
        }

        return messages;
    }, {});
}

function normalizeLanguage(language) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
        return language;
    }

    return language?.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LANGUAGE;
}

function getPreferredLanguage() {
    try {
        return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    } catch (error) {
        console.warn('Não foi possível ler a preferência de idioma.', error);
        return DEFAULT_LANGUAGE;
    }
}

function translate(key) {
    if (!(key in translations)) {
        console.warn(`Tradução não encontrada: "${key}".`);
        return key;
    }

    return translations[key];
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = translate(element.dataset.i18n);
    });

    const translatedAttributes = {
        'data-i18n-alt': 'alt',
        'data-i18n-title': 'title',
        'data-i18n-aria-label': 'aria-label'
    };

    Object.entries(translatedAttributes).forEach(([dataAttribute, attribute]) => {
        document.querySelectorAll(`[${dataAttribute}]`).forEach(element => {
            element.setAttribute(attribute, translate(element.getAttribute(dataAttribute)));
        });
    });

    updateLanguageControls();
    document.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language: currentLanguage }
    }));
}

async function setLanguage(language, { persist = true } = {}) {
    const nextLanguage = normalizeLanguage(language);
    const response = await fetch(`locales/${nextLanguage}.txt`);

    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status} ao carregar ${nextLanguage}.`);
    }

    const nextTranslations = parseTranslations(await response.text());

    if (Object.keys(nextTranslations).length === 0) {
        throw new Error(`O arquivo de idioma ${nextLanguage} está vazio.`);
    }

    currentLanguage = nextLanguage;
    translations = nextTranslations;

    if (persist) {
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
        } catch (error) {
            console.warn('Não foi possível salvar a preferência de idioma.', error);
        }
    }

    applyTranslations();
}

async function initializeI18n() {
    await setLanguage(getPreferredLanguage(), { persist: false });
}

function updateLanguageControls() {
    const currentLanguageLabel = document.getElementById('currentLanguage');

    if (currentLanguageLabel) {
        currentLanguageLabel.textContent = currentLanguage === 'pt-BR' ? 'PT' : 'EN';
    }

    document.querySelectorAll('[data-language]').forEach(button => {
        const isCurrent = button.dataset.language === currentLanguage;
        button.classList.toggle('is-active', isCurrent);
        button.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
}

function initializeLanguageMenu() {
    if (languageMenuController) {
        languageMenuController.abort();
    }

    const toggle = document.getElementById('languageToggle');
    const menu = document.getElementById('languageMenu');

    if (!toggle || !menu) {
        return;
    }

    languageMenuController = new AbortController();
    const listenerOptions = { signal: languageMenuController.signal };

    function setMenuOpen(isOpen) {
        menu.hidden = !isOpen;
        toggle.setAttribute('aria-expanded', String(isOpen));
    }

    toggle.addEventListener('click', event => {
        event.stopPropagation();
        setMenuOpen(menu.hidden);
    }, listenerOptions);

    menu.addEventListener('click', async event => {
        const languageButton = event.target.closest('[data-language]');

        if (!languageButton) {
            return;
        }

        toggle.disabled = true;

        try {
            await setLanguage(languageButton.dataset.language);
            setMenuOpen(false);
            toggle.focus();
        } catch (error) {
            console.error('Não foi possível trocar o idioma:', error);
        } finally {
            toggle.disabled = false;
        }
    }, listenerOptions);

    document.addEventListener('click', event => {
        if (!event.target.closest('.language-picker')) {
            setMenuOpen(false);
        }
    }, listenerOptions);

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !menu.hidden) {
            setMenuOpen(false);
            toggle.focus();
        }
    }, listenerOptions);
}
