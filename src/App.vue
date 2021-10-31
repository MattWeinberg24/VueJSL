<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <VocabIO :words="words"/>
  <VocabOptions/>
</template>

<script>
//import { loadScript } from "vue-plugin-load-script";
import wordJSON from './data/words.json';
import VocabIO from './components/VocabIO.vue';
import VocabOptions from './components/VocabOptions.vue';

export default {
  name: 'App',
  data() {
    return {
      words: wordJSON,
      kuroshiro: null
    }
  },
  mounted() {
    document.title = "JSLBot";

    //set up external libraries
      this.$loadScript('https://unpkg.com/kuroshiro@1.1.2/dist/kuroshiro.min.js').then(() => {
        console.log("hello");
        console.log(Kuroshiro.Util.isHiragana("a"));
        console.log("what/?");
      });
    

    
  },
  methods: {
  
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
