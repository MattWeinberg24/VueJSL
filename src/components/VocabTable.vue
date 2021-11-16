<template>
    <table id="vocab-table" v-if="renderable()">
        <thead>
            <tr>
                <th @click="sortTable(0)" :class="{upArrow: col == 0 && asc, downArrow: col == 0 && !asc}">English</th>
                <th @click="sortTable(1)" :class="{upArrow: col == 1 && asc, downArrow: col == 1 && !asc}">Romazi</th>
                <th @click="sortTable(2)" :class="{upArrow: col == 2 && asc, downArrow: col == 2 && !asc}">Kana</th>
                <th @click="sortTable(3)" :class="{upArrow: col == 3 && asc, downArrow: col == 3 && !asc}">Kanzi</th>
                <th @click="sortTable(4)" :class="{upArrow: col == 4 && asc, downArrow: col == 4 && !asc}">Lesson</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="word in sortedWords" v-bind:key="word" :class="{mastered: masteredWords.includes(word), review: reviewWords.includes(word)}">
                <td>{{word.english.join(", ")}}</td>
                <td>{{word.romazi.join("\n")}}</td>
                <td :colspan="tableKanji(word) ? 1 : 2">{{word.kana.join("\n")}}</td>
                <td v-if="tableKanji(word)">{{tableKanji(word)}}</td>
                <td>{{word.lesson}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { compareLesson } from '../utilities';
import Kuroshiro from "kuroshiro";

export default {
    name: 'VocabTable',
    props: {
        unusedWords: Array,
        reviewWords: Array,
        masteredWords: Array
    },
    data() {
        return {
            col: 4,
            asc: false
        }
    },
    computed: {
        /**
         * Combines the sorts of each of the three word groups 
         * @returns {Array} The display-ordered words
         */
        sortedWords() {
            return this.sortWords(this.reviewWords).concat(this.sortWords(this.unusedWords), this.sortWords(this.masteredWords));
        }   
    },
    methods: {
        /**
         * Handles situations where a word does not use kanji
         * @param {Object} word The word to test
         * @returns {string} The string to use in the kanji cell of the table row, 
         * or null if no kanji is used in the japanese
         */
        tableKanji(word) {
            let result = "";
            let empty = true;
            word.japanese.forEach((w,i) => {
                if (i > 0){ //go to next line if not first kanji
                    result += "\n";
                }
                if (Kuroshiro.Util.hasKanji(w)) { 
                    result += w; 
                    empty = false;
                }
                else {
                    result += "-"
                }
            });
            //only return the string if the result contains more than just dashes
            return empty ? null : result;
        },

        /**
         * Event handler for clicking on a table header.
         * Modifies the ascending/descending choice, and the current sorted column.
         */
        sortTable(col) {
            if (this.col == col){ //only change asc/desc if same column
                this.asc = !this.asc;
            }
            else { //otherwise change column and sort ascending
                this.col = col;
                this.asc = true;
            }
        },

        /**
         * Sorts the unusedWords based on the selected column and current ascending/descending choice
         * @returns {Array} The sorted word object array 
         */
        sortWords(words) {
            let dirModifier = this.asc ? 1 : -1;
            let result = words.sort((a,b) => {
                switch (this.col) {
                    case 0: return a.english[0] > b.english[0] ? (1*dirModifier) : (-1*dirModifier);
                    case 1: return a.romazi[0] > b.romazi[0] ? (1*dirModifier) : (-1*dirModifier);
                    case 2: return a.kana[0] > b.kana[0] ? (1*dirModifier) : (-1*dirModifier);
                    case 3: return a.japanese[0] > b.japanese[0] ? (1*dirModifier) : (-1*dirModifier);
                    case 4: return compareLesson(a.lesson, b.lesson) ? (1*dirModifier) : (-1*dirModifier);
                    default: return true;
                }
            });
            return result;
        },

        renderable() {
            let a = this.unusedWords.length > 0 && this.unusedWords[0].hasOwnProperty('romazi');
            let b = this.reviewWords.length > 0 && this.reviewWords[0].hasOwnProperty('romazi');
            let c = this.masteredWords.length > 0 && this.masteredWords[0].hasOwnProperty('romazi');
            return a || b || c;
        }
    }

}
</script>

<style scoped>
    table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
    }
    th, td {
        text-align: center;
    }
    th {
        cursor: pointer;
        user-select: none;
    }
    td {
        white-space: pre-wrap;
    }
    #review {
        display: none;
    }
    .upArrow, .downArrow {
        background: rgba(0,0,0,0.1);
    }
    .upArrow::after, .downArrow::after {
        margin-left: 5px;
    }
    .upArrow::after {
        content: "\25b4";
    }
    .downArrow::after {
        content: "\25be";
    }
    .mastered {
        background-color: #a5d69d;
    }
    .review {
        background-color: #fc6262;
    }
</style>