console.log('setupAllMoods RODANDO');

function initializeMoods() {

    const moods = [
        {
            icon: 'hunger.png',
            name: 'Fome',
            barId: 'progressFome',
            buttonClass: 'btnHunger',
            decreaseInterval: 1000,
            decreaseAmount: 5,
            increaseAmount: 10,
            coolDown: 10000
        },
        {
            icon: 'sleep.png',
            name: 'Energia',
            barId: 'progressEnergia',
            buttonClass: 'btnEnergy',
            decreaseInterval: 900,
            decreaseAmount: 2,
            increaseAmount: 20,
            coolDown: 15000
        },
        {
            icon: 'toilet.png',
            name: 'Banheiro',
            barId: 'progressBanheiro',
            buttonClass: 'btnBladder',
            decreaseInterval: 600,
            decreaseAmount: 7,
            increaseAmount: 30,
            coolDown: 10000
        },
        {
            icon: 'shower.png',
            name: 'Higiene',
            barId: 'progressHigiene',
            buttonClass: 'btnHygiene',
            decreaseInterval: 600,
            decreaseAmount: 5,
            increaseAmount: 10,
            coolDown: 10000
        },
        {
            icon: 'fun.png',
            name: 'Diversão',
            barId: 'progressDiversao',
            buttonClass: 'btnFun',
            decreaseInterval: 400,
            decreaseAmount: 7,
            increaseAmount: 5,
            coolDown: 10000
        }
    ];

    const container = document.getElementById('moodContainer');
    
    const grid = document.createElement('div');
    grid.classList.add('mood-grid');

    moods.forEach(mood => {

        //create bar
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const bar = document.createElement('div');
        bar.classList.add('progress-bar');
        bar.id = mood.barId;
        barContainer.appendChild(bar);
        
        //create button
        const button = document.createElement('img');
        button.classList.add(mood.buttonClass, 'mood-icon');
        button.src = `./_elements/_moodPNG/${mood.icon}`;
        button.alt = mood.name;
        button.title = `Usar ${mood.name}`;

        //hover
        const originalSrc = button.src;
        const hoverSrc = originalSrc.replace('.png', '-hover.png');

        button.addEventListener('mouseenter', () => {
            button.src = hoverSrc;
        });

        button.addEventListener('mouseleave', () => {
            button.src = originalSrc;
        });

        //adiciona ao DOM
        const moodRow = document.createElement('div');
        moodRow.classList.add('mood-row');
        moodRow.appendChild(button);
        moodRow.appendChild(barContainer);
        container.appendChild(moodRow);
        

        //ativa a lógica
        setupMood(mood);

    });

    container.appendChild(grid);
};