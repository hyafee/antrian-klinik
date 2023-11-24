<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <header>

    <div class="p-3">
      <Header />
    </div>
  </header>

  <RouterView />
</template>

