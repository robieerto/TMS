<template>
  <div class="mx-15">
    <h1>Orders</h1>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Order Number</th>
          <th class="text-left">Customer Name</th>
          <th class="text-left">Waypoints</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.orderNumber }}</td>
          <td>{{ item.customerName }}</td>
          <td>{{ formatWaypoints(item.waypoints) }}</td>
          <td>{{ formatDateTime(item.date) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { formatDateTime } from '@/utils'

const ordersUrl = `${__API_URL__}/api/v1/orders/`

const orders = ref([])
const fetchOrders = async () => {
  const response = await axios.get(ordersUrl)
  orders.value = response.data
}
onMounted(async () => {
  fetchOrders()
})

function formatWaypoints(waypoints: any[]) {
  return waypoints.map((waypoint) => `${waypoint.location} (${waypoint.waypointType})`).join(' | ')
}
</script>
