const projectComponent = {
    props: ['projectname', 'uniqueid', 'todos', 'projectindex', 'projects'],
    data: function () {
        return {
             edit: false,
             originalName: this.projectname,
             name: this.projectname
        }
    },
    template: 
    `
        <div class="mdl-grid justify-content: center">
        <div class="mdl-layout-spacer"></div>
        <div class="wide-card mdl-card mdl-shadow--8dp">
        <!-- @keyup.enter="edit = false; $emit('update', name)"  -->
        <div class="mdl-card__title">
                <h2 v-show="edit == false" @dblclick="edit = true" class="mdl-card__title-text">{{ name }}</h2>
                <div v-show="edit == true" class="mdl-textfield mdl-js-textfield">
                    <input v-on:blur="edit = false" 
                    @keyup.enter="edit = false; updateProjectName(projectindex, name)" 
                    v-model="name" class="mdl-textfield__input" type="text" id="sample1">
                </div>
            </div>

            <div class="mdl-card__supporting-text">
                <ul v-for="todo in todos">
                    <li>{{ todo.description }}</li>
                </ul>
            </div>

            <div class="mdl-card__actions mdl-card--border centerTheEVERYTHING">
                <a v-on:click="$emit('open-project')" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open {{ name }}</a>
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
    methods: {
        updateProjectName: function(projectindex, projectname) {
            if(projectname !== '') {
                for(let index = 0; index < this.projects.length; index++) {
                    if(this.projects[index].name === projectname) {
                        this.name = this.originalName
                    }
                } 
            }
            else {
                this.name = this.originalName
            }
            this.$parent.editProjectName(projectindex, projectname)
        }
    },
    computed:{
        todosFill(){
            if(this.todos.length<4){
               const difference = 4-this.todos.length;
               for(let i =0;i<difference;i++){
                   this.todos.push({description:''})
               }
               return this.todos
            }
            else{
                return this.todos.slice(0,4)
            }
        }
    }
}

export { projectComponent }
