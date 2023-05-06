<template>
    <div profile>
        <div user-data>
            <p>User name: {{ name  }}<code v-if="name == undefined">undefined</code></p>
            <p>Email: {{ email }}<code v-if="email == undefined">undefined</code></p>
            <p password>
                Password: <code v-if="password == undefined">undefined</code>
                <form v-else action="" @submit.prevent="">
                    <input input type="password" :value="password" />
                </form>
            </p>
        </div>
        <hr>
        <div change-user>
            <div>
                <label for="newName">New User Name:</label>
                <input id="newName" type="text" v-model="inputNewUserName" />
                <button type="submit" btn-change :disabled="inputNewUserName == ''" @click="validateNewName">Change name</button> 
            </div>  

            <p alert alert-error ref="errorAlert"></p>
            <p alert alert-success ref="successAlert"></p>
        </div>
        <hr>
        <div delete-user>
            <button type="submit" btn-delete @click="deleteUser">Delete Account</button>
        </div>
    </div>
    
    <button btn-back><a href="#/todo">Back</a></button>
</template>

<script setup>
    import { computed, nextTick, ref, watch } from 'vue';
    import { useUserStore } from '../stores/UserStore';

    const store = useUserStore();

    var name = ref(store.getName);
    var email = ref(store.getEmail);
    var password = ref(store.getPassword);
    
    var inputNewUserName = ref("");

    const errorAlert = ref(null);
    const successAlert = ref(null);

    watch(
        () => store.getName,
        (newUserName) => name.value = newUserName,
    )

    watch(
        () => store.getEmail,
        () => email.value = store.getEmail,
    )

    watch(
        () => store.getPassword,
        () => password.value = store.getPassword,
    )

    const deleteUser = () => {
        store.deleteUser();
        console.log(store.getName);
        console.log(store.getEmail);
        console.log(store.getPassword);
    }

    const validateNewName = async () => {
        if (store.getName != undefined && inputNewUserName.value.trim() != "" && inputNewUserName.value.trim() != store.getName) {
            store.updateName(inputNewUserName.value.trim());
            inputNewUserName.value = "";
            await nextTick();
            errorAlert.value.innerHTML = "";
            successAlert.value.innerHTML = "User name successfully changed";
        } else {
            await nextTick();
            successAlert.value.innerHTML = "";
            
            if (store.getName == undefined) errorAlert.value.innerHTML = "Please sign up first";
            else if (inputNewUserName.value.trim() === store.getName) errorAlert.value.innerHTML = `Your user name already is ${inputNewUserName.value.trim()}`;
            else errorAlert.value.innerHTML = "Invalid user name";

            inputNewUserName.value = "";
        }
    }
</script>

<style lang="scss" scoped>
    [btn-delete] {
        background-color: rgb(202, 47, 47);
        color: whitesmoke;
    }

    [alert] {
        margin: 0;
        text-align: left;
    }

    [alert-error] {
        padding-top: 2%;
        padding-bottom: 2%;
        font-weight: bolder;
        font-size: 16px;
        color: #f73b3b;
    }

    [alert-success] {
        font-weight: bolder;
        font-size: 18px;
        color: rgb(12, 102, 12);
    }

    [profile] {      
        div {
            display: flex;
            justify-content: left;
            flex-direction: column;
            align-items: flex-start;
        }

        [user-data] {
            p {
                text-align: left;
            }

            [password] {
                display: flex;
                align-items: center;
            }

            [password] form input {
                letter-spacing: 3px
            };
        }

        [change-user] {
            div {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            input {
                margin-right: 2%;
                width: 40%;
            }
        }
    }

    [btn-back] {
        margin-top: 5%;
    }

    input {
        width: 100%;
        border-radius: 8px;
        border: 1px rgb(48, 48, 48) solid;
        padding: 5px;
        outline: none;
        height: 100%;
        font-size: 16px;
        margin-left: 2%;
    }
</style>