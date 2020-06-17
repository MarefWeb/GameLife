'use strict'
window.addEventListener('DOMContentLoaded', function () {
    const $ = input => { return document.querySelector(input); };
    const $$ = input => { return document.querySelectorAll(input); };

    const canvas = $('canvas');
    const context = canvas.getContext('2d');

    const fieldColor = 'grey';
    const organismColor = 'yellow';
    const columnsNumber = 80;
    const rowsNumber = 80;
    const cellSize = 5;
    const generationLifeTime = 100;


    const lifeGame = new LifeGame(rowsNumber, columnsNumber);

    start();

    function start() {
        canvas.height = columnsNumber * cellSize;
        canvas.width = rowsNumber * cellSize;

        lifeGame.reviveRandomOrganisms(columnsNumber * rowsNumber/2);
        
        requestAnimationFrame(tick);
    }

    function tick(timestamp) {
        clear();

        if(timestamp > lifeGame.generationNumber * generationLifeTime) {
            lifeGame.changeGeneration()
        }

        lifeGame.forFreeEach((x, y) => drawOrganism(x, y, organismColor));
        
        requestAnimationFrame(tick);
    }

    function clear() {
        context.fillStyle = fieldColor;
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    function drawOrganism(x, y, color) {
        context.fillStyle = color;
        context.beginPath();
        context.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        context.fill();
    }
});