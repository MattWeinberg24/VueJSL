<template>
    <div class="vocabio">
        <div v-for="word in words.nominals" v-bind:key="word">{{word}}</div>
    </div>
</template>

<script>
export default {
    name: 'VocabIO',
    props: {
        words: Object
    }
}
</script>

<style >
    .vocabio {
        color: red;
    }
</style>