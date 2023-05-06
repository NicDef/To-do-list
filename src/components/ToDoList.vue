<template>
	<Head
		@add-entry="
			(toDo, delay) => {
				modifyEntry('POST', toDo, undefined, delay);
			}
		"
	/>

	<ul class="todo-list" ref="todoListElem">
		<Entry
			v-if="dataLoaded.valueOf()"
			v-for="entry in entries"
			:key="entry.id"
			:toDo="entry.toDoName"
			@delete-entry="modifyEntry('DELETE', undefined, entry.id)"
			@rename-entry="
				(param) => {
					modifyEntry('PUT', param, entry.id);
				}
			"
		/>
	</ul>
</template>

<script setup>
import Api from '../api/service.js';

import { markRaw, onMounted, ref, watch, nextTick } from 'vue';
import { Head, Entry } from './index.js';
import { useEntriesStore } from '../stores/EntriesStore';

var entries = ref([]);
var dataLoaded = ref(false);
var todoListElem = ref(null);
var scrollHeight = ref(0);

const store = useEntriesStore();

const modifyEntry = async (type, toDo = undefined, id = undefined, delay = undefined) => {
	try {
		switch (type) {
			case 'GET':
				displayAllEntries();
				return;
			case 'POST':
				setTimeout(async () => {
					await Api.requestAdd(toDo, Math.round(delay));
					await displayAllEntries();
					store.updateEntries(entries.value);
					await nextTick();
					scrollHeight.value = todoListElem.value.scrollHeight;
				}, Math.round(delay) * 1000);
				return;
			case 'PUT':
				await Api.requestUpdate(id, toDo);
				break;
			case 'DELETE':
				await Api.requestDelete(id);
				break;
			default:
				throw new Error(`Unexpected Request type: ${type}`);
		}

		await displayAllEntries();

		store.updateEntries(entries.value);
	} catch (ex) {
		console.error(ex);
	}
};

const displayAllEntries = async () => {
	try {
		await Api.requestAll()
			.then((response) => {
				entries.value = markRaw(response);
				dataLoaded.value = true;
			})
			.catch((err) => {
				console.error(err);
			});
	} catch (ex) {
		console.log(ex);
	}
};

onMounted(async () => {
	scrollHeight.value = todoListElem.value.scrollHeight;
	await displayAllEntries();
	store.updateEntries(entries.value);
});

watch(
	() => scrollHeight.value,
	async () => {
		await nextTick();
		todoListElem.value.scrollTop = scrollHeight.value;
	}
);

watch(
	() => store.entries,
	() => (entries.value = store.allEntries)
);

watch(
	() => store.highlightedEntry,
	() => {
		var entriesElem = document.querySelectorAll('.todo-list li');
		entriesElem.forEach((entryElem) => {
			if (entryElem.innerHTML === store.highlightedEntry) {
				entryElem.style.backgroundColor = 'yellow';
			} else {
				entryElem.style.backgroundColor = 'transparent';
			}
		});
	}
);
</script>

<style lang="scss" scoped>
.todo-list {
	background-color: rgb(240, 240, 240);
	list-style-type: none;
	padding-left: 0%;
	border-radius: 12px;
	height: 50vh;
	overflow-y: auto;
	overflow-x: hidden;
}
.todo-list::-webkit-scrollbar {
	width: 8px;
	margin-right: 20px;
}

.todo-list::-webkit-scrollbar-track {
	background-color: transparent;
	border-radius: 10px;
}

.todo-list::-webkit-scrollbar-thumb {
	background-color: #c0c0c0;
	border-radius: 10px;
}

@media (prefers-color-scheme: dark) {
	.todo-list {
		background-color: rgb(58, 58, 58);
	}
}
</style>
