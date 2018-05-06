<template>
  <div>
    <div class="custom-control custom-checkbox mr-sm-2">
      <input type="checkbox" class="custom-control-input" id="customControlAutosizing" v-model="completed">
      <label class="custom-control-label" for="customControlAutosizing" v-text="todo"></label>
    </div>
    <!--<p v-text="todo"></p>-->
    <button type="button" class="btn btn-primary">Edit</button>
    <button type="button" class="btn btn-danger">Delete Todo</button>

  </div>
</template>

<script>

  export default {
    name: "TodoTemplate",
    data() {
      return {
        newTodo: '',
        completed: ''
      }
    },
    props: ['projectName','todo'],
    methods: {
      deleteTodo(){
        this.$socket.emit('')
      }
    },
    computed: {
      result() {
        console.log(this.completed)
      }
    }
  }
</script>

<style scoped>

</style>
