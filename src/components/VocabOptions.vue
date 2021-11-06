<template>
    <div class="vocab-options">
        <div class="prompt">
            <h3>Prompt:</h3>
            <input type="radio" name="qlang" id="english-option-q" checked>
            <label for="english-option-q">English</label>
            <input type="radio" name="qlang" id="romazi-option-q">
            <label for="romazi-option-q">Romazi (JSL)</label>
            <input type="radio" name="qlang" id="kana-option-q">
            <label for="kana-option-q">Kana</label>
            <input type="radio" name="qlang" id="kanzi-option-q">
            <label for="kanzi-option-q">Kanzi</label>
        </div>
        <div class="answer-with">
            <h3>Answer With:</h3>
            <input type="radio" name="alang" id="english-option-a">
            <label for="english-option-a">English</label>
            <input type="radio" name="alang" id="japanese-option-a" checked>
            <label for="japanese-option-a">Japanese (Any)</label>
        </div>
        <div class="lessons">
            <h3>Lesson</h3>
            <div id="dropdowns">
                <h4>JSL</h4>
                <select v-on:change="$emit('resetApp')" name="jsl-start" id="jsl-start"></select>
                <h4>to</h4>
                <select v-on:change="$emit('resetApp')" name="jsl-end" id="jsl-end"></select>
                <h4>JWL</h4>
                <select name="jwl" id="jwl">
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
export default {
    name: 'VocabOptions',
    emits: ['resetApp']
    
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