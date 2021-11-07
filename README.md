# VueJSL

A migration of [JSLBot](https://github.com/MattWeinberg24/JSLbot) to [Vue.js](https://github.com/vuejs/vue)

Uses [kuroshiro](https://github.com/hexenq/kuroshiro) with [kuroshiro-analyzer-kuromoji](https://github.com/hexenq/kuroshiro-analyzer-kuromoji) dictionary files to aid with conversions and other operations involving kanji, hiragana, and katakana.

Uses [vue-plugin-load-script](https://github.com/tserkov/vue-plugin-load-script/tree/vue3) to help load the kuroshiro scripts

## Progress Log

**11/7/2021:** Reimplemented basic table (no sorting)

**11/6/2021:** Began to reimplement features from JSLBot, such as the HTML and CSS

**11/3/2021:** Reimplemented kanji to kana/romaji translations. Cleaned up code involving Promise objects.

**11/1/2021:** Allowed for use of kuroshiro-analyzer-kuromoji dictionary files within kuroshiro

**10/31/2021:** Allowed external js libraries to work within Vue (utilizing vue-plugin-load-script)

**10/29/2021:** Tested using a json file as a prop

**10/28/2021:** Created Vue Project, set up compatibility with GitHub Pages website
