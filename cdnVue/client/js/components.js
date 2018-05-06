const projectComponent = {
    template:
    `
<<<<<<< HEAD
        <div class="wide-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">{{ projectname }}</h2>
            </div>

            <div class="mdl-card__supporting-text">
                <ul v-for="i in 4">
                    <li>show active todo</li>
                </ul>
            </div>

            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open {{ projectname }}</a>
            </div>
            
            <div class="mdl-card__menu">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i class="material-icons">delete</i>
                </button>
            </div>
=======
    <div class="mdl-grid">
    <div class="mdl-layout-spacer"></div>
    <div class="wide-card mdl-card mdl-shadow--8dp">
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
>>>>>>> 9c33616eb56d82f455efc45efef81c6636d9935d
        </div>
    </div>
    <div class="mdl-layout-spacer"></div>
    </div>
    `,
<<<<<<< HEAD
    props:['projectname']
=======
    props: ['index']
>>>>>>> 9c33616eb56d82f455efc45efef81c6636d9935d
}

export {
    projectComponent
}