import { header, card } from './components.js';

let socket = io()
new Vue({
    el: '#app',
    components: {
        'card': card,
        'parallex-header' : header
    }
})

