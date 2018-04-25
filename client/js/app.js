import headerTemplate from './header.js';
import cardTemplate from './card.js';

new Vue({
    el: '#app',
    components: {
        'card': cardTemplate,
        'headercomp' : headerTemplate
    }
})