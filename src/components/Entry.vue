<template>
  <div class="entry">
  <input v-if="rename" class="rename" ref="input" type="text" v-model="newToDo" @keyup.enter="emitRenameEntry">
  <li v-else>{{ newToDo }}</li>
    <div class="options">
      <Button v-if="!rename" type="submit" class="btn-modify btn-rename" @click="configure">⚙️</Button>
      <Button v-if="!rename" type="submit" class="btn-modify btn-delete" @click="emit('delete-entry')">❌</Button>
      <Button v-else type="submit" class="btn-modify btn-change" @click="emitRenameEntry">🆗</Button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, nextTick, ref } from 'vue';
import { Button } from './index.js';

const props = defineProps({
  toDo: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['rename-entry', 'delete-entry'])

var rename = ref(false);
var newToDo = ref(props.toDo);
const input = ref(null);

const emitRenameEntry = () => {
  if (newToDo.value.trim() != "" && newToDo.value.trim() != props.toDo.trim()) {
    emit('rename-entry', newToDo.value.trim());
    rename.value = false;
  } else if (newToDo.value === props.toDo) {
    rename.value = false;
  }
}

const configure = async () => {
  rename.value = !rename.value;
  await nextTick();
  input.value.focus();
}

</script>

<style scoped>
  .entry {
    display: flex;
    margin: 5px;
    background-color: rgb(219, 219, 219);
    color: black;
    border-radius: 12px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: calc(100% - 30px);
    word-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
  }
  .rename {
    border: none;
    height: 100%;
    width: 100%;
    background-color: transparent;
    color: black;
  } 
</style>