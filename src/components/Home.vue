<template>
	<div v-if="loginForm || signupForm" background-helper></div>

	<div>
		<p>Welcome to your ToDo list. Login or sign up to start!</p>
		<hr />
		<div>
			<button @click="toggleSignUpForm">Sign up</button>
			<button style="margin-left: 3%" @click="toggleLoginForm">Login</button>
		</div>
	</div>

	<UserDataForm @close-form="loginForm = false" v-if="loginForm" formType="login" />

	<UserDataForm @close-form="signupForm = false" v-if="signupForm" formType="signup" />
</template>

<script setup>
import { ref } from 'vue';
import { UserDataForm } from './index.js';

var loginForm = ref(false);
var signupForm = ref(false);

const toggleSignUpForm = () => {
	signupForm.value = !signupForm.value;
	loginForm.value = false;

	if (signupForm.value || loginForm.value) {
	} else {
	}
};

const toggleLoginForm = () => {
	loginForm.value = !loginForm.value;
	signupForm.value = false;

	if (signupForm.value || loginForm.value) {
	} else {
	}
};
</script>

<style scoped lang="scss">
[background-helper] {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.74);
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 10;
	position: fixed;
}
</style>

<style lang="scss" scoped></style>
