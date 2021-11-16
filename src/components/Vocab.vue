<template>
    <div id="vocab-io">
        <h2 id="word">{{prompt}}</h2>
        <form @submit.prevent="formSubmit()" id="inp" autocomplete="off">
            <input type="text" id="inpbox" v-model="answer">
            <button id="continue-button">{{answered ? "Next Word":"Submit"}}</button>
        </form>
        <h2 v-show="answered" :key="answered" id="result">{{isCorrect ? "はい":"いいえ"}}</h2>
        <h2 v-show="answered" :key="answered" id="correct-answers">{{correctAnswers}}</h2>
    </div>
    <div class="vocab-options">
        <div class="prompt">
            <h3>Prompt:</h3>
            <input type="radio" name="qlang" id="english-option-q" value="english" v-model="promptType">
            <label for="english-option-q">English</label>
            <input type="radio" name="qlang" id="romazi-option-q" value="romazi" v-model="promptType">
            <label for="romazi-option-q">Romazi (JSL)</label>
            <input type="radio" name="qlang" id="kana-option-q" value="kana" v-model="promptType">
            <label for="kana-option-q">Kana</label>
            <input type="radio" name="qlang" id="kanji-option-q" value="kanji" v-model="promptType">
            <label for="kanji-option-q">Kanji</label>
        </div>
        <div class="answer-with">
            <h3>Answer With:</h3>
            <input type="radio" name="alang" id="english-option-a" value="english" v-model="answerType">
            <label for="english-option-a">English</label>
            <input type="radio" name="alang" id="japanese-option-a" value="japanese" v-model="answerType">
            <label for="japanese-option-a">Japanese (Any)</label>
        </div>
        <div class="lessons">
            <h3>Lesson</h3>
            <div id="dropdowns">
                <h4>JSL</h4>
                <select v-model="lessonStart" @change="changeWordLesson()" name="jsl-start" id="jsl-start">
                    <option v-for="lesson in lowerLessons" :key="lesson" :value="lesson">{{lesson}}</option>
                </select>
                <h4>to</h4>
                <select v-model="lessonEnd" @change="changeWordLesson()" name="jsl-end" id="jsl-end">
                    <option v-for="lesson in upperLessons" :key="lesson" :value="lesson">{{lesson}}</option>
                </select>
                <h4>JWL</h4>
                <select v-model="kanjiLesson" name="jwl" id="jwl">
                    <option value="9A">9A</option>
                    <option value="9B">9B</option>
                    <option value="10A">10A</option>
                    <option value="10B">10B</option>
                    <option value="11A">11A</option>
                    <option value="11B">11B</option>
                    <option value="12A">12A</option>
                    <option value="12B">12B</option>
                    <option value="13A">13A</option>
                    <option value="13B">13B</option>
                    <option value="14A">14A</option>
                    <option value="14B">14B</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import { compareLesson, incrementLesson, maxLesson } from '../utilities';
import { kanji } from '../assets/kanji';
import Kuroshiro from "kuroshiro";

