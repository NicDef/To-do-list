<template>
    <div>
        <ul flyout-menu>
            <li v-for="match in matches" @click="highlightEntry(match)" flyout-item>{{ match }}</li>
        </ul>
    </div>
</template>

<script setup>
    import { useEntriesStore } from '../stores/EntriesStore';

    const store = useEntriesStore();

    const props = defineProps({
        matches: {
            type: Array,
            required: false,
        }
    })

    const highlightEntry = (toDoName) => {
        store.highlightedEntry = toDoName;
    }
</script>

<style lang="scss" scoped>
    [flyout-menu] {
        list-style: none;
        position: absolute;
        width: 200px;

        [flyout-item] {
            background: whitesmoke;
        }

        [flyout-item]:hover {
            background: #ebebeb;
            cursor: pointer;
        }
    }


</style>