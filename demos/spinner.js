var byId = require('by/id');
var raf = require('raf');
var newElement = require('new-element');
var style = require('dom-style');
var append = require('insert/append');

var container = byId('container');

var box = newElement('<div class="box">{text}</div>', {
    text: 'spinny'
})

var counter = 0;
raf(function loop() {
    counter++;
    render(box);
    raf(loop);
});

function render(box) {
    style(box, 'top', 50 + Math.sin(counter / 10) * 10 + 'px')
    style(box, 'left', 50 + Math.cos(counter / 10) * 10 + 'px')
    style(box, 'background-color', 'rgb(0,0,' + counter % 255 + ')')
}

append(container, box);
