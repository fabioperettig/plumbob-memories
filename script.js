


document.querySelector('.btn1').addEventListener('click', () => {
    var targetElement = document.querySelector('.modWhats');
    var offset = 150;
    var topPos = targetElement.getBoundingClientRect().top - offset;
    window.scrollBy({ top: topPos, behavior: 'smooth' });
})

document.querySelector('.btn5').addEventListener('click', () => {
    var targetElement = document.querySelector('.modWhats');
    var offset = 150;
    var topPos = targetElement.getBoundingClientRect().top - offset;
    window.scrollBy({ top: topPos, behavior: 'smooth' });
})

document.querySelector('.btn2').addEventListener('click', () => {
    var targetElement = document.querySelector('.modWright');
    var offset = 50;
    var topPos = targetElement.getBoundingClientRect().top - offset;
    window.scrollBy({ top: topPos, behavior: 'smooth' });
})