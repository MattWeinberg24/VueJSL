<template>
    <div class="vocabio">
        <div v-for="word in words" v-bind:key="word">{{word}}</div>
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