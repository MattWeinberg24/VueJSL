<template>
    <table id="vocab-table" v-if="words.length > 0 && words[0].hasOwnProperty('romazi')">
        <thead>
            <tr>
                <th>English</th>
                <th>Romazi</th>
                <th>Kana</th>
                <th>Kanzi</th>
                <th>Lesson</th>
            </tr>
        </thead>
        <tbody id="review"></tbody>
            <tr v-for="word in words" v-bind:key="word">
                <td>{{word.english.join(", ")}}</td>
                <td>{{word.romazi.join("\n")}}</td>
                <td :colspan="tableKanji(word) ? 1 : 2">{{word.kana.join("\n")}}</td>
                <td v-if="tableKanji(word)">{{tableKanji(word)}}</td>
                <td>{{word.lesson}}</td>
            </tr>
        <tbody id="new"></tbody>
    </table>
</template>

<script>
export default {
    name: 'VocabTable',
    props: {
        words: Array
    },
    data() {
        return {
            hello: 2
        }
    },
    methods: {
        tableKanji(word) {
            let result = "";
            let empty = true;
            word.japanese.forEach((w,i) => {
                if (i > 0){
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
            return empty ? null : result;
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
    .th-sort-asc, .th-sort-desc {
        background: rgba(0,0,0,0.1);
    }
    .th-sort-asc::after, .th-sort-desc::after {
        margin-left: 5px;
    }
    .th-sort-asc::after {
        content: "\25b4";
    }
    .th-sort-desc::after {
        content: "\25be";
    }
</style>