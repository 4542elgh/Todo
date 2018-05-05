const header = {
    template: 
    `
        <header class="mdl-layout__header">
            <div class="mdl-grid">
                <div class="mdl-cell--middle  mdl-layout-title">To-Do Projects</div>
            </div>
        </header>
    `
}

const card = {
    template: 
    `
        <div class="wide-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">To-Do Project {{index}}</h2>
            </div>

            <div class="mdl-card__supporting-text">
                <ul v-for="i in 4">
                    <li>To-Do Project Three List Item {{i}}</li>
                </ul>
            </div>

            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open To-Do Project {{ index }}</a>
            </div>
            
            <div class="mdl-card__menu">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">share</i>
                </button>
            </div>
        </div>
    `,
    props:['index']
}

export { header, card }