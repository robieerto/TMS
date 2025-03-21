<template>
  <div class="mx-15">
    <h1>Waypoints</h1>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Location Name / Address</th>
          <th class="text-left">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in waypoints" :key="item.id">
          <td>{{ item.location }}</td>
          <td>{{ item.waypointType }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { formatDateTime } from '@/utils'

const waypointsUrl = `${__API_URL__}/api/v1/waypoints/`

const waypoints = ref([])
const fetchWaypoints = async () => {
  const response = await axios.get(waypointsUrl)
  waypoints.value = response.data
}
onMounted(async () => {
  fetchWaypoints()
})
</script>
