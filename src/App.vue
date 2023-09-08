<script setup>
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useAlertStore } from './stores/alert'
import { storeToRefs } from 'pinia'
const router = useRouter()
const store = useAlertStore()
const { alert, alertType, alertMsg } = storeToRefs(store)
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-alert
      v-model="alert"
      border="start"
      closable
      close-label="Close Alert"
      :color="alertType"
      position="absolute"
      style="width: 350px; left: 50%; transform: translateX(-50%); top: 50px; z-index: 99999"
    >
      {{ alertMsg }}
    </v-alert>
    <NavBar />
   
    <v-app-bar class="text-center" :title="router.currentRoute.value.meta.arabicName">
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>
