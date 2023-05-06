<template>
	<form action="#/todo" v-if="formType == 'login'" @submit.prevent="validateLogin">
		<div container>
			<h1>Login</h1>
			<p alert alert-error ref="errorAlert"></p>
			<p alert alert-success ref="successAlert"></p>
			<div>
				<div data-input-ctn email-container>
					<label for="email">Email:</label>
					<input v-model="lEmail" form-control id="email" type="email" required />
				</div>
				<div data-input-ctn password-container>
					<label for="password">Password:</label>
					<input v-model="lPassword" form-control id="password" type="password" required />
				</div>
			</div>

			<div buttons>
				<button btn-submit type="submit"><a>Login</a></button>
				<button btn-cancel type="button" @click="emit('close-form')"><a>Cancel</a></button>
			</div>
		</div>
	</form>

	<form action="#" v-if="formType == 'signup'" @submit.prevent="validateSignUp">
		<div container>
			<h1>Sign up</h1>
			<p alert alert-error ref="errorAlert"></p>
			<p alert alert-success ref="successAlert"></p>
			<div>
				<div data-input-ctn name-container>
					<label for="name">User name:</label>
					<input v-model="sName" form-control id="name" type="text" required maxlength="20" />
				</div>
				<div data-input-ctn email-container>
					<label for="email">Email:</label>
					<input v-model="sEmail" form-control id="email" type="email" required />
				</div>
				<div data-input-ctn password-container>
					<label for="password">Password:</label>
					<input v-model="sPassword" form-control id="password" type="password" required />
				</div>
			</div>

			<div buttons>
				<button bt-submit type="submit"><a>Sign up</a></button>
				<button btn-cancel type="button" @click="emit('close-form')"><a>Cancel</a></button>
			</div>
		</div>
	</form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { ref, nextTick } from 'vue';

const store = useUserStore();

const props = defineProps({
	formType: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['close-form']);

var sName = ref('');
var sEmail = ref('');
var sPassword = ref('');

var lEmail = ref('');
var lPassword = ref('');

const errorAlert = ref(null);
const successAlert = ref(null);

const validateSignUp = async () => {
	await nextTick();
	successAlert.value.innerHTML = '';
	errorAlert.value.innerHTML = '';

	if (!userExists() && sName.value.trim() != '' && sEmail.value.trim() != '' && sPassword.value.trim() != '') {
		store.addUser(sName.value, sEmail.value, sPassword.value);
		sEmail.value = '';
		sName.value = '';
		sPassword.value = '';
		return (successAlert.value.innerHTML = 'User successfully created');
	}

	sEmail.value = '';
	sName.value = '';
	sPassword.value = '';
	await nextTick();
	return (errorAlert.value.innerHTML = 'A user already exists');
};

const userExists = () => {
	if (store.getEmail === undefined && store.getPassword === undefined && store.getName === undefined) return false;
	return true;
};

const validateLogin = async () => {
	if (!validCredentials()) {
		lPassword.value = '';
		lEmail.value = '';
		return (errorAlert.value.innerHTML = 'Wrong email or password');
	}

	store.state.publicData.loggedIn = true;
};

const validCredentials = () => {
	if (lEmail.value == store.getEmail && lPassword.value == store.getPassword) return true;
	return false;
};
</script>

<style scoped lang="scss">
form {
	background: hsl(250, 86%, 64%);
	color: whitesmoke;
	padding: 5%;
	border-radius: 15px;
	margin-top: 10%;
	box-shadow: 9px 9px 15px 0px #00000051;
	position: relative;
	z-index: 20;

	[buttons] {
		display: flex;
		flex-direction: row;

		[btn-cancel],
		[btn-submit] {
			display: block;
			margin-top: 5%;
		}

		[btn-cancel] {
			margin-left: 5%;
		}
	}

	[container] {
		[alert] {
			margin: 0;
			text-align: left;
		}

		[alert-error] {
			margin-top: 5%;
			font-weight: bolder;
			font-size: 18px;
			color: #f73b3b;
		}

		[alert-success] {
			font-weight: bolder;
			font-size: 18px;
			color: rgb(12, 102, 12);
		}
	}
}

h1 {
	background: hsl(255, 86%, 64%);
	margin: 0px;
	text-align: left;
	letter-spacing: 3px;
	box-shadow: 9px 9px 15px 0px #00000051;
	padding: 15px;
	border-radius: 15px;
}

[form-control] {
	width: calc(100% - 10px);
	border-radius: 8px;
	border: 1px rgb(48, 48, 48) solid;
	padding: 5px;
	outline: none;
	height: 100%;
	font-size: 16px;
}

#password {
	letter-spacing: 3px;
}

label {
	display: block;
	text-align: left;
	margin-bottom: 1%;
}

[data-input-ctn]:not(first-child) {
	margin-top: 5%;
}

button[type='submit'] {
	display: block;
	margin-top: 5%;
}

@media (prefers-color-scheme: dark) {
	form {
		background-color: rgb(17, 17, 17);
	}

	h1 {
		background: hsl(0, 0%, 7%);
		color: hsl(56, 61%, 61%);
	}
}
</style>
