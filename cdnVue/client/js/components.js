const projectComponent = {
    template: `
    <div class="mdl-grid justify-content: center">
    <div class="mdl-layout-spacer"></div>
    <div class="wide-card mdl-card mdl-shadow--8dp">
        <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">{{ projectname }}</h2>
        </div>

        <div class="mdl-card__supporting-text">
            <ul v-for="i in 4">
                <li>show active todo</li>
            </ul>
        </div>

        <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect v-on:click="href="www.google.com""">Open {{ projectname }}</a>
        </div>

        <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>
    <div class="mdl-layout-spacer"></div>
</div>
    `,
    props: ['projectname', 'uniqueid']
    // methods: {
    //     callParent: function (projectName) {
    //         this.$parent.$options.methods.deleteProject(projectName)
    // }
}

export {
    projectComponent
}