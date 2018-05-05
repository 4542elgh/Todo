<template>
  <div id="app">
    <TodoParentTemplate/>
  </div>
</template>

<script>
import TodoParentTemplate from './components/TodoParentTemplate'

export default {
  name: 'App',
  components: {
    TodoParentTemplate
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
