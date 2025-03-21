<template>
  <v-app-bar density="compact" color="primary" flat class="text-white px-10">
    <v-btn @click="() => router.push('/orders')"> Orders </v-btn>
    <v-btn @click="() => router.push('/waypoints')"> Waypoints </v-btn>
    <v-btn @click="() => router.push('/createOrder')"> Create Order </v-btn>
    <v-btn @click="() => router.push('/createWaypoint')"> Create Waypoint </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import router from '@/router'
</script>
