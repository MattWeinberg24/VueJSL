<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <VocabIO :words="words"/>
  <VocabOptions/>
</template>

<script>
//import { loadScript } from "vue-plugin-load-script";
import wordJSON from './assets/words.json';
import VocabIO from './components/VocabIO.vue';
import VocabOptions from './components/VocabOptions.vue';

export default {
  name: 'App',
  data() {
    return {
      wordData: wordJSON,
      kuroshiro: null
    }
  },
  computed: {
    words(){
      var w = this.wordData;
      return [].concat(w.nominals,w.verbals,w.na_nominals,w.adjectivals,w.suru_verbals, w.modifiers,w.greetings);
    }
  },
  methods: {
  /**
   * Loads external js libraries using vue-plugin-load-script
   * @returns {Promise} Script loading processes
   */
    loadExternalScripts() {
      var promiseArray = [];
      promiseArray.push(this.$loadScript('https://unpkg.com/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js'));
      promiseArray.push(this.$loadScript('https://unpkg.com/kuroshiro@1.1.2/dist/kuroshiro.min.js'));
      return Promise.all(promiseArray);
    },
  /**
   * Sets up the Kuroshiro library with the dictionary files. Used for kanji-kana translation
   * @returns {Promise} Kuroshiro initialization process
   */
    initializeKuroshiro(){
      let analyzer = new KuromojiAnalyzer({ dictPath: "dict/" });
      this.kuroshiro = new Kuroshiro();
      return this.kuroshiro.init(analyzer);
    },
  /**
   * Generates kana and romaji translations for each word in the database
   * @returns {Promise} The translation processes for every word
   */
    generateTranslations(){
      var promiseArray = [];
      this.words.forEach(word => {
          if (word.hasOwnProperty("kana")){ //if kana is overridden in words.json
              word.romazi = [];
              word.kana.forEach(k => {
                  word.romazi.push(this.nipponToJSL(Kuroshiro.Util.kanaToRomaji(k,"nippon")));
              });
          }
          else { //if kana needs to be generated
              word.kana = [];
              word.romazi = [];
              word.japanese.forEach((j,i) => {
                  promiseArray.push(this.kuroshiro.convert(j, {to: "hiragana"}).then(k => {
                      word.romazi.push(this.nipponToJSL(Kuroshiro.Util.kanaToRomaji(k,"nippon")));
                      word.kana.push(k);
                  }));
              })
          }
      });
      
      return Promise.all(promiseArray);
    },

   /**
    * Converts Nippon romazi to JSL romazi
    * @param {string} nippon Nippon romazi to convert
    * @returns {string} The resulting JSL romazi
    */
    nipponToJSL(nippon) {
        return nippon.replace("î","ii").replace("ô","oo").replace("ê","ee").replace("â","aa").replace("ou","oo").replace("ei","ee"); 
    }
  },
  components: {
    VocabIO,
    VocabOptions
  },
  mounted() {
    document.title = "JSLBot";
    this.loadExternalScripts().then(this.initializeKuroshiro).then(this.generateTranslations);
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
