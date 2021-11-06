<template>
    <div id="vocab-io">
        <h2 id="word"></h2>
        <form id="inp" autocomplete="off">
            <input type="text" id="inpbox">
            <button id="continue-button">Submit</button>
        </form>
        <h2 id="result"></h2>
        <h2 id="correct-answers"></h2>
    </div>
</template>

<script>
export default {
    name: 'VocabIO',
    props: {
        words: Array
    }
}
</script>

<style >
    .vocab-io {
        color: red;
    }
</style>