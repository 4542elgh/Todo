const projectComponent = {
    template: 
    `
        <div class="mdl-grid justify-content: center">
        <div class="mdl-layout-spacer"></div>
        <div class="wide-card mdl-card mdl-shadow--8dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">{{ projectname }}</h2>
            </div>

            <div class="mdl-card__supporting-text">
                <ul v-for="todo in todos">
                    <li>{{ todo.description }}</li>
                </ul>
            </div>

            <div class="mdl-card__actions mdl-card--border">
                <a v-on:click="$emit('open-project')" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open {{ projectname }}</a>
            </div>

            <div class="mdl-card__menu">
                <button v-on:click="$emit('delete-project')" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
        <div class="mdl-layout-spacer"></div>
        </div>
    `,

    props: ['projectname', 'uniqueid', 'todos']
}

export { projectComponent }
