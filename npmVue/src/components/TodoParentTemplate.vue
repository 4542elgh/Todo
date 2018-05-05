<template>
  <div>

    <!--<ul v-for="item in todoJSON">-->
      <!--<li v-text="item"></li>-->
    <!--</ul>-->

    <p v-text="todoJSON.name"></p>

    <div class="input-group mb-3">
      <input class="form-control" v-model="newTodo">
      <div class="input-group-append">
        <button type="button" class="btn btn-primary" v-on:click="addTodo(newTodo)">Add Todo</button>
        <button type="button" class="btn btn-warning">Archive</button>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-show="warning">
      This is a duplicate entry
    </div>

    <div v-for="todo in todoJSON.todos">
      <TodoTemplate :todo="todo"></TodoTemplate>
    </div>

  </div>
</template>

<script>
  import TodoTemplate from './TodoTemplate'

  export default {
    name: "TodoParentTemplate",
    components: {TodoTemplate},
    data() {
      return {
        newTodo: '',
        todoJSON: [],
        warning: false,
        project: this.projectName
      }
    },
    props: ['projectName'],
    methods: {
      addTodo(newTodo) { //grabbing input box content, and avoid duplicate entry (space and case insensitive)
        if (this.todoJSON.length == 0) {
          // this.todoJSON.push(newTodo)
          socket.emit('add-todo', ('cs3801', newTodo))
          this.newTodo = ""
        }
        else {
          if (this.todoJSON.find(item => {
            return item.toLowerCase().replace(/\s/g, '') == newTodo.toLowerCase().replace(/\s/g, '') //ignore white space and case
          })) {
            this.warning = true;
          }
          else {
            // this.todoJSON.push(newTodo)
            socket.emit('add-todo', (this.project, newTodo))

            this.newTodo = "" //this will reset the input stickiness
            this.warning = false;
          }
        }
      }
    },
    comments: {
      TodoTemplate
    },
    mounted() {
      this.$socket.on('refresh-projects', projects => {
        this.todoJSON = projects[0]
      })
    }
  }
</script>

<style scoped>

</style>
