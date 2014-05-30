var document = require('global/document');
var window = require('global/window');
var h = require('virtual-hyperscript');
var cuid = require('cuid');
var SingleEvent = require('geval/single');
var backbone = require('backbone');
var mainloop = require('main-loop');
var Delegator = require('dom-delegator');
var submitEvent = require('value-event/submit');

var events = {
    add: SingleEvent()
}
var toObserv = require('./lib/observ-backbone.js')

var Item = backbone.Model.extend({
    defaults: {
        text: '',
        value: '',
        color: ''
    }
});

var Items = backbone.Collection.extend({
    model: Item
});

var AppState = backbone.Model.extend({
    defaults: {
        description: '',
        events: {},
        items: []
    }
})

var state = new AppState({
    description: 'app state description',
    events: events,
    items: new Items([
        { text: 'one', value: 'first', color: 'red' },
        { text: 'two', value: 'second', color: 'blue' }
    ])
})

events.add(function (data) {
    state.get('items').add(new Item({
        text: data.text,
        value: data.value,
        color: data.color,
        cid: cuid()
    }))
})

Delegator();

var stateObserv = toObserv(state);

var loop = mainloop(stateObserv(), render);
stateObserv(loop.update);
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
