<template>
    <table id="vocab-table">
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
        <tbody id="new"></tbody>
    </table>
</template>

<script>
export default {
    name: 'VocabTable',
    props: {
        words: Array
    }
}
</script>

<style>
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