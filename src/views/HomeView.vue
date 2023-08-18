<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    
    <h1>Hola Mundo</h1>
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-success" @click="goToDayBook()">Success</button>
    
  </div>
</template>


<script>
// @ is an alias to /src

export default {
  methods: {
    goToDayBook() {
      this.$router.push({name: 'daybook-no-entry'})
    }
  },
}
</script>
