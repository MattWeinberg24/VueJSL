<template>
<h1 v-show="!renderApp">Loading...</h1>
<div v-show="renderApp" :key="renderApp">
  <Vocab :unusedWords="unusedWords" :reviewWords="reviewWords" v-on:lessonChange="resetApp($event.start,$event.end)"/>
  <VocabTable :unusedWords="unusedWords" :reviewWords="reviewWords" :masteredWords="masteredWords"/>
</div>
</template>

<script>
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import wordJSON from './assets/words.json';
import Vocab from './components/Vocab.vue';
import VocabTable from './components/VocabTable.vue';
import { compareLesson, nipponToJSL } from './utilities';

export default {
  name: 'App',
  data() {
    return {
      renderApp: false, //true when app is ready: triggers UI elements to load when true
      unusedWords: [], 
      reviewWords: [],
      masteredWords: [],
      kuroshiro: null, //kuroshiro object that is initialized on page load
    }
  },
  methods: {
  /**
   * Loads external js libraries using vue-plugin-load-script
   * @TODO: HANDLE BLOCKED SCRIPTS 
   * @returns {Promise} Script loading processes
   */
    // loadExternalScripts() {
    //   var promiseArray = [];
    //   promiseArray.push(this.$loadScript('https://unpkg.com/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js'));
    //   promiseArray.push(this.$loadScript('https://unpkg.com/kuroshiro@1.1.2/dist/kuroshiro.min.js'));
    //   return Promise.all(promiseArray);
    // },
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
                  word.romazi.push(nipponToJSL(Kuroshiro.Util.kanaToRomaji(k,"nippon")));
              });
          }
          else { //if kana needs to be generated
              word.kana = [];
              word.romazi = [];
              word.japanese.forEach((j,i) => {
                  promiseArray.push(this.kuroshiro.convert(j, {to: "hiragana"}).then(k => {
                      word.romazi.push(nipponToJSL(Kuroshiro.Util.kanaToRomaji(k,"nippon")));
                      word.kana.push(k);
                  }));
              })
          }
      });
      
      return Promise.all(promiseArray);
    },

    resetApp(lessonStart, lessonEnd){
      this.unusedWords = [];
      let w = wordJSON;
      [].concat(w.nominals,w.verbals,w.na_nominals,
        w.adjectivals,w.suru_verbals, w.modifiers,w.greetings).forEach((word,i) => {
        if (!compareLesson(lessonStart, word.lesson) && !(compareLesson(word.lesson, lessonEnd))){ //if start <= lesson <= end
          this.unusedWords.push(word);
        }
      });
    }
  },
  components: {
    Vocab,
    VocabTable
  },
  mounted() {
    document.title = "JSLBot";
    this.resetApp("1A","15A");
    let t1 = new Date(); //time of Kuroshiro initialization start
    this.initializeKuroshiro().then(this.generateTranslations).then(() => {
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
