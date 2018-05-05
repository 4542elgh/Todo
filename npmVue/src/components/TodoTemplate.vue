<template>
  <div>

    <br>
    <p v-text="todo"></p>
    <button type="button" class="btn btn-danger">Delete Todo</button>

  </div>
</template>

<script>

    export default {
        name: "TodoTemplate",
      data(){
      return{
        newTodo:''
      }
    },props:['todo'],
      methods:{

      }
    }
</script>

<style scoped>

</style>