export default {
    name: 'Vocab',
    emits: ['lessonChange','wordShift'],
    props: {
        unusedWords: Array,
        reviewWords: Array,
        resetToggle: Boolean
    },
    data() {
        return {
            currentWord: null,
            answered: false,
            isCorrect: false,
            answer: "",

            lessonStart: "1A",
            lessonEnd: "15A",
            kanjiLesson: "14B",

            promptType: "english",
            answerType: "japanese",

            count: 0,
            REVIEW_COUNT: 3
        }
    },
    computed: {
        prompt() {
            if (this.currentWord) {
                switch (this.promptType) {
                    case "english": return this.currentWord.english.join(", ");
                    case "romazi": return this.currentWord.romazi.join(", ");
                    case "kana": return this.currentWord.kana.join(", ");
                    default: {
                        let wordLesson = maxLesson(this.currentWord.japanese.join(""), kanji);
                        if (compareLesson(wordLesson, this.kanjiLesson)) {
                            return this.currentWord.kana.join(", ");
                        }
                        else {
                            return this.currentWord.japanese.join(", ");
                        }
                    }
                }
            }
            else if (this.currentWord == "reset") {
                
            }
            else {
                return "";
            }
        },
        correctAnswers() {
            let message = "";
            if (this.currentWord) {
                if (this.answerType == "english") {
                    this.currentWord.english.forEach(word => message += word + ", ");
                    message = message.substring(0, message.length - 2); //remove last ", "
                }
                else {
                    this.currentWord.romazi.concat(this.currentWord.kana).forEach(word => message += word + ", ");
                    if (Kuroshiro.Util.hasKanji(this.currentWord.japanese[0])){ //only display the kanzi if they are unique from the kana entries
                        this.currentWord.japanese.forEach(word => message += word + ", ");
                    }
                    message = message.substring(0, message.length - 2); //remove last ", "
                }
            }
            return message;
        },
        lowerLessons() {
            let result = [];
            let l = "1A";
            while (l != this.lessonEnd) {
                result.push(l);
                l = incrementLesson(l);
            }
            result.push(l);
            return result;
        },
        upperLessons() {
            let result = [];
            let l = this.lessonStart;
            while (l != "15A") {
                result.push(l);
                l = incrementLesson(l);
            }
            result.push(l);
            return result;
        }
    },
    methods: {
        randomWord() {
            //choose from unused words
            if (this.unusedWords.length > 0 && (this.reviewWords.length == 0 || this.count < this.REVIEW_COUNT)) {
                let n = Math.floor(Math.random() * this.unusedWords.length);
                this.currentWord = this.unusedWords[n];
            }
            //choose from review words
            else if (this.reviewWords.length > 0 && (this.unusedWords.length == 0 || this.count == this.REVIEW_COUNT)) {
                this.count = this.REVIEW_COUNT; //needed for conditions in confirmAnswer()
                let n = Math.floor(Math.random() * this.reviewWords.length);
                this.currentWord = this.reviewWords[n];
            }
            //End of practice
            else {
                //TODO: HANDLE END OF PRACTICE
            }

            if (this.reviewWords.length > 0){
                this.count++;
            }
        },
        formSubmit(){
            if (this.answered) {
                this.randomWord();
                this.answered = false;
            }
            else if (this.confirmAnswer()) {
                this.answered = true;
            }
            this.answer = "";
        },
        /**
         * Process answer submission, make visual changes based on result
         * @returns {boolean} true if user entered anything, false if the input is empty
         */
        confirmAnswer(){
            let answer = this.answer.toLowerCase().trim(); 
            if(answer != ""){
                if (this.correct(answer)){
                    this.isCorrect = true;  
                    if (this.count <= this.REVIEW_COUNT) { //if picked from unusedWords
                        this.$emit("wordShift",this.currentWord,"u2m");
                    }
                    else { //if picked from review words
                        this.$emit("wordShift",this.currentWord,"r2u");
                        this.count = 0;
                    }
                    
                }
                else {
                    this.isCorrect = false;
                    if (this.count <= this.REVIEW_COUNT) { //if picked from unusedWords
                        this.$emit("wordShift", this.currentWord, "u2r");
                    }
                    else { //if picked from reviewWords
                        this.count = 0;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        },
        /**
         * determine if the user input matches the expected answer
         * @param {string} answer The user's answer
         * @returns {boolean} true if correct, false if incorrect
         */
        correct(answer){
            if(this.answerType == "english"){
                return this.currentWord.english.includes(answer);
            }
            else {

                let possibleAnswers = this.currentWord.romazi.concat(this.currentWord.kana, this.currentWord.japanese);
                possibleAnswers.forEach((w,i) => { //remove honorific symbols if necessary
                    if (w.includes("↓") || w.includes("↑")){
                        possibleAnswers[i] = w.substring(0, w.length - 1);
                    }
                })
                return possibleAnswers.includes(answer);
            }
        },
        changeWordLesson() {
            this.$emit('lessonChange', this.lessonStart, this.lessonEnd);
        }
    },
    watch: {
        resetToggle: function(){
            if (this.currentWord){ //make sure app has at least been loaded the first time
                this.randomWord();
            }
            
        }
    },
    mounted() {
        this.randomWord();
    }
    
}
</script>

<style scoped>
    .vocab-options {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
        margin-left: 10px;
    }
    .vocab-options div {
        margin-right: 100px;
    }
    input[type=radio] {
        margin-top: -1px;
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
    label {
        font-size: 20px;
    }

    #dropdowns {
        display: flex;
        height: 25px;
        align-items: center;
    }
    select {
        margin-left: 10px;
        margin-right: 50px;
    }
    #jsl-start {
        margin-right: 10px;
    }
</style>