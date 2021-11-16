# VueJSL

### Hosted at https://mattweinberg.dev/VueJSL/

A migration of [JSLBot](https://github.com/MattWeinberg24/JSLbot) to [Vue.js](https://github.com/vuejs/vue)

Uses [kuroshiro](https://github.com/hexenq/kuroshiro) with [kuroshiro-analyzer-kuromoji](https://github.com/hexenq/kuroshiro-analyzer-kuromoji) dictionary files to aid with conversions and other operations involving kanji, hiragana, and katakana.

## Progress Log

|Date |Progress  |
|:--- |:--- |
|**11/15/2021:**| Features about on par with JSLBot  |
|**11/14/2021:**| Reimplemented various features involving input/output. Used module imports instead of a plugin for loading external libraries into Vue  |
|**11/11/2021:**| Reimplemented table sorting. Moved utility functions to separate module instead of including them in the components directly. |
|**11/07/2021:**| Reimplemented basic table (no sorting) |
|**11/06/2021:**| Began to reimplement features from JSLBot, such as the HTML and CSS |
|**11/03/2021:**| Reimplemented kanji to kana/romaji translations. Cleaned up code involving Promise objects. |
|**11/01/2021:**| Allowed for use of kuroshiro-analyzer-kuromoji dictionary files within kuroshiro |
|**10/31/2021:**| Allowed external js libraries to work within Vue (utilizing [vue-plugin-load-script](https://github.com/tserkov/vue-plugin-load-script/tree/vue3)) **Simplified on 11/14/2021** |
|**10/29/2021:**| Tested using a json file as a prop |
|**10/28/2021:**| Created Vue Project, set up compatibility with GitHub Pages website |
