<template>
	<nav navbar>
		<div container>
			<a navbar-brand href="#/"><img logo src="../assets/logo.png" alt="ToDo Liste" /></a>

			<div navbar-content>
				<ul content-list>
					<li nav-item>
						<a nav-link href="#/profile">Profile</a>
					</li>
					<li nav-item>
						<a nav-link href="./">Logout</a>
					</li>
				</ul>
				<form search role="search" @submit.prevent="">
					<div search-container>
						<input @keyup="findMatch" v-model="searchString" form-control @focusin="getAllEntries" type="search" placeholder="Search" aria-label="Search" />
						<SearchFlyOut :matches="matches" />
					</div>
					<Button btn-search class="btn-search" type="submit">🔎</Button>
				</form>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { Button, SearchFlyOut } from './index.js';
import { ref, markRaw } from 'vue';
import { useEntriesStore } from '../stores/EntriesStore.js';

const store = useEntriesStore();

var searchString = ref('');
var entries = ref([]);
var matches = ref([]);

function getAllEntries() {
	entries.value = markRaw([...store.allEntries]);
}

// Input @focusout="removeFlyOut"
function removeFlyOut() {
	matches.value = [];
	store.highlightedEntry = undefined;
}

function findMatch(event) {
	matches.value = [];

	if (event.keyCode < 48 || event.keyCode > 90) return;

	store.highlightedEntry = undefined;

	entries.value.forEach((entry) => {
		if (searchString.value.trim() != '' && entry.toDoName.toLowerCase().indexOf(searchString.value.toLowerCase().trim()) >= 0) {
			matches.value.push(entry.toDoName);
		}
	});
}
</script>

<style lang="scss" scoped>
[navbar] {
	background-color: rgb(240, 240, 240);
	border-radius: 1vw;
	padding: 5px;
}

[container] {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

[navbar-brand] {
	display: flex;
	align-items: auto;
	margin-left: 2vw;
}

[logo] {
	width: 100px;
	height: auto;
}

[navbar-content] {
	display: flex;
}

[content-list] {
	display: flex;
	flex-direction: row;
	list-style: none;
}

[nav-item] {
	margin-right: 5vw;
}

[form-control] {
	width: 80%;
	border-radius: 8px;
	border: 1px rgb(48, 48, 48) solid;
	padding: 5px;
	outline: none;
	height: 60%;
}

[search] {
	display: flex;
	align-items: center;
}

[btn-search] {
	margin-left: 15px;
	margin-right: 2vw;
}

[nav-link] {
	color: black;
	text-decoration: none;
	position: relative;
	display: inline-block;
	letter-spacing: 1px;
}

[nav-link]:after {
	background: none repeat scroll 0 0 transparent;
	bottom: 0;
	content: '';
	display: block;
	height: 2px;
	left: 50%;
	position: absolute;
	background: #f43b3b;
	transition: width 0.3s ease 0s, left 0.3s ease 0s;
	width: 0;
}

[nav-link]:hover:after {
	width: 100%;
	left: 0;
}

@media (prefers-color-scheme: dark) {
	[navbar] {
		background-color: rgb(58, 58, 58);
	}

	[nav-link] {
		color: whitesmoke;
	}

	[btn-search] {
		background-color: rgb(51, 51, 51);
	}

	[btn-search]:hover {
		background-color: rgb(54, 54, 54);
	}
}
</style>
