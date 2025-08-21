window.addEventListener('DOMContentLoaded', () => {

    const moods = [
        {
            name: 'Fome',
            barId: 'progressFome',
            buttonClass: 'btnHunger',
            decreaseInterval: 1000,
            decreaseAmount: 5,
            increaseAmount: 10,
            coolDown: 10000
        },
        {
            name: 'Energia',
            barId: 'progressEnergia',
            buttonClass: 'btnEnergy',
            decreaseInterval: 900,
            decreaseAmount: 2,
            increaseAmount: 20,
            coolDown: 15000
        },
        {
            name: 'Banheiro',
            barId: 'progressBanheiro',
            buttonClass: 'btnBladder',
            decreaseInterval: 600,
            decreaseAmount: 7,
            increaseAmount: 30,
            coolDown: 10000
        },
        {
            name: 'Higiene',
            barId: 'progressHigiene',
            buttonClass: 'btnHygiene',
            decreaseInterval: 600,
            decreaseAmount: 5,
            increaseAmount: 10,
            coolDown: 10000
        },
        {
            name: 'Diversão',
            barId: 'progressDiversao',
            buttonClass: 'btnFun',
            decreaseInterval: 400,
            decreaseAmount: 7,
            increaseAmount: 5,
            coolDown: 10000
        }
    ];

    const container = document.body;

    moods.forEach(mood => {

        //create bar
        const barContainer = document.createElement('div');
        barContainer.classList.add('bar-container');

        const bar = document.createElement('div');
        bar.classList.add('progress-bar');
        bar.id = mood.barId;
        barContainer.appendChild(bar);
        
        //create button
        const button = document.createElement('button');
        button.classList.add(mood.buttonClass);
        button.textContent = `Usar ${mood.name}`;

        //adiciona ao DOM
        container.appendChild(barContainer);
        container.appendChild(button);

        //ativa a lógica
        setupMood(mood);

    });
});