<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
html {
  scroll-behavior: smooth;
}
</style>
