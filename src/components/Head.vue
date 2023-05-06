<template>
    <div class="head">
        <input @keyup.enter="emitAddEntry" ref="inputElem" type="text" placeholder="Task, Delay in sec" v-model="newNote" />
        <p v-if="delay > 0">{{ delay }}</p>
        <Button type="submit" class="add-entry" @click="emitAddEntry">+</Button>
    </div>
</template>

<script setup>
import { defineEmits, onMounted, ref} from 'vue';
import { Button } from './index.js';

const emit = defineEmits(['add-entry'])

var newNote = ref('');
var delay = ref(0);
var input = ref('');
const inputElem = ref(null);
const delayElem = ref(null)

onMounted(() => {
    inputElem.value.focus();
})

const countdown = (interval = 1000) => {
    let x = setInterval(() => {
        if (delay.value > 0)
            delay.value -= 1 
        else 
            clearInterval();
    }, interval);
}

const emitAddEntry = () => {
    input.value = newNote.value.split(',')[0];
    delay.value = newNote.value.split(',')[1];

    if (input.value.trim() != "" && delay.value != undefined && delay.value.trim() != '' && !isNaN(delay.value.trim()) && parseInt(delay.value.trim()) > 0) {
        emit('add-entry', input.value.trim(), parseInt(delay.value.trim()));
        newNote.value = "";
        countdown();
    } else if (input.value.trim() != "" && (delay.value == undefined || delay.value.trim() == '' || parseInt(delay.value.trim()) < 0)) {
        emit('add-entry', input.value.trim());
        newNote.value = "";
    }
}
</script>

<style scoped>
    .head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 40px;
    }

    input[type=text] {
        width: 80%;
        border-radius: 8px;
        border: 1px rgb(48, 48, 48) solid;
        padding: 5px;
    }

    p {
        color: black;
        align-items: center;
        height: 100%;
        margin: 0px;
    }
</style>