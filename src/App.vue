<template>
    <Header v-if="currentView != Home"></Header>
    
    <main>
      <component :is="currentView" />
    </main>
</template>

<script setup>
  import { Header, ToDoList, Home, Profile, NotFound } from './components/index.js';
  import { ref, computed, watch } from 'vue';
  import { useUserStore } from './stores/UserStore';

  const store = useUserStore();

  const routes = {
    '/': Home,
    '/profile': Profile,
    '/todo': ToDoList
  } 
   
  const currentPath = ref(window.location.hash)

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
    console.log(window.location.hash);
  })

  var currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
  })

  watch(
    () => store.getStatus,
    (newState) => {
      if (newState)
        window.location.hash = '#/todo';
      else 
      window.location.hash = '/';
    }
  )
</script>

<style scoped>
  main {
    width: 50%;
    margin-left: 25%;
    margin-top: 5vh;
  }
</style>