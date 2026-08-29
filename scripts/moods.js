let moodControllers = [];

const MOOD_REFERENCE_VALUES = Object.freeze({
    decreaseInterval: 1000,
    decreaseAmount: 2,
    increaseAmount: 10,
    coolDown: 10000
});

const PLUMBOB_RULES = Object.freeze({
    lowMoodThreshold: 40,
    yellowMoodCount: 3,
    redMoodCount: 5
});

const PLUMBOB_STATES = Object.freeze({
    green: {
        src: 'assets/images/plumbobs/plumbob_green.webp',
        translationKey: 'plumbob.green'
    },
    yellow: {
        src: 'assets/images/plumbobs/plumbob_yellow.webp',
        translationKey: 'plumbob.yellow'
    },
    red: {
        src: 'assets/images/plumbobs/plumbob_red.webp',
        translationKey: 'plumbob.red'
    }
});

function calculateMoodSettings({
    intervalMultiplier = 1,
    decreaseMultiplier = 1,
    increaseMultiplier = 1,
    coolDownMultiplier = 1
}) {
    return {
        decreaseInterval:
            MOOD_REFERENCE_VALUES.decreaseInterval * intervalMultiplier,
        decreaseAmount:
            MOOD_REFERENCE_VALUES.decreaseAmount * decreaseMultiplier,
        increaseAmount:
            MOOD_REFERENCE_VALUES.increaseAmount * increaseMultiplier,
        coolDown:
            MOOD_REFERENCE_VALUES.coolDown * coolDownMultiplier
    };
}

function calculatePlumbobState(moodValues) {
    const lowMoodCount = [...moodValues.values()]
        .filter(value => value < PLUMBOB_RULES.lowMoodThreshold)
        .length;

    if (lowMoodCount >= PLUMBOB_RULES.redMoodCount) {
        return 'red';
    }

    if (lowMoodCount >= PLUMBOB_RULES.yellowMoodCount) {
        return 'yellow';
    }

    return 'green';
}

function updatePlumbob(plumbob, moodValues) {
    if (!plumbob) {
        return;
    }

    const nextState = calculatePlumbobState(moodValues);

    if (plumbob.dataset.state === nextState) {
        return;
    }

    const state = PLUMBOB_STATES[nextState];
    plumbob.src = state.src;
    plumbob.dataset.i18nAlt = state.translationKey;
    plumbob.alt = translate(state.translationKey);
    plumbob.dataset.state = nextState;
}

function initializeMoods() {
    const moodDefinitions = [
        {
            icon: 'hunger.png',
            nameKey: 'moods.hunger',
            actionKey: 'moods.useHunger',
            barId: 'progressFome',
            buttonClass: 'btnHunger',
            modifiers: {
                intervalMultiplier: 7.5,
                decreaseMultiplier: 5,
                increaseMultiplier: 10,
                coolDownMultiplier: 5
            }
        },
        {
            icon: 'toilet.png',
            nameKey: 'moods.bladder',
            actionKey: 'moods.useBladder',
            barId: 'progressBanheiro',
            buttonClass: 'btnBladder',
            modifiers: {
                intervalMultiplier: 2.5,
                decreaseMultiplier: 1.5,
                increaseMultiplier: 3,
                coolDownMultiplier: 1
            }
        },
        {
            icon: 'fun.png',
            nameKey: 'moods.fun',
            actionKey: 'moods.useFun',
            barId: 'progressDiversao',
            buttonClass: 'btnFun',
            onActivate() {
                muteFunSoundsTemporarily(3000);
            },
            onValueChange(value, previousValue) {
                checkFunSoundThreshold(previousValue, value);
            },
            modifiers: {
                intervalMultiplier: 4.5,
                decreaseMultiplier: 3,
                increaseMultiplier: 0.5,
                coolDownMultiplier: 1
            }
        },
        {
            icon: 'sleep.png',
            nameKey: 'moods.energy',
            actionKey: 'moods.useEnergy',
            barId: 'progressEnergia',
            buttonClass: 'btnEnergy',
            modifiers: {
                intervalMultiplier: 10.0,
                decreaseMultiplier: 5,
                increaseMultiplier: 2,
                coolDownMultiplier: 1.5
            }
        },
        {
            icon: 'shower.png',
            nameKey: 'moods.hygiene',
            actionKey: 'moods.useHygiene',
            barId: 'progressHigiene',
            buttonClass: 'btnHygiene',
            modifiers: {
                intervalMultiplier: 8.0,
                decreaseMultiplier: 5,
                increaseMultiplier: 1,
                coolDownMultiplier: 1
            }
        },
        {
            icon: 'social.png',
            nameKey: 'moods.social',
            actionKey: 'moods.useSocial',
            barId: 'progressSocial',
            buttonClass: 'btnSocial',
            modifiers: {
                intervalMultiplier: 5,
                decreaseMultiplier: 4.5,
                increaseMultiplier: 0.5,
                coolDownMultiplier: 1
            }
        }
    ];

    const moods = moodDefinitions.map(({ modifiers, ...mood }) => ({
        ...mood,
        ...calculateMoodSettings(modifiers)
    }));

    const container = document.getElementById('moodContainer');
    const plumbob = document.getElementById('plumbobStatus');

    if (!container) {
        console.warn('O elemento #moodContainer não foi encontrado.');
        return;
    }

    if (!plumbob) {
        console.warn('O elemento #plumbobStatus não foi encontrado.');
    }

    moodControllers.forEach(controller => controller.destroy());
    moodControllers = [];
    container.replaceChildren();

    const moodValues = new Map(
        moods.map(mood => [mood.barId, 100])
    );

    updatePlumbob(plumbob, moodValues);

    const grid = document.createElement('div');
    grid.classList.add('mood-grid');

    moods.forEach(mood => {
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const bar = document.createElement('div');
        bar.classList.add('progress-bar');
        bar.id = mood.barId;
        bar.setAttribute('role', 'progressbar');
        bar.dataset.i18nAriaLabel = mood.nameKey;
        bar.setAttribute('aria-label', translate(mood.nameKey));
        bar.setAttribute('aria-valuemin', '0');
        bar.setAttribute('aria-valuemax', '100');
        barContainer.appendChild(bar);

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add(mood.buttonClass, 'mood-button');
        button.dataset.i18nTitle = mood.actionKey;
        button.dataset.i18nAriaLabel = mood.actionKey;
        button.title = translate(mood.actionKey);
        button.setAttribute('aria-label', translate(mood.actionKey));

        const icon = document.createElement('img');
        icon.classList.add('mood-icon');
        icon.src = `assets/images/moods/png/${mood.icon}`;
        icon.alt = '';

        const originalSrc = icon.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png');

        button.addEventListener('mouseenter', () => {
            icon.src = hoverSrc;
        });

        button.addEventListener('mouseleave', () => {
            icon.src = originalSrc;
        });

        button.appendChild(icon);

        const moodRow = document.createElement('div');
        moodRow.classList.add('mood-row');
        moodRow.appendChild(button);
        moodRow.appendChild(barContainer);
        grid.appendChild(moodRow);
    });

    container.appendChild(grid);

    moods.forEach(mood => {
        const controller = setupMood({
            ...mood,
            onValueChange(value, previousValue) {
                moodValues.set(mood.barId, value);
                updatePlumbob(plumbob, moodValues);
                mood.onValueChange?.(value, previousValue);
            }
        });

        if (controller) {
            moodControllers.push(controller);
        }
    });
}
