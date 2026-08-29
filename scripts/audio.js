const launcherSong = document.getElementById('launcherSong');
const FUN_SOUND_THRESHOLDS = Object.freeze([75, 50, 25]);
const FUN_SOUND_EFFECT_PATHS = Object.freeze([
    'assets/audio/soundfx/VOX_SING_HAPPYF2.wav',
    'assets/audio/soundfx/VOX_SING_HAPPYF4.wav',
    'assets/audio/soundfx/VOX_SING_HAPPYM1.wav',
    'assets/audio/soundfx/VOX_SING_HAPPYM2.wav',
    'assets/audio/soundfx/VOX_SING_HAPPYNPCF1.wav',
    'assets/audio/soundfx/VOX_SING_HAPPYNPCF3.wav',
    'assets/audio/soundfx/Vox_sing_happyM14.wav',
    'assets/audio/soundfx/Vox_sing_happyM19.wav',
    'assets/audio/soundfx/Vox_sing_happyM3.wav',
    'assets/audio/soundfx/Vox_sing_happyM32.wav',
    'assets/audio/soundfx/Vox_sing_happyM4.wav',
    'assets/audio/soundfx/Vox_sing_happyM45.wav'
]);

const funSoundEffects = FUN_SOUND_EFFECT_PATHS.map(source => {
    const audio = new Audio(source);
    audio.preload = 'auto';
    audio.volume = 0.25;
    return audio;
});

let launcherSongUnlockController = null;
let isAudioUnlocked = false;
let currentFunSound = null;
let lastFunSoundIndex = -1;
let funSoundsMutedUntil = 0;

function removeLauncherSongUnlockListeners() {
    if (launcherSongUnlockController) {
        launcherSongUnlockController.abort();
        launcherSongUnlockController = null;
    }
}

async function playLauncherSong() {
    if (!launcherSong) {
        return;
    }

    if (!launcherSong.paused) {
        isAudioUnlocked = true;
        removeLauncherSongUnlockListeners();
        return;
    }

    try {
        await launcherSong.play();
        isAudioUnlocked = true;
        removeLauncherSongUnlockListeners();
    } catch (error) {
        if (error.name !== 'NotAllowedError') {
            console.warn('Não foi possível reproduzir a música de abertura.', error);
        }
    }
}

function waitForLauncherSongUnlock() {
    removeLauncherSongUnlockListeners();
    launcherSongUnlockController = new AbortController();

    const listenerOptions = {
        once: true,
        signal: launcherSongUnlockController.signal
    };

    document.addEventListener('pointerdown', playLauncherSong, listenerOptions);
    document.addEventListener('keydown', playLauncherSong, listenerOptions);
}

async function initializeLauncherSong() {
    if (!launcherSong) {
        console.warn('O elemento #launcherSong não foi encontrado.');
        return;
    }

    launcherSong.volume = 0.35;

    try {
        await launcherSong.play();
        isAudioUnlocked = true;
    } catch (error) {
        if (error.name === 'NotAllowedError') {
            waitForLauncherSongUnlock();
            return;
        }

        console.warn('Não foi possível reproduzir a música de abertura.', error);
    }
}

function stopCurrentFunSound() {
    if (!currentFunSound) {
        return;
    }

    currentFunSound.pause();
    currentFunSound.currentTime = 0;
    currentFunSound = null;
}

function muteFunSoundsTemporarily(duration = 3000) {
    funSoundsMutedUntil = Date.now() + duration;
    stopCurrentFunSound();
}

function getRandomFunSoundIndex() {
    if (funSoundEffects.length <= 1) {
        return 0;
    }

    let nextIndex = lastFunSoundIndex;

    while (nextIndex === lastFunSoundIndex) {
        nextIndex = Math.floor(Math.random() * funSoundEffects.length);
    }

    return nextIndex;
}

function playRandomFunSound() {
    const canPlay = isAudioUnlocked
        && !document.hidden
        && Date.now() >= funSoundsMutedUntil
        && funSoundEffects.length > 0;

    if (!canPlay) {
        return;
    }

    stopCurrentFunSound();

    const soundIndex = getRandomFunSoundIndex();
    const sound = funSoundEffects[soundIndex];

    lastFunSoundIndex = soundIndex;
    currentFunSound = sound;
    sound.currentTime = 0;

    sound.play().catch(error => {
        if (error.name !== 'NotAllowedError') {
            console.warn('Não foi possível reproduzir o efeito de Diversão.', error);
        }

        if (currentFunSound === sound) {
            currentFunSound = null;
        }
    });
}

function checkFunSoundThreshold(previousValue, currentValue) {
    if (currentValue >= previousValue) {
        return;
    }

    const crossedThreshold = FUN_SOUND_THRESHOLDS.some(threshold =>
        previousValue > threshold && currentValue <= threshold
    );

    if (crossedThreshold) {
        playRandomFunSound();
    }
}

funSoundEffects.forEach(sound => {
    sound.addEventListener('ended', () => {
        if (currentFunSound === sound) {
            currentFunSound = null;
        }
    });
});

initializeLauncherSong();
