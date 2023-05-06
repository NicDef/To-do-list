import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useEntriesStore = defineStore('entries', () => {
    var entries = ref([]);

    var highlightedEntry = ref(undefined);

    const allEntries = computed(() => entries.value)

    function reset() {
        entries.value = [];
    }

    function updateEntries(updatedEntries) {
        entries.value = updatedEntries
    }

    return { entries, highlightedEntry, allEntries, reset, updateEntries }
})