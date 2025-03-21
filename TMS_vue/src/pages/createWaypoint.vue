<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="1000" color="success">
      Waypoint was created successfully
    </v-snackbar>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1>Create Waypoint</h1>
        <v-form @submit.prevent="submitWaypoint" ref="form">
          <v-text-field
            label="Location Name / Address"
            v-model="waypoint.location"
            :rules="locationRules"
            required
            outlined
          ></v-text-field>
          <v-select
            label="Type"
            v-model="waypoint.type"
            :items="['Pickup', 'Delivery']"
            :rules="waypointsRules"
            required
            outlined
          ></v-select>
          <v-btn color="primary" type="submit" class="mt-4"> Create Waypoint </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const createWaypointUrl = `${__API_URL__}/api/v1/createWaypoint/`

const defaultWaypoint = {
  location: '',
  type: 'Pickup',
}

const locationRules = [(v: string) => !!v || 'Location Name / Address is required']
const typeRules = [(v: string) => !!v || 'Type is required']

const waypoint = ref(defaultWaypoint)

const snackbar = ref(false)

const submitWaypoint = async () => {
  const response = await axios.post(createWaypointUrl, waypoint.value)
  if (response?.status === 200) {
    waypoint.value = defaultWaypoint
    snackbar.value = true
    setTimeout(() => {
      router.push('/waypoints')
    }, 1000)
  } else {
    console.error('Failed to create Waypoint')
  }
}

onMounted(async () => {})
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
textarea,
select {
  width: 100%;
  padding: 8px;
  box-sizing: bWaypoint-box;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  bwaypoint: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
