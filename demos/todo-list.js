var document = require('global/document');
var window = require('global/window');
var h = require('virtual-hyperscript');
var cuid = require('cuid');
var SingleEvent = require('geval/single');
var Observ = require('observ');
var ObservArray = require('observ-array');
var ObservHash = require('observ-hash');
var mainloop = require('main-loop');
var Delegator = require('dom-delegator');
var submitEvent = require('value-event/submit');

var events = {
    add: SingleEvent()
}

var state = ObservHash({
    description: Observ('app state description'),
    events: events,
    items: ObservArray([
        ObservHash({
            text: 'one', value: 'first', color: 'red', cid: '1'
        }),
        ObservHash({
            text: 'two', value: 'second', color: 'blue', cid: '2'
        })
    ])
})


events.add(function (data) {
    state.items.push(ObservHash({
        text: data.text,
        value: data.value,
        color: data.color,
        cid: cuid()
    }))
})

window.state = state;

Delegator();
var loop = mainloop(state(), render);
state(loop.update);
document.body.appendChild(loop.target);

function render(state) {
    return h('div', [
        h('h2', state.description),
        h('ul', state.items.map(function (item) {
            return h('li', {
                key: item.cid,
                style: { color: item.color }
            }, [
                h('span', item.text),
                h('input', { value: item.value })
            ])
        })),
        h('div', {
            'data-event': submitEvent(state.events.add)
        }, [
            h('input', {
                name: 'text',
                placeholder: 'text'
            }),
            h('input', {
                name: 'value',
                placeholder: 'value'
            }),
            h('input', {
                name: 'color',
                placeholder: 'color'
            }),
            h('button', 'add')
        ])
    ])
}
