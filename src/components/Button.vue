<template>
    <button :class="className" :type="inputType"><slot></slot></button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    class: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    }
})

var className = props.class;
var inputType = props.type;
</script>

<style lang="scss" scoped>
.add-entry {
    width: 75px;
    height: 40px;
    text-align: center;
    background-color: #0d6efd;
    color: white;
    padding: 0%;
}

.btn-modify, .btn-change {
    background-color: transparent;
    border: none !important;
}
.btn-modify:hover, .btn-change:hover {
    background-color: rgb(212, 212, 212);
}

.btn-search {
    background-color: rgb(228, 228, 228);
    border-radius: 100px;
    height: 60%;
    text-align: center;
    vertical-align: middle;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 0px;
    padding-bottom: 0px;
}

.btn-search:hover {
    background-color: rgb(223, 223, 223);
}
</style>