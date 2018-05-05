<template>
  <div>
    <Header />
    <div class="container">
        <div class="row">
            <div class="col-sm rowPadding3" v-for="item in [1,2,3,4]">
                <card :index="item"></card>
            </div>
        </div>
    </div>
  </div>

</template>
<script>
  import Card from './components/Card.vue';
  import Header from './components/Header.vue';

  export default {
    name: 'App',
    data () {
      return{
      }
    },
    components: {
      Card,
      Header
    }
  }
</script>
