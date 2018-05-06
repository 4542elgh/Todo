<template>
  <div>

    <!--<ul v-for="item in todoJSON">-->
      <!--<li v-text="item"></li>-->
    <!--</ul>-->

    <p v-text="todoJSON.name"></p>

    <div class="input-group mb-3">
      <input class="form-control" v-model="todoInputField">
      <div class="input-group-append">
        <button type="button" class="btn btn-primary" v-on:click="addTodo(todoInputField)">Add Todo</button>
        <button type="button" class="btn btn-warning">Archive</button>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-show="warning">
      This is a duplicate entry
    </div>

    <div v-for="todo in todoJSON.todos">
      <TodoTemplate :todo="todo" :projectName="todoJSON.name"></TodoTemplate>
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
        todoInputField: '',
        todoJSON: [],
        warning: false,
        // project: this.projectName    ===> this is the proper way
      }
    },
    props: ['projectName'],
    methods: {
      addTodo(todoInputField) { //grabbing input box content, and avoid duplicate entry (space and case insensitive)
        if (this.todoJSON.length == 0) {
          // this.todoJSON.push(todoInputField)
          this.$socket.emit('add-todo', (this.todoJSON.name, todoInputField))
          this.todoInputField = ""
        }
        else {
          let isDup=false;

          this.todoJSON.todos.forEach(item=>{
            if (item.name.toLowerCase().replace(/\s/g, '') == todoInputField.toLowerCase().replace(/\s/g, '')){
              isDup=true
            }
          })

          if (isDup){
            this.warning = true;
          }
          else {
            // this.todoJSON.push(todoInputField)
            this.$socket.emit('add-todo', this.todoJSON.name, todoInputField)

            this.todoInputField = "" //this will reset the input stickiness
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

      this.$socket.on('added-todo',result=>{
        console.log(result)
      })
    }
  }
</script>

<style scoped>

</style>
