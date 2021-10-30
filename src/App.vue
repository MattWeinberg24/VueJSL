<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <VocabIO :words="words"/>
  <VocabOptions/>
</template>

<script>
import wordJSON from './data/words.json'
import VocabIO from './components/VocabIO.vue'
import VocabOptions from './components/VocabOptions.vue'

export default {
  name: 'App',
  data() {
    return {
      words: wordJSON
    }
  },
  mounted() {
    document.title = "JSLBot";
  },
  components: {
    VocabIO,
    VocabOptions
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
