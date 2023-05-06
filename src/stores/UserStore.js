import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useUserStore = defineStore('user', () => {
    const state = reactive({
        privateData: {
            email: undefined,
            password: undefined,
        },
        publicData: {
            name: undefined,
            loggedIn: false,
        },
    })

    const getEmail = computed(() => state.privateData.email);
    const getPassword = computed(() => state.privateData.password);
    const getName = computed(() => state.publicData.name);
    const getStatus = computed(() => state.publicData.loggedIn)

    const deleteUser =  () => {
        state.publicData.name = undefined;
        state.privateData.password = undefined;
        state.privateData.email = undefined;
    }
    
    const addUser =  (name, email, password) => {
        state.publicData.name = name;
        state.privateData.email = email;
        state.privateData.password = password;
    }

    const updateName = (newName) => state.publicData.name = newName;

    return { state, getEmail, getPassword, getName, getStatus, deleteUser, addUser, updateName }
});