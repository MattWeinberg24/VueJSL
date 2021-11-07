<template>
<h1 v-show="!renderApp">Loading...</h1>
<div id="yeah" v-show="renderApp" :key="renderApp">
  <VocabIO :words="unusedWords"/>
  <VocabOptions v-on:resetApp="resetApp()"/>
  <VocabTable :words="unusedWords"/>
</div>
</template>

<script>
//import { loadScript } from "vue-plugin-load-script";
import wordJSON from './assets/words.json';
import VocabIO from './components/VocabIO.vue';
import VocabOptions from './components/VocabOptions.vue';
import VocabTable from './components/VocabTable.vue';

export default {
  name: 'App',
  data() {
    return {
      renderApp: false,
      unusedWords: [], 
      kuroshiro: null, //kuroshiro object that is initialized on page load
      lessonStart: "1A",
      lessonEnd: "15A"
    }
  },
  methods: {
  /**
   * Loads external js libraries using vue-plugin-load-script
   * TODO: HANDLE BLOCKED SCRIPTS 
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
      this.unusedWords.forEach(word => {
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
    * @param {string} a The first lesson string 
    * @param {string} b The second lesson string
    * @returns {boolean} True if a is higher than b, false otherwise
    */
    compareLesson(a,b){
      var aSplit = a.split(/(\d+)/); //splits between letters and numbers
      var bSplit = b.split(/(\d+)/);
      if (aSplit[1] == bSplit[1]){ //if both rows have the same number lesson, sort by letter
          return aSplit[2] > bSplit[2];
      }
      else { //otherwise sort by number
          return Number(aSplit[1]) > Number(bSplit[1]);
      }
    },

   /**
    * Converts Nippon romazi to JSL romazi
    * @param {string} nippon Nippon romazi to convert
    * @returns {string} The resulting JSL romazi
    */
    nipponToJSL(nippon) {
        return nippon.replace("î","ii").replace("ô","oo").replace("ê","ee").replace("â","aa").replace("ou","oo").replace("ei","ee"); 
    },

    resetApp(){
      let w = wordJSON;
      [].concat(w.nominals,w.verbals,w.na_nominals,
        w.adjectivals,w.suru_verbals, w.modifiers,w.greetings).forEach((word,i) => {
        if (!this.compareLesson(this.lessonStart, word.lesson) && !(this.compareLesson(word.lesson, this.lessonEnd))){ //if start <= lesson <= end
          this.unusedWords.push(word);
        }
      });
    }
  },
  components: {
    VocabIO,
    VocabOptions,
    VocabTable
  },
  mounted() {
    document.title = "JSLBot";
    this.resetApp();
    let t1 = new Date(); //time of Kuroshiro initialization start
    this.loadExternalScripts().then(this.initializeKuroshiro).then(this.generateTranslations).then(() => {
      console.log("Kuroshiro Initialized in " + (((new Date()) - t1) / 1000) + " seconds"); //log initializaiton time
      this.renderApp = true;
    });
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
