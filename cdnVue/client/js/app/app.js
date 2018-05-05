import header from './header.js';
import card from './card.js';

new Vue({
    el: '#app',
    components: {
        'card': card,
        'header' : header
    }
})