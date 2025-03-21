<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="1000" color="success">
      Order was created successfully
    </v-snackbar>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1>Create Order</h1>
        <v-form @submit.prevent="submitOrder" ref="form">
          <v-text-field
            label="Customer Name / Address"
            v-model="order.customerName"
            :rules="nameRules"
            required
            outlined
          ></v-text-field>
          <v-select
            label="Waypoints"
            v-model="order.waypoints"
            :items="waypoints"
            :rules="waypointsRules"
            item-title="location"
            item-value="id"
            required
            multiple
            outlined
          ></v-select>
          <v-btn color="primary" type="submit" class="mt-4"> Create Order </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

const waypointsUrl = `${__API_URL__}/api/v1/waypoints/`
const createOrderUrl = `${__API_URL__}/api/v1/createOrder/`

const defaultOrder = {
  customerName: '',
  waypoints: [],
}

const nameRules = [(v: string) => !!v || 'Customer Name / Address is required']
const waypointsRules = [
  (v: Array) => {
    if (!v) return 'Waypoint is required'
    const pickup = v.filter(
      (id) => waypoints.value?.find((w) => w.id === id)?.waypointType === 'Pickup'
    )
    const delivery = v.filter(
      (id) => waypoints.value?.find((w) => w.id === id)?.waypointType === 'Delivery'
    )
    return (
      (pickup.length > 0 && delivery.length > 0) ||
      'At least one pickup and one delivery is required'
    )
  },
]

const order = ref(defaultOrder)
const waypoints = ref([])
const fetchWaypoints = async () => {
  const response = await axios.get(waypointsUrl)
  waypoints.value = response.data.map((waypoint: any) => ({
    id: waypoint.id,
    waypointType: waypoint.waypointType,
    location: `${waypoint.location} (${waypoint.waypointType})`,
  }))
}

const snackbar = ref(false)

const submitOrder = async () => {
  const response = await axios.post(createOrderUrl, order.value)
  if (response?.status === 200) {
    order.value = defaultOrder
    snackbar.value = true
    setTimeout(() => {
      router.push('/orders')
    }, 1000)
  } else {
    console.error('Failed to create order')
  }
}

onMounted(async () => {
  fetchWaypoints()
})
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
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
